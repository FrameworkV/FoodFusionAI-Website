import Loader from '@/components/loader';
import { useAuthContext } from '@/context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

const RootLayout = () => {
    const {isLoading, isLoggedIn} = useAuthContext();
    if(isLoading) return <Loader/>
    if(!isLoading && !isLoggedIn) return <Navigate to='/sign-in'/>
    return (
        <div className=''><Outlet /></div>
    )
}

export default RootLayout