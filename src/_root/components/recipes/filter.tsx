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
import { useEffect, useState } from "react"
import { RecipeType } from "@/lib/api/recipes"
import { categoryToUppercase, Duration, rateDuration } from "./helper"
import { cn } from "@/lib/utils"

interface FilterProps {
    items: RecipeType[]
    setFilteredItems: (items: RecipeType[]) => void,
    className?: string
}

const matchesSearchItems = (searchTerm: string, ...props: string[]) => {
    return props.some((prop) => prop.toLowerCase().includes(searchTerm.toLowerCase()))
}

const FilterCard = ({ items, setFilteredItems, className="" }: FilterProps) => {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [filterCategories, setFilterCategories] = useState<string[]>([])
    const [cookTimeSelector, setCookTimeSelector] = useState<string>("all");
    // Filter and search logic
    const filteredItems = items.filter((item) => {
        // Search filter
        const matchesSearch = matchesSearchItems(searchTerm, item.title, item.content, item.short_description, item.category);

        // Category filter
        const matchesCategory = categoryFilter === "all" || item.category.toLowerCase() === categoryFilter.toLowerCase();

        // Cook time filter
        console.log("cooktimeselector: ", rateDuration(item.duration_in_minutes))
        const matchesCookTime = cookTimeSelector === "all" || rateDuration(item.duration_in_minutes).toString() === cookTimeSelector;

        return matchesSearch && matchesCategory && matchesCookTime
    });


    useEffect(() => {
        if (searchTerm === "" && categoryFilter === "all" && cookTimeSelector === "all") {
            setSearchTerm("")
            setFilteredItems(items)
            return;
        }
        setFilteredItems(filteredItems);
    }, [searchTerm, categoryFilter, cookTimeSelector]);

    useEffect(() => {
        const uniqueCategories = Array.from(new Set(items.map(item => categoryToUppercase(item.category))));
        setFilterCategories(uniqueCategories);
    }, [items])


    const clearFilters = () => {
        setSearchTerm("")
        setCategoryFilter("all")
        setCookTimeSelector("all")
    }

    return (
        <div className={cn(className)}>
            <Card>
                <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 md:min-w-[15em] block">
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
                        <div className="flex flex-col flex-wrap sm:flex-row gap-4">
                            <div className="min-w-[160px]">
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {filterCategories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="min-w-[160px]">
                                <Select value={cookTimeSelector} onValueChange={setCookTimeSelector}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Durations" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Durations</SelectItem>
                                        {Object.keys(Duration).filter(key => isNaN(Number(key))).map((cookTime) => (
                                            <SelectItem key={cookTime} value={cookTime.toString()}>
                                                {cookTime.toString()}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {(searchTerm || categoryFilter !== "all" || cookTimeSelector !== "all") && (
                                <Button variant="outline" onClick={clearFilters} size="sm">
                                    <X className="w-4 h-4 mr-2" />
                                    Clear
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="mt-4 text-sm text-muted-foreground">
                        Showing {filteredItems.length} of {items.length} recipes
                        {searchTerm && <span> matching "{searchTerm}"</span>}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default FilterCard