import { FoodItem } from "@/_root/components/food-storage/types";

const sampleData: FoodItem[] = [
    {
        id: 1,
        name: "Apples",
        quantity: 5,
        weight_in_gram: 750,
        category: "Fruits",
        expiration_date: "2025-12-20",
        user_id: 1,
    },
    {
        id: 2,
        name: "Milk",
        quantity: 2,
        weight_in_gram: 2000,
        category: "Dairy",
        expiration_date: "2025-06-12",
        user_id: 1,
    },
    {
        id: 3,
        name: "Chicken Breast",
        quantity: 1,
        weight_in_gram: 500,
        category: "Meat",
        expiration_date: "2024-12-12",
        user_id: 1,
    },
    { 
        id: 4, 
        name: "Pasta", 
        quantity: 3, 
        weight_in_gram: undefined,
        category: "Pasta", 
        expiration_date: undefined,
        user_id: 1 
    },
    {
        id: 5,
        name: "Tomatoes",
        quantity: 8,
        weight_in_gram: 400,
        category: "Vegetables",
        expiration_date: "2024-12-18",
        user_id: 1,
    },
];

export { sampleData };
