import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'
import { Save } from 'lucide-react'

interface NotificationBannerProps {
    handleSave: () => void
    handleCancel: () => void
}

const NotificationBanner = ({ handleSave, handleCancel }: NotificationBannerProps) => {
    return (
        <>
            <Card className=" bg-muted">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-sm font-medium">You have unsaved changes</span>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleSave} size="sm">
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                            <Button onClick={handleCancel} variant="outline" size="sm">
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default NotificationBanner