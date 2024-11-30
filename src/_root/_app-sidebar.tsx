import AppSidebar from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthContext } from '@/context/AuthProvider'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootSidebar = () => {
    const {user} = useAuthContext();
    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <main className='w-full'>
                <SidebarTrigger className='absolute top-0' />
                {/* Content */}
                <Outlet />
            </main>
        </SidebarProvider>
    )
}

export default RootSidebar