import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton, SidebarSeparator, useSidebar } from '../../components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { ChevronsUpDown, Ellipsis, Home, Icon, LogOut, Settings2, User, UserIcon } from 'lucide-react'
import { useAuthContext } from '@/context/AuthProvider'
import logo from "@/assets/logo.png"
import { UserType } from '@/types/userTypes'
import { Link, useLocation } from 'react-router-dom'
import { SidebarLink } from '../../components/types'
import ManageAccountModal from './manage-account-modal'
import { Dialog } from '@/components/ui/dialog'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const AdvancedProfile = ({ user, handleOpenDialog }: { user: UserType, handleOpenDialog: () => void }) => {
    const { state } = useSidebar();

    const { logout } = useAuthContext();

    const isCollapsed = state === "collapsed";

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton className='flex h-10 items-center justify-between  group-data-[collapsible=icon]:!h-10 group-data-[collapsible=icon]:!w-full'>
                    <div className='flex items-center justify-center space-x-2.5 '>
                        <User className={"!mx-1 !size-6"} />
                            <div className='flex flex-col truncate'>
                                <span className='truncate'>{user.username}</span>
                                <span className='text-gray-500 font-light text-xs truncate'>{user.email}</span>
                            </div>
                    </div>
                    {!isCollapsed&&<ChevronsUpDown />}
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" className="w-[--radix-popper-anchor-width]">

                {/* account settings */}

                <ManageAccountModal handleOpenDialog={handleOpenDialog} />

                {/* account preferences */}
                <DropdownMenuItem>
                    <SidebarMenuButton >
                        <Settings2 size={16} />
                        Preferences
                    </SidebarMenuButton>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* LOGOUT */}
                <DropdownMenuItem>
                    <SidebarMenuButton onClick={() => logout()}>
                        <LogOut size={16} />
                        Logout
                    </SidebarMenuButton>
                </DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>

    )
}


const AppSidebar = ({ user, sidebarLinks, chatLinkProps }: { user: UserType, sidebarLinks: SidebarLink[], chatLinkProps: any }) => {
    const { state } = useSidebar();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const chatId = useLocation().pathname.split("/").pop();
    const {pathname} = useLocation();

    const isCollapsed = state === "collapsed";

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    }
    return (
        <Sidebar className='overflow-auto h-full flex flex-col' variant='inset' collapsible='icon'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className='flex space-x-4 w-full items-center'>
                            <img className='w-8 rounded-md aspect-square' src={logo} />
                            <p className='truncate text-lg text-blue-200'>FoodFusionAI</p>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator />

            {/* Content */}
            <SidebarContent className=' flex-col  mt-4'>
                <SidebarGroupContent className='flex items-center '>
                    <SidebarMenu className='space-y-1 flex items-center'>
                        {
                            sidebarLinks.map((link) => (
                                <SidebarMenuItem key={link.to} className={`${pathname === link.to && 'bg-blue-950 '} hover:bg-accent  rounded-lg transition-all duration-500 flex justify-center w-full`}>
                                    <Link to={link.to} className='w-full '>
                                        <SidebarMenuButton className={` group-data-[collapsible=icon]:!h-8 h-8 group-data-[collapsible=icon]:!w-full !bg-transparent`}>
                                            <link.icon className='!size-6 !mx-1'/>
                                            <span className='truncate text-base'>{link.name}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarSeparator />
                {/* Chats */}
                {!isCollapsed && (<div className='flex-1 min-h-0'>
                    {
                        chatLinkProps.isVisible && (
                            <div className='flex flex-col h-full'>
                                <SidebarGroupLabel>Chats</SidebarGroupLabel>
                                <SidebarGroupContent className='h-full overflow-hidden'>
                                    <SidebarMenu className='h-full overflow-auto scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent'>
                                        {
                                            chatLinkProps.isLoading ? (
                                                <SidebarMenuItem>
                                                    {
                                                        Array.from({ length: 3 }).map((_, index) => (
                                                            <SidebarMenuButton key={index} className='py-4'>
                                                                <Skeleton className='w-full h-6 rounded-md' />
                                                            </SidebarMenuButton>
                                                        ))
                                                    }
                                                </SidebarMenuItem>
                                            ) : chatLinkProps.chatLinks?.length == 0 ? (
                                                <SidebarMenuItem>
                                                    <SidebarMenuButton>
                                                        No chats available
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ) : chatLinkProps.chatLinks?.map((chat, index) => (
                                                <SidebarMenuItem key={chat.title + index} className={chatId == chat.link.split("/").pop() ? 'bg-muted rounded-md' : ''}>
                                                    <SidebarMenuButton>
                                                        <Ellipsis />
                                                        <Link to={chat.link}>
                                                            {chat.title}
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))
                                        }

                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </div>
                        )
                    }
                </div>)}
            </SidebarContent>
            {/* Footer */}
            <SidebarFooter className='w-full  p-0'>
                <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
                    <SidebarMenu className='w-full'>
                        <SidebarMenuItem className=' w-full'>
                            <AdvancedProfile user={user} handleOpenDialog={handleOpenDialog} />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </Dialog>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar