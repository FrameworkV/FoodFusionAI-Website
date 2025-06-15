import { Badge } from '@/components/ui/badge'
import { CardContent } from '@/components/ui/card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { categoryColors } from '@/constants/food-storage'
import { isExpired, isExpiringSoon } from './helper'

interface MobileCardProps {
    filteredItems: any[]
    handleDeleteItem: (id: number) => void
    setEditingItem: (item: any) => void
    setIsEditDialogOpen: (open: boolean) => void
}
const MobileCard = ({ filteredItems, handleDeleteItem, setEditingItem, setIsEditDialogOpen }: MobileCardProps) => {
    return (
        <>
            <div className="md:hidden space-y-4">
                {filteredItems.map((item) => (
                    <Card key={item.id}>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg">{item.name}</h3>
                                    {item.category && (
                                        <Badge className={`${categoryColors[item.category] || categoryColors.Other} mt-1`}>
                                            {item.category}
                                        </Badge>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setEditingItem(item)
                                            setIsEditDialogOpen(true)
                                        }}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={() => handleDeleteItem(item.id!)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Quantity:</span>
                                    <div className="font-medium">{item.quantity}</div>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Weight:</span>
                                    <div className="font-medium">{item.weight_in_gram ? `${item.weight_in_gram}g` : "-"}</div>
                                </div>
                                {item.expiration_date && (
                                    <div className="col-span-2">
                                        <span className="text-muted-foreground">Expires:</span>
                                        <div
                                            className={`font-medium flex items-center gap-2 ${isExpired(item.expiration_date)
                                                    ? "text-red-500"
                                                    : isExpiringSoon(item.expiration_date)
                                                        ? "text-orange-500"
                                                        : ""
                                                }`}
                                        >
                                            {item.expiration_date}
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default MobileCard