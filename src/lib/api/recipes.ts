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
