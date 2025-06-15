import { FoodItem } from "@/_root/components/food-storage/types";
import { config } from "./config";

const getItems = async () => {
    try {
        const response = await fetch(
            `${config.pythonEndpoint}/items/get_items`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                method: "get",
            },
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        return await response.json();
    } catch (error) {
        console.log("Error fetching items:", error);
        throw error;
    }
}

const addItems = async (items: FoodItem[]) => {
    try {
        const response = await fetch(
            `${config.pythonEndpoint}/items/add_items`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                method: "post",
                body: JSON.stringify(items),
            },
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};

const updateItems = async (items: FoodItem[]) => {
    console.log("data: ", items);
    try {
        const response = await fetch(
            `${config.pythonEndpoint}/items/update_items`,
            {
                method: "put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(items),
            },
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error updating item:", error);
        throw error;
    }
};

const deleteItems = async (items: FoodItem[]) => {
    try {
        const response = await fetch(
            `${config.pythonEndpoint}/items/delete_items`,
            {
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(items),
            },
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error deleting item:", error);
        throw error;
    }
};

export { getItems, addItems, updateItems, deleteItems };
