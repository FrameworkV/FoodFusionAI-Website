import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateRecipe, getMessages } from "@/lib/api/llm_chats"
import { parseLLMResponse } from "@/utils/helperFunctions"
import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { AIResponseLoader } from "../../components/ai-response-loader"
import InputField from "./components/input-field"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Save } from "lucide-react"


enum FromEnum {
    human = "human",
    ai = "ai"
}

interface MessageType {
    message: string,
    role: FromEnum
}


const GenerateRecipe = () => {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const [request, setRequest] = useState<string>("")
    // const [chatId, setChatId] = useState("")
    const [messages, setMessages] = useState<MessageType[]>([])
    const [modelOptions] = useState<string[]>(["g-01-base", "g-01-reasoning"]) //TODO: fetch model options
    const [model, setModel] = useState(modelOptions[0])
    const [isResponseLoading, setIsResponseLoading] = useState(false);

    const chatContainerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        (async () => {
            // if chat exists, get messages from chatId
            if (pathname !== "/generate-recipe") {
                const chatId = pathname.split("/").pop();
                if (chatId) {
                    // get messages
                    const messages = await getMessages(chatId);
                    console.log("fetched messages: ", messages);
                    // transform message types to enum
                    messages.forEach((message: MessageType) => {
                        message.role = message.role === "ai" ? FromEnum.ai : FromEnum.human
                    });
                    console.log("Messages: ", messages)
                    setMessages(messages);
                }
            }
        })()
    }, [pathname])

    useEffect(() => {
        if (chatContainerRef.current) {
            console.log("scrolltop", chatContainerRef.current.scrollTop);
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const createResponseHandler = async () => {

        setIsResponseLoading(true); // set loading state
        let isLoading = true;

        let isNewChat = false;

        setRequest("");  // clear input box


        let chatId = ""


        if (pathname === "/generate-recipe") {
            chatId = uuidv4()
            isNewChat = true;
            navigate(`/generate-recipe/${chatId}`)
            setMessages([{ message: request, role: FromEnum.human }])
        } else {
            chatId = pathname.split("/").pop() || uuidv4()
            setMessages(prev => [...prev, { message: request, role: FromEnum.human }])
        }

        const responseStream = await generateRecipe({ chatId, request })

        // handle stream
        if (!responseStream.body) return null // TODO: handle error

        const reader = responseStream.body.getReader();
        const decoder = new TextDecoder("utf-8");

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const decodedValue = decoder.decode(value, { stream: true });
            console.log("dec: ", decodedValue)
            // console.log("dec: ", decodedValue)
            let res = parseLLMResponse(decodedValue).replace(/\\n/g, "\n");

            if (isLoading) {
                isLoading = false;
                setIsResponseLoading(false);
            }
            // console.log("result: ", res)
            setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg?.role === FromEnum.ai) {
                    return [...prev.slice(0, -1), { message: lastMsg.message + res, role: FromEnum.ai }];
                }
                return [...prev, { message: res, role: FromEnum.ai }];
            });
        }

        // TODO: check if chatid alread exist
        // if not, call the fetch chats function, so the new chat gets instantly added to the sidebar
        if (isNewChat) {
            // fetchChats()
        }
    }



    return (
        <div className="w-full h-full flex flex-col">
            {/* Info window */}
            <div className="w-max px-8">
                <Select value={model} onValueChange={(value) => setModel(value)}>
                    <SelectTrigger className="!ring-transparent">
                        <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            modelOptions.map((option) => (
                                <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </div>
            {/* Chat window */}
            <div className="h-full overflow-hidden">
                <ChatWindow messages={messages} createResponseHandler={createResponseHandler} request={request} setRequest={setRequest} chatContainerRef={chatContainerRef} isResponseLoading={isResponseLoading} />
            </div>
        </div>

    )
}

const ChatWindow = ({ messages, createResponseHandler, request, setRequest, chatContainerRef, isResponseLoading }: { messages: MessageType[], createResponseHandler: () => void, request: string, setRequest: React.Dispatch<React.SetStateAction<string>>, chatContainerRef: React.RefObject<HTMLDivElement>, isResponseLoading: boolean }) => {
    const { pathname } = useLocation();
    const [recipeSaved, setRecipeSaved] = useState("");

    const onInputChange = (changedValue: string) => {
        setRequest(changedValue);
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            createResponseHandler();
        }
    }

    const handleSaveRecipe = async (saveButtonId: string) => {
        setRecipeSaved(saveButtonId);
        setTimeout(() => {
            setRecipeSaved("");
        }, 3000);

        // logic to save the recipe

    }
    return pathname && pathname == "/generate-recipe" ? (
        <>
            {/* New chat window */}
            <div className="w-full h-full flex flex-col justify-center items-center gap-8">
                <div className="text-center flex flex-col gap-2">
                    <h2 className="text-3xl font-semibold">Let's create a new Recipe!</h2>
                    <p className="text-sm text-muted-foreground">Or choose from your previous chats on the left</p>
                </div>
                <InputField request={request} createResponseHandler={createResponseHandler} onInputChange={onInputChange} handleKeyDown={handleKeyDown} />
            </div>
        </>
    ) : (
        <div className="flex flex-col h-full justify-center items-center">
            {/* Existing chat window */}
            {/* Messages */}
            <div ref={chatContainerRef} className="flex-1 h-full w-full scroll-smooth overflow-y-scroll scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent px-4">
                <div className="w-full flex flex-col max-w-[40em] mx-auto py-8">
                    {/* Right chat message */}
                    {
                        messages.map((message: MessageType) => {
                            if (message.role === FromEnum.human) {
                                return (
                                    <div key={uuidv4()} className="w-full flex justify-end gap-2">
                                        <div className="py-2 px-4 bg-muted rounded-xl">{message.message}</div>
                                    </div>
                                )
                            } else {
                                // Process message to handle <recipe> tags
                                const processRecipeContent = (content: string) => {
                                    const recipeRegex = /<recipe>([\s\S]*?)<\/recipe>/;
                                    const match = content.match(recipeRegex);

                                    if (match) {
                                        const beforeRecipe = content.substring(0, match.index);
                                        const recipeContent = match[1];
                                        const afterRecipe = content.substring(match.index! + match[0].length);
                                        const saveButtonId = `recipe-${message.message.length}-${recipeContent.substring(0, 20).replace(/\s+/g, '-')}`;

                                        return (
                                            <>
                                                {beforeRecipe && <ReactMarkdown remarkPlugins={[remarkGfm]}>{beforeRecipe}</ReactMarkdown>}
                                                <div className="bg-blue-950 bg-opacity-40 p-4 rounded-xl  my-4 flex flex-col">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{recipeContent}</ReactMarkdown>
                                                    {recipeSaved === saveButtonId ? (
                                                        <Button className={`mt-4 bg-green-800 text-white hover:bg-green-800`}><Check className="!size-4" />Recipe Saved</Button>
                                                    ) : (
                                                        <Button onClick={() => handleSaveRecipe(saveButtonId)} id={saveButtonId} className={`mt-4 bg-blue-900 text-white hover:bg-blue-950 bg-opacity-30`}><Save className="!size-4" />Save Recipe</Button>
                                                    )}
                                                </div>
                                                {afterRecipe && <ReactMarkdown remarkPlugins={[remarkGfm]}>{afterRecipe}</ReactMarkdown>}
                                            </>
                                        );
                                    }

                                    return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
                                };

                                return (
                                    <div key={uuidv4()} className="w-full flex justify-start gap-2">
                                        <div className="p-2 rounded-xl">
                                            {processRecipeContent(message.message)}
                                        </div>
                                    </div>
                                )
                            }
                        })

                    }
                    {isResponseLoading && (
                        <div className="w-full h-4 relative">
                            <AIResponseLoader />
                        </div>
                    )}
                </div >
            </div>
            {/* Input field */}
            <InputField request={request} createResponseHandler={createResponseHandler} onInputChange={onInputChange} handleKeyDown={handleKeyDown} />
        </div>
    )
}

export default GenerateRecipe