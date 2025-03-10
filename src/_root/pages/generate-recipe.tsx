import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { generateRecipe, getMessages } from "@/lib/api/recipes"
import { parseLLMResponse } from "@/utils/helperFunctions"
import { Send } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"


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
    const [messages, setMessages] = useState<MessageType[]>([])
    const [modelOptions] = useState<string[]>(["g-01-base", "g-01-reasoning"]) //TODO: fetch model options
    const [model, setModel] = useState(modelOptions[0])

    useEffect(() => {
        (async () => {
            // if chat exists, get messages from chatId
            if (pathname !== "/generate-recipe") {
                const chatId = pathname.split("/").pop();
                if (chatId) {
                    // get messages
                    const messages = await getMessages(chatId);
                    // transform message types to enum
                    messages.forEach((message:MessageType) => {
                        message.role = message.role === "ai" ? FromEnum.ai : FromEnum.human
                    });
                    console.log("Messages: ", messages)
                    setMessages(messages);
                }
            }
        })()
    }, [])
    

    const createResponseHandler = async () => {
        setMessages(prev => [...prev, { message: request, role: FromEnum.human }])
        let chatId = ""

        if (pathname === "/generate-recipe") {
            chatId = uuidv4()
            navigate(`/generate-recipe/${chatId}`)
        } else {
            chatId = pathname.split("/").pop() || uuidv4()
        }

        const responseStream = await generateRecipe({ chatId, request })

        // handle stream
        if (!responseStream.body) return null // TODO: handle error

        const reader = responseStream.body.getReader();
        const decoder = new TextDecoder("utf-8");
        // const messageId = uuidv4()
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const decodedValue = decoder.decode(value);
            // console.log("dec: ", decodedValue)
            const res = parseLLMResponse(decodedValue);
            setMessages(prev => [...prev, { message: res, role: FromEnum.ai }])
        }
    }

    return (
        <div className="w-full h-full overflow-hidden flex flex-col">
            {/* Info window */}
            <div className="w-max">
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
            <ChatWindow messages={messages} createResponseHandler={createResponseHandler} setRequest={setRequest} />
        </div>

    )
}

const ChatWindow = ({ messages, createResponseHandler, setRequest }:{messages: MessageType[], createResponseHandler:()=>void, setRequest:React.Dispatch<React.SetStateAction<string>>}) => {
    const { pathname } = useLocation();
    const onInputChange = (changedValue:string) => {
        setRequest(changedValue);
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            createResponseHandler();
        }        
    }
    return pathname === "/generate-recipe" ? (
        <>
            {/* New chat window */}
            <div className="w-full h-full flex flex-col justify-center items-center gap-8">
                <div className="text-center flex flex-col gap-2">
                    <h2 className="text-3xl font-semibold">Let's create a new Recipe!</h2>
                    <p className="text-sm text-muted-foreground">Or choose from your previous chats on the left</p>
                </div>
                <div className="w-full h-max flex gap-2 p-2 bg-muted rounded-xl ">
                    <Textarea onChange={({ target }) => onInputChange(target.value)} className="w-full h-min resize-none !ring-transparent " placeholder="Send a message to create a new Recipe..." />
                    <Button onClick={() => createResponseHandler()}><Send /></Button>
                </div>
            </div>
        </>
    ) : (
        <>
            {/* Existing chat window */}
            {/* Messages */}
            <div className="w-full h-full p-2 flex flex-col overflow-y-scroll">
                {/* Right chat message */}
                {
                    messages.map((message: MessageType) => {
                        if (message.role === FromEnum.human) {
                            return (
                                <div key={uuidv4()} className="w-full flex justify-end gap-2">
                                    <div className="py-2 px-4 bg-muted rounded-xl text-white">{message.message}</div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={uuidv4()} className="w-full flex justify-start gap-2">
                                    <div className="p-2 rounded-xl">{message.message}</div>
                                </div>
                            )
                        }
                    })
                }
            </div>
            {/* Input field */}
            <div className="w-full h-max flex gap-2 p-2 bg-muted rounded-xl ">
                <Textarea onChange={({ target }) => onInputChange(target.value)} className="w-full h-min resize-none !ring-transparent " placeholder="Send a message to create a new Recipe..." />
                <Button onClick={() => createResponseHandler()}><Send /></Button>
            </div>
        </>
    )
}

export default GenerateRecipe