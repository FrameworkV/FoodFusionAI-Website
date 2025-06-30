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
            body: JSON.stringify({ username, email, password }),
        });
        if(!response.ok) throw new Error("Error creating account");
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
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
        });
        if (!response.ok) throw new Error("Error deleting account");
        return true;
    } catch (error) {
        throw new Error("Error deleting account");
    }
};

const validateJWT = async () => {
    try {
        const endpoint = `${config.pythonEndpoint}/users/validate_jwt?token=${localStorage.getItem("token")}`;
        const response = await fetch(endpoint,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if(!response.ok) throw new Error("Error validating JWT");
        return true;
    } catch (error) {
        throw new Error("Error validating JWT")
    }
}

const updateUser = async ({username, email}:{username?:string, email?:string}) => {
    try {
        const endpoint = `${config.pythonEndpoint}/users/auth/update_user`;
        const response = await fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ username, email }),
        });
        console.log("response:", response)
        if(!response.ok) throw new Error("Error updating user");
        return true;
    }catch (error) {
        throw new Error("Error updating user");
    }
}

export {
    createAccount,
    signIn,
    deleteAccount,
    validateJWT,
    updateUser,
}