import { UserType } from "@/types/userTypes";

export interface AuthContextType {
    isLoggedIn: Boolean;
    setIsLoggedIn: Function;
    user: UserType;
    setUser: Function;
    token: string;
    setToken: Function;
    isLoading: Boolean;
    setIsLoading: Function;
    logout: Function;
}