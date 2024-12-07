import AppSidebar from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthContext } from '@/context/AuthProvider'
import { Outlet } from 'react-router-dom'

const RootSidebar = () => {
    const { user } = useAuthContext();
    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <main className='w-full'>
                <SidebarTrigger className='absolute top-0' />
                <div className='w-full h-full flex'>
                    <div className='text-xl max-w-[30em] w-full mx-auto px-8 py-4'>
                        {/* Content */}
                        <Outlet />
                    </div>
                </div>
            </main>
        </SidebarProvider >
    )
}

export default RootSidebar