// import { config } from "./config";

// interface ItemType {
//     id: number;
//     name: string;
//     quantity: number;
//     weight: number;
//     category: string;
//     expiration_date: string;
//     user_id: number;
// };

// export const addItem = async (item:ItemType) => {
//     const response = await fetch(`${config.pythonEndpoint}/items/add_items`, {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${localStorage.getItem("token")}`,
//         },
//         method: "POST",
//         body: JSON.stringify(item),
//     });
// };
// const updateItem = async () => {};
// const deleteItem = async () => {};
