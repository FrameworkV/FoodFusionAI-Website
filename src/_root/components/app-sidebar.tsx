import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton, SidebarSeparator } from '../../components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { ChevronsUpDown, Ellipsis, LogOut, Settings2, User } from 'lucide-react'
import { useAuthContext } from '@/context/AuthProvider'
import logo from "@/assets/logo.png"
import { UserType } from '@/types/userTypes'
import { Link } from 'react-router-dom'
import { SidebarLink } from '../../components/types'
import ManageAccountModal from './manage-account-modal'
import { Dialog } from '@/components/ui/dialog'
import { useState } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const AdvancedProfile = ({ user, handleOpenDialog }: { user: UserType, handleOpenDialog: () => void }) => {

    const { logout } = useAuthContext();



    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuSubButton className='h-full flex justify-between'>
                    <div className='flex justify-center items-center space-x-2'>
                        <User size={20} />
                        <div className='flex flex-col'>

                            <span className=''>{user.username}</span>
                            <span className='text-gray-500 font-light text-xs'>{user.email}</span>
                        </div>
                    </div>
                    <ChevronsUpDown />
                </SidebarMenuSubButton>
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    }
    return (
        <Sidebar className='overflow-auto h-full flex flex-col'>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className='flex space-x-4 w-full items-center'>
                            <img className='w-8 rounded-md aspect-square' src={logo} />
                            <p className='text-xl'>FoodFusionAI</p>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator />

            {/* Content */}
            <SidebarContent className=' flex-col'>
                <SidebarGroupContent className=''>
                    <SidebarMenu>
                        {
                            sidebarLinks.map((link) => (
                                <SidebarMenuItem key={link.to}>
                                    <SidebarMenuButton>
                                        <link.icon className='size-4' />
                                        <Link to={link.to}>{link.name}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarSeparator />
                {/* Chats */}
                <div className='flex-1 min-h-0'>
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
                                                <SidebarMenuItem key={chat.title + index}>
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
                </div>
            </SidebarContent>
            {/* Footer */}
            <SidebarFooter>
                <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <AdvancedProfile user={user} handleOpenDialog={handleOpenDialog} />
                        </SidebarMenuItem>
                    </SidebarMenu>
                </Dialog>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar