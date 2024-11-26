import Loader from '@/components/Loader';
import { useAuthContext } from '@/context/AuthProvider'
import { Navigate, Outlet } from 'react-router-dom'

const RootLayout = () => {
    const {isLoading, isLoggedIn, user, token } = useAuthContext();
    if(isLoading) return <Loader/>
    if(!isLoading && !isLoggedIn) return <Navigate to='/sign-in'/>
    return (
        <div className=''><Outlet /></div>
    )
}

export default RootLayout