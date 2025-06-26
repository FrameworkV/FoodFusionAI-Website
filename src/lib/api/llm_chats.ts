import { config } from "./config";

interface generateRecipeType {
    chatId: string;
    request: string;
    model: string;
}

const generateRecipe = async (
    { chatId, request, model }: generateRecipeType,
) => {
    try {
        const endpoint = `${config.pythonEndpoint}/llm/model_request`;
        // const model = "g-01-base"; // TODO: model should be passed as prop (selected by the user)
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

const getMessages = async (chatId: string) => {
    try {
        const endpoint = `${config.pythonEndpoint}/chats/get_chat/${chatId}`;
        const response = await fetch(endpoint, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error("Error getting messages");
    }
};

const getChats = async () => {
    try {
        // track execution time
        console.time("getChats");
        const endpoint = `${config.pythonEndpoint}/chats/get_chats`;
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

const deleteChat = async (chadId: string) => {
    try {
        const endpoint = `${config.pythonEndpoint}/chats/delete_chat/${chadId}`;
        const response = await fetch(endpoint, {
            method: "delete",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Error deleting chat");
    }
};

export {
    generateRecipe,
    getMessages,
    getChats,
    deleteChat,
}
