import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton, SidebarSeparator } from './ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { Archive, Bolt, ChevronsUpDown, CookingPot, Ellipsis, House, LogOut, Settings2, User } from 'lucide-react'
import { useAuthContext } from '@/context/AuthProvider'
import logo from "@/assets/logo.png"
import { UserType } from '@/types/userTypes'

const AdvancedProfile = ({ user }:{user: UserType}) => {
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
                <DropdownMenuItem >
                    <SidebarMenuButton >
                        <Bolt size={16} />
                        Account
                    </SidebarMenuButton>
                </DropdownMenuItem>

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


const AppSidebar = ({ user }:{user: UserType}) => {
    return (
        <Sidebar>
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
            <SidebarContent>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <House />
                                Home
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <CookingPot />
                                Recipes
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Archive size={16} />
                                Storage
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
                <SidebarSeparator />
                {/* Chats */}
                <SidebarGroupLabel>Chats</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Ellipsis />
                                ExampleChat1
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <Ellipsis />
                                ExampleChat2
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarContent>
            {/* Footer */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <AdvancedProfile user={user} />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar