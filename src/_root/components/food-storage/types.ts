interface FoodItem {
    id?: number
    name: string
    quantity: number
    weight_in_gram?: number
    category?: string
    expiration_date?: string
    user_id: number
}

export type { FoodItem }