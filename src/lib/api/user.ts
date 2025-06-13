import { config } from "./config";

/*
* Create a new account
* @param {string} username - The username of the new user
* @param {string} email - The email of the new user
* @param {string} password - The password of the new user
* @returns {boolean} - True if the account was created successfully, false otherwise
**/
const createAccount = async (username: string, email: string, password: string) => {
    try {
        const endpoint = `${config.pythonEndpoint}/users/create_user`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",   
            body: JSON.stringify({ username, email, password }),
        });
        if(!response.ok) throw new Error("Error creating account");
        return signIn(username, password);
    } catch (error) {
        console.log("error:", error);
        throw new Error("Error creating account");
    }
}

const signIn = async (username: string, password: string) => {
    try {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        const endpoint = `${config.pythonEndpoint}/users/auth/login`;
        const response = await fetch(endpoint, {
            method: "POST",
            mode: "cors",                        
            body: formData,
        });
        console.log("response:", response);
        if(!response.ok) throw new Error("Error signing in");
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.log("error:", error);
        throw new Error("Error signing in");
    }
}

const deleteAccount = async () => {
    try {
        const endpoint = `${config.pythonEndpoint}/users/auth/delete_user`;
        const response = await fetch(endpoint, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            mode: "cors",   
        });
        if (!response.ok) throw new Error("Error deleting account");
        return true;
    } catch (error) {
        throw new Error("Error deleting account");
    }
};

export {
    createAccount,
    signIn,
    deleteAccount
}