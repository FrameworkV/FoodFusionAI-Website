import AppSidebar from '@/_root/components/app-sidebar'
import { SidebarLink } from '@/components/types'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useAuthContext } from '@/context/AuthProvider'
import { getChats } from '@/lib/api/recipes'
import { useQuery } from '@tanstack/react-query'
import { Archive, CookingPot, House, Pencil } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'


interface ChatLink {
    title: string,
    link: string
}

interface ChatLinkProps {
    chatLinks: ChatLink[],
    isVisible: Boolean,
    isLoading: Boolean
}

const RootSidebar = () => {
    const { user } = useAuthContext();
    const { pathname } = useLocation();
    //TODO: make more efficient - only fetch when on generate-recipe route
    const { data: chatLinks, isLoading } = useQuery({
        queryKey: ['chatLinks'],
        queryFn: getChats,
        staleTime: 20000, // Cache data for 20 seconds before refetching
    });
    const [isChatNavigationVisible, setIsChatNavigationVisible] = useState(false);

    useEffect(() => {
        if (pathname.includes("/generate-recipe")) {
            setIsChatNavigationVisible(true)
        } else {
            setIsChatNavigationVisible(false)
        }
    }, [pathname])


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

    const chatLinkProps: ChatLinkProps = {
        chatLinks: chatLinks,
        isVisible: isChatNavigationVisible,
        isLoading: isLoading
    }

    return (

        <SidebarProvider className='h-screen'>
            <AppSidebar chatLinkProps={chatLinkProps} sidebarLinks={sidebarLinks} user={user} />
            <SidebarInset className='overflow-hidden'>
                <div className="flex flex-1 flex-col ">
                    <div className="@container/main flex flex-1 flex-col py-4 px-2">
                        <div className='p-4 absolute top-0 left-0'>
                            <SidebarTrigger className="" />
                        </div>
                        <div className="flex flex-col ">
                            <div className="px-4 lg:px-6">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider >
    )
}

export default RootSidebar