interface ParsedResponse {
    user_id?: string;
    chat_id?: string;
    model?: string;
    response?: string;
    streamed_response?: boolean;
    is_last?: boolean;
    [key: string]: string | boolean | undefined;
}

const parseLLMResponse = (response: string): string => {
    response = response.replace("data: ", "");
    const keyValues = response.match(/(\w+)=('[^']*'|"[^"]*"|\S+)/g) || [];
    console.log("Key values: ", keyValues);
    // const parsedResponse: ParsedResponse = {};
    let responseValue = "";

    keyValues.forEach((keyValue) => {
        let [key, value] = keyValue.split("=");
        if (key=="response" && value) {
            value = value.replace(/['"]+/g, '');
            responseValue += value;
        }
    });
    return responseValue;
};

export { parseLLMResponse };