import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CardContent } from '@/components/ui/card'
import { Filter, Plus } from 'lucide-react'

interface EmptyStateProps {
    filteredItems: any[]
    items: any[]
    setIsAddDialogOpen: (open: boolean) => void
}
const EmptyState = ({ filteredItems, items, setIsAddDialogOpen }: EmptyStateProps) => {
    return (
        <>
            {filteredItems.length === 0 && items.length > 0 && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center py-8">
                            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No items found</h3>
                            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                        </div>
                    </CardContent>
                </Card>
            )}

            {filteredItems.length === 0 && items.length === 0 && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-center py-8">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">No food items yet</h3>
                            <p className="text-muted-foreground mb-4">Start by adding your first food item to track your inventory</p>
                            <Button onClick={() => setIsAddDialogOpen(true)}>
                                <Plus className="w-4 h-4 mr-2" />
                                Add Your First Item
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

        </>
    )
}

export default EmptyState