import { TableCell } from "@/components/ui/table"
import { TableBody } from "@/components/ui/table"
import { TableRow } from "@/components/ui/table"
import { TableHeader } from '@/components/ui/table'
import { TableHead } from '@/components/ui/table'
import { Table } from "@/components/ui/table"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Card } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categoryColors } from "@/constants/food-storage"
import { isExpired, isExpiringSoon } from "./helper"


interface DesktopCardProps {
    filteredItems: any[]
    handleDeleteItem: (id: number) => void
    setEditingItem: (item: any) => void
    setIsEditDialogOpen: (open: boolean) => void
}

const DesktopCard = ({ filteredItems, handleDeleteItem, setEditingItem, setIsEditDialogOpen}: DesktopCardProps) => {
    return (
        <>
            <div className="hidden md:block">
                <Card>
                    <CardHeader>
                        <CardTitle>Food Items ({filteredItems.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Weight (g)</TableHead>
                                    <TableHead>Expiration</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>
                                            {item.category && (
                                                <Badge className={categoryColors[item.category] || categoryColors.Other}>{item.category}</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.weight_in_gram || "-"}</TableCell>
                                        <TableCell>
                                            {item.expiration_date ? (
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        className={`block flex items-center gap-2 ${isExpired(item.expiration_date)
                                                                ? "text-red-500 font-semibold"
                                                                : isExpiringSoon(item.expiration_date)
                                                                    ? "text-orange-500 font-semibold"
                                                                    : ""
                                                            }`}
                                                    >
                                                        {item.expiration_date}
                                                        <Calendar className="w-4 h-4" />
                                                    </span>
                                                    
                                                </div>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>
                                        <TableCell>
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
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

export default DesktopCard