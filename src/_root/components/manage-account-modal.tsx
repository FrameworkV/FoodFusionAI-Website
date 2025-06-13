import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { Bolt } from 'lucide-react'
import DeleteAccount from './delete-account'

const ManageAccountModal = ({ handleOpenDialog }: { handleOpenDialog: () => void }) => {

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        handleOpenDialog();
    };
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