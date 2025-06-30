import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Bolt } from 'lucide-react'
import DeleteAccount from './delete-account'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useState } from 'react'
import { updateUser } from '@/lib/api/user'

const ManageAccountModal = ({ handleOpenDialog }: { handleOpenDialog: () => void }) => {
    const [newEmail, setNewEmail] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const {toast} = useToast();

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        handleOpenDialog();
    };

    const handleChangeEmail = async () => {
        console.log("changing email", newEmail)
    }
    const handleChangeUsername = async () => {
        try{
            const response = await updateUser({username: newUsername});
            console.log("response", response)
            toast({
                title: "Success",
                description: "Username changed",
            })
        }catch(error){
            toast({
                title: "Error",
                description: "Failed to change username",
                variant: "destructive",
            })
        }	
    }
    return (
        <>
            <DialogTrigger asChild>
                <DropdownMenuItem className='p-0 '>
                    <SidebarMenuButton onClick={handleClick}>
                        <Bolt size={16} />
                        Account01
                    </SidebarMenuButton>
                </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Account</DialogTitle>
                    <DialogDescription>Manage your account</DialogDescription>
                </DialogHeader>
                <div className='flex flex-col justify-center space-y-2'>
                    <Separator />
                    <div className='flex flex-col'>
                        <div>
                            <p>Change your Email:</p>
                            {/* <p className='text-sm text-muted-foreground'>Warning: This action cannot be undone</p> */}
                        </div>
                        <div className='flex space-x-2'>
                            <Input onChange={({target})=>setNewEmail(target.value)} placeholder='New Email' />
                            <Button onClick={handleChangeEmail} className='text-xs' variant="secondary">Change Email</Button>
                        </div>
                    </div>
                    <Separator />
                    <div className='flex flex-col'>
                        <div>
                            <p>Change your Username:</p>
                            {/* <p className='text-sm text-muted-foreground'>Warning: This action cannot be undone</p> */}
                        </div>
                        <div className='flex space-x-2'>
                            <Input onChange={({target})=>setNewUsername(target.value)} placeholder='New Username' />
                            <Button onClick={handleChangeUsername} className='text-xs' variant="secondary">Change Username</Button>
                        </div>
                    </div>
                    <Separator />
                    <div className='flex items-center justify-between'>
                        <div>
                            <p>Delete your Account:</p>
                            <p className='text-sm text-muted-foreground'>Warning: This action cannot be undone</p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button className='text-xs' variant="destructive">Delete Account</Button>
                            </AlertDialogTrigger>
                            <DeleteAccount />
                        </AlertDialog>

                    </div>
                </div>

            </DialogContent>
        </>

    )
}

export default ManageAccountModal