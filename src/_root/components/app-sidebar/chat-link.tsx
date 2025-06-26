import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useToast } from '@/hooks/use-toast';
import { deleteChat } from '@/lib/api/llm_chats';
import { useQueryClient } from '@tanstack/react-query';
import { Ellipsis, Trash } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const ChatLink = ({ chat }: { chat: any }) => {
    const chatId = useLocation().pathname.split("/").pop();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const handleDeleteChat = async (id: string) => {
        try {
            const response = await deleteChat(id);

            // refetch chats
            queryClient.invalidateQueries({ queryKey: ["chatLinks"] });
            console.log("deleting chat response: ", response);
            toast({
                title: "Chat deleted",
                description: "The chat has been deleted",
            })
        } catch (error) {
            toast({
                title: "Something went wrong",
                description: "We couldn't delete the chat",
                variant: "destructive"
            })
        }
    }
    return (
        <SidebarMenuItem className={chatId == chat.link.split("/").pop() ? 'bg-muted rounded-md' : ''}>
            <DropdownMenu>
                <Link to={chat.link} >
                    <SidebarMenuButton>
                        <DropdownMenuTrigger>
                            <Ellipsis />
                        </DropdownMenuTrigger>
                        {chat.title}
                    </SidebarMenuButton>
                </Link>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDeleteChat(chat.link.split("/").pop())} className='flex space-x-2 justify-center items-center cursor-pointer'><Trash /><p>Delete Chat</p></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    )
}

export default ChatLink