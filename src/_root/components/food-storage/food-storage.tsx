"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import MobileCard from "./mobile-card"
import DesktopCard from "./desktop-card"
import EmptyState from "./empty-state"
import FilterCard from "./filter"
import { FoodItem } from "./types"
import ItemForm from "./item-form"
import NotificationBanner from "./notification-banner"
import { addItems, deleteItems, getItems, updateItems } from "@/lib/api/storage"
import { v4 as uuidv4 } from 'uuid';


export default function FoodStoragePage() {
  const [items, setItems] = useState<FoodItem[]>([])
  const [filteredItems, setFilteredItems] = useState<FoodItem[]>([])
  const [originalItems, setOriginalItems] = useState<FoodItem[]>([])
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const { toast } = useToast()

  // fetch data from API
  const fetchData = async () => {
    const items = await getItems();
    setItems(items);
    setFilteredItems(items);
    setOriginalItems(JSON.parse(JSON.stringify(items)));
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const result = await updateItems(items);
      if (!result) throw new Error;
      setOriginalItems(JSON.parse(JSON.stringify(items)))
      setHasChanges(false)
      toast({
        title: "Success",
        description: "Food items saved successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save items. Please try again.",
        variant: "destructive",
      })
    }
  }, [items, toast])

  const handleCancel = () => {
    setItems(JSON.parse(JSON.stringify(originalItems)))
    setHasChanges(false)
    toast({
      title: "Changes Cancelled",
      description: "All changes have been reverted.",
    })
  }

  const handleAddItem = async (newItem: Omit<FoodItem, "id">) => {
    const item: FoodItem = {
      ...newItem,
      id: Math.floor(Math.random() * 10_000_000_000), //TODO: use uuidv4() to generate unique ID - waiting for backend to handle UUID
      user_id: 1, //TODO: Replace with actual user ID - not needed?
    }
    try {
      const response = await addItems([item]);
      if (!response) throw new Error("Failed to add item");
      setItems([...items, item]);
      toast({
        title: "Item Added",
        description: `${newItem.name} has been added to your storage.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item. Please try again.",
        variant: "destructive",
      })
      return;
    } finally {
      setIsAddDialogOpen(false)
    }

  }

  const handleEditItem = async (updatedItem: FoodItem) => {
    try {
      const response = await updateItems([updatedItem]);
      if (!response) throw new Error("Failed to update item");
      setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
      toast({
        title: "Item Updated",
        description: `${updatedItem.name} has been updated.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item. Please try again.",
        variant: "destructive",
      })
      return;
    } finally {
      setIsEditDialogOpen(false)
      setEditingItem(null)
    }
  }

  const handleDeleteItem = async (id: number) => {
    const itemToDelete = items.find((item) => item.id === id);
    try {
      const response = await deleteItems([itemToDelete!]);
      if (!response) throw new Error("Failed to delete item");
      setItems(items.filter((item) => item.id !== id))
      toast({
        title: "Item Deleted",
        description: `${itemToDelete?.name} has been removed from your storage.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item. Please try again.",
        variant: "destructive",
      })
    }

  }

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Food Storage</h1>
          <p className="text-muted-foreground">Manage your food inventory</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Food Item</DialogTitle>
              </DialogHeader>
              <ItemForm onSubmit={handleAddItem} onCancel={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <FilterCard setFilteredItems={setFilteredItems} items={items} />

      {/* Notification Banner - notify user if they have unsaved changes*/}
      {hasChanges && (
        <NotificationBanner handleSave={handleSave} handleCancel={handleCancel} />
      )}

      {/* Desktop Table View */}
      <DesktopCard filteredItems={filteredItems} handleDeleteItem={handleDeleteItem} setEditingItem={setEditingItem} setIsEditDialogOpen={setIsEditDialogOpen} />

      {/* Mobile Card View */}
      <MobileCard filteredItems={filteredItems} handleDeleteItem={handleDeleteItem} setEditingItem={setEditingItem} setIsEditDialogOpen={setIsEditDialogOpen} />

      {/* Empty State */}
      <EmptyState filteredItems={filteredItems} items={items} setIsAddDialogOpen={setIsAddDialogOpen} />

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Food Item</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <ItemForm
              initialItem={editingItem}
              onSubmit={handleEditItem}
              onCancel={() => {
                setIsEditDialogOpen(false)
                setEditingItem(null)
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}