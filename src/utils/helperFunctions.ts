interface ParsedResponse {
    user_id?: string;
    chat_id?: string;
    model?: string;
    response?: string;
    streamed_response?: boolean;
    is_last?: boolean;
    [key: string]: string | boolean | undefined;
}

/**
 * Parses the LLM response from the server's SSE stream
 * @param {string} response - The raw response string from the SSE event
 * @returns {string} - The parsed response text
 */
const parseLLMResponse = (response: string): string => {
    // Remove the 'data: ' prefix if present
    response = response.replace(/^data:\s*/i, "");
    
    // Handle empty or invalid responses
    if (!response || response === "[DONE]") {
        return "";
    }
    
    try {
        // First try to parse as JSON in case the server sends JSON format
        try {
            const jsonResponse = JSON.parse(response);
            if (jsonResponse.response) {
                return jsonResponse.response;
            }
        } catch {
            // Not JSON, continue with key-value parsing
        }
        
        // Extract key-value pairs from the response
        const keyValues = response.match(/(\w+)=('[^']*'|"[^"]*"|\S+)/g) || [];
        let responseValue = "";

        keyValues.forEach((keyValue) => {
            const [key, value] = keyValue.split("=");
            if (key === "response" && value) {
                // Remove any quotes around the value
                responseValue += value.replace(/^['"]|['"]$/g, '');
            }
        });
        
        return responseValue;
    } catch (error) {
        console.error("Error parsing LLM response:", error);
        return response; // Return the original response if parsing fails
    }
};

export { parseLLMResponse };