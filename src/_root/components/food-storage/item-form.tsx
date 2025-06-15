import { useState } from "react"
import { FoodItem } from "./types"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectItem } from "@/components/ui/select"
import { categories } from "@/constants/food-storage"

interface ItemFormProps{
    initialItem?: FoodItem
    onSubmit: (item: FoodItem) => void
    onCancel: () => void
}

const ItemForm =({
    initialItem,
    onSubmit,
    onCancel,
  }: ItemFormProps) =>{
    const [formData, setFormData] = useState<FoodItem>({
      name: initialItem?.name || "",
      quantity: initialItem?.quantity || 1,
      weight_in_gram: initialItem?.weight_in_gram || undefined,
      category: initialItem?.category || undefined,
      expiration_date: initialItem?.expiration_date || "",
      user_id: initialItem?.user_id || 1,
      ...(initialItem?.id && { id: initialItem.id }),
    })
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (!formData.name.trim()) return
      onSubmit(formData)
    }
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter food item name"
            required
          />
        </div>
  
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="quantity">Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 1 })}
              required
            />
          </div>
          <div>
            <Label htmlFor="weight">Weight (grams)</Label>
            <Input
              id="weight"
              type="number"
              min="0"
              step="0.1"
              value={formData.weight_in_gram || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  weight_in_gram: e.target.value ? Number.parseFloat(e.target.value) : undefined,
                })
              }
              placeholder="Optional"
            />
          </div>
        </div>
  
        <div>
          <Label htmlFor="category">Category</Label>
          <Select required value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
  
        <div>
          <Label htmlFor="expiration">Expiration Date</Label>
          <Input
            id="expiration"
            type="date"
            value={formData.expiration_date}
            onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
          />
        </div>
  
        <div className="flex gap-2 pt-4">
          <Button type="submit" className="flex-1">
            {initialItem ? "Update Item" : "Add Item"}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    )
  }
  
  export default ItemForm