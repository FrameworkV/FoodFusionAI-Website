import { config } from "./config";

interface generateRecipeType {
    chatId: string;
    request: string;
}

export const generateRecipe = async (
    { chatId, request }: generateRecipeType,
) => {
    try {
        const endpoint = `${config.pythonEndpoint}/llm/model_request`;
        const model = "g-01-base"; // TODO: model should be passed as prop (selected by the user)
        const response = await fetch(endpoint, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ chat_id: chatId, request, model: model }),
        });
        return response;
    } catch (error) {
        throw new Error("Error creating response");
    }
};

export const getMessages = async (chatId: string) => {
    try {
        const endpoint = `${config.pythonEndpoint}/llm/get_chat/${chatId}`;
        const response = await fetch(endpoint, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error("Error getting messages");
    }
};

export const getChats = async () => {
    try {
        // track execution time
        console.time("getChats");
        const endpoint = `${config.pythonEndpoint}/llm/get_chats`;
        const response = await fetch(endpoint, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        const result = await response.json();

        const restructuedResult = result.map((chat: any) => {
            return {
                link: `/generate-recipe/${chat.chat_id}`,
                title: chat.title,
            };
        });
        console.timeEnd("getChats");
        console.log("getChats", restructuedResult);
        return restructuedResult;
    } catch (error) {
        console.log(error);
        throw new Error("Error getting chats");
    }
};

export const deleteChat = async (chadId: string) => {
    try {
        const endpoint = `${config.pythonEndpoint}/llm/delete_chat/${chadId}`;
        const response = await fetch(endpoint, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting chat");
    }
};
