import logoUrl from "@/assets/logo.png"
import backgroundImageUrl from "@/assets/foodBackground02.png"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "@/context/AuthProvider";
import Loader from "@/components/Loader";
const AuthLayout = () =>{
    const {isLoading, isLoggedIn, user, token } = useAuthContext();
    if(isLoading) return <Loader/>
    if(!isLoading && isLoggedIn) return <Navigate to='/'/>
    return (
        <div className="w-screen h-screen flex justify-center items-center">    
            <img src={backgroundImageUrl} className="absolute opacity-5 w-full h-full object-cover -z-10"/>        
            <div className="max-w-[50em] w-full flex flex-col md:flex-row">
                <div className="w-full p-4 flex justify-center">
                    <div className="w-[10em] md:w-full rounded-xl overflow-hidden">
                        <img src={logoUrl}/>
                    </div>
                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus consectetur necessitatibus asperiores eligendi quae odit explicabo omnis minus, libero beatae laborum quam ut. Error, ratione earum ut laborum dolor laboriosam.</p> */}
                </div>
                <div className="max-w-[25em] m-auto w-full p-4 flex items-center justify-center flex-col space-y-4">
                    <Outlet/>
                </div>
            </div>
            
        </div>
    )
}

export default AuthLayout