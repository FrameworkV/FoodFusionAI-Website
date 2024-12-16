import AppSidebar from '@/_root/components/app-sidebar'
import { SidebarLink } from '@/components/types'
import { Dialog } from '@/components/ui/dialog'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthContext } from '@/context/AuthProvider'
import { Archive, CookingPot, House, Pencil } from 'lucide-react'
import { Outlet } from 'react-router-dom'

const RootSidebar = () => {
    const { user } = useAuthContext();

    const sidebarLinks: SidebarLink[] = [
        {
            name: 'Home',
            to: '/',
            icon: House
        },
        {
            name: 'Recipes',
            to: '/recipes',
            icon: CookingPot
        },
        {
            name: 'Generate Recipe',
            to: '/generate-recipe',
            icon: Pencil
        },
        {
            name: 'Storage',
            to: '/storage',
            icon: Archive
        },
    ]

    return (

        <SidebarProvider>

            <AppSidebar sidebarLinks={sidebarLinks} user={user} />

            <main className='w-full'>
                <SidebarTrigger className='absolute top-0' />
                <div className='w-full h-full flex'>
                    <div className='text-xl max-w-[40em] w-full mx-auto px-8 py-4'>
                        {/* Content */}
                        <Outlet />
                    </div>
                </div>
            </main>
        </SidebarProvider >

    )
}

export default RootSidebar