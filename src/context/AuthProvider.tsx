import { UserType } from "@/types/userTypes";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    isLoggedIn: Boolean;
    setIsLoggedIn: Function;
    user: any;
    setUser: Function;
    token: string;
    setToken: Function;
    isLoading: Boolean;
    setIsLoading: Function;
    logout: Function;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({children})=>{
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [user, setUser] = useState<UserType>({
        username:"",
        email:""
    });
    const [token, setToken] = useState<string>("");
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    // login user on reload
    useEffect(()=>{        
            const token = localStorage.getItem("token");
            if(token){
                //TBD: validate token by server request
    
                //get user details
                const simulatedUser: UserType = {
                    username:"testUser",
                    email:"test@example.com"
                }
                setToken(token);
                setUser(simulatedUser);
                setIsLoggedIn(true);
                console.log("User logged in successfully with token: ",token);
            }else{
                console.log("No token found");
            }        
            setIsLoading(false);
    },[]);

    //set token to local storage
    useEffect(()=>{        
        if(token!=""){
            localStorage.setItem("token",token);
            console.log("Token set to local storage");
        }
    },[token]);
    // useEffect(()=>{
    //     //check if token is available
    //     if(token){
    //         setIsLoggedIn(true);
    //     }
    // },[]);

    // //simulate loading
    // useEffect(()=>{
    //     //sleep for 2 seconds
    //     setTimeout(()=>{
    //         setIsLoading(false);
    //     },2000)
    // },[]);

    const logout = ()=>{
        setIsLoading(true);
        setToken("");
        localStorage.removeItem("token");
        setUser(
            {
                username:"",
                email:""
            }
        )        
        setIsLoggedIn(false);        
        setIsLoading(false);
    }

    
    return(
        <AuthContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            isLoading,
            setIsLoading,
            token,
            setToken,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
} 
export default AuthProvider;