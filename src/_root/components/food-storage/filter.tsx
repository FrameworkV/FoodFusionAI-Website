import { Button } from "@/components/ui/button"
import { SelectContent } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { SelectItem } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { categories } from "@/constants/food-storage"
import { useEffect, useState } from "react"
import { isExpired, isExpiringSoon } from "./helper"

interface FilterProps {
    items: any[]
    setFilteredItems: (items: any[]) => void
}

const FilterCard = ({ items, setFilteredItems }: FilterProps) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [expirationFilter, setExpirationFilter] = useState<string>("all")
    // Filter and search logic
    const filteredItems = items.filter((item) => {
        // Search filter
        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))

        // Category filter
        const matchesCategory = categoryFilter === "all" || item.category === categoryFilter

        // Expiration filter
        let matchesExpiration = true
        switch (expirationFilter) {
            case "expired":
                matchesExpiration = isExpired(item.expiration_date)
                break;
            case "expiring-soon":
                matchesExpiration = isExpiringSoon(item.expiration_date) && !isExpired(item.expiration_date)
                break;
            case "fresh":
                matchesExpiration = !isExpired(item.expiration_date) && !isExpiringSoon(item.expiration_date)
                break;
            case "no-expiration":
                matchesExpiration = !item.expiration_date
                break;
            default:
                matchesExpiration = true
                break;
        }

        return matchesSearch && matchesCategory && matchesExpiration
    });

    useEffect(()=>{
        setFilteredItems(filteredItems);
    },[searchTerm, categoryFilter, expirationFilter]);

    const clearFilters = () => {
        setSearchTerm("")
        setCategoryFilter("all")
        setExpirationFilter("all")
    }

    return (
        <>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                <Input
                                    placeholder="Search by name or category..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="min-w-[160px]">
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="min-w-[160px]">
                                <Select value={expirationFilter} onValueChange={setExpirationFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Items" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Items</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
                                        <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                                        <SelectItem value="fresh">Fresh</SelectItem>
                                        <SelectItem value="no-expiration">No Expiration</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {(searchTerm || categoryFilter !== "all" || expirationFilter !== "all") && (
                                <Button variant="outline" onClick={clearFilters} size="sm">
                                    <X className="w-4 h-4 mr-2" />
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-sm text-muted-foreground">
                        Showing {filteredItems.length} of {items.length} items
                        {searchTerm && <span> matching "{searchTerm}"</span>}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default FilterCard