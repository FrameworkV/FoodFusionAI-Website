import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useAuthContext } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { deleteAccount } from "@/lib/api/user"

const DeleteAccount = () => {

    const { setIsLoggedIn, setUser } = useAuthContext();
    const { toast } = useToast();

    const deleteAccountHandler = async () => {
        // delete account
        const response = await deleteAccount();
        if (!response) {
            // toast error
            toast(
                {
                    title: "Error Deleting Account",
                    description: "There was an error deleting your account.",
                    variant: "destructive"
                }
            );
            return;
        }
        // log out
        localStorage.setItem("token", "");
        setUser({ username: "", email: "" });
        setIsLoggedIn(false);

        // toast that account has been deleted
        toast(
            {
                title: "Account Deleted",
                description: "Your account has been deleted.",
                variant: "default"
            }
        );
    }
    return (
        <>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteAccountHandler()}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </>

    )
}

export default DeleteAccount