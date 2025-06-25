import { config } from "./config";

export interface RecipeType {
    id: number;
    title: string;
    category: string;
    short_description: string;
    duration_in_minutes: number;
    content: string;
    user_id: number;
}

// get recipe
const getRecipe = async (recipeId: number) => {
    try {
        const endpoint =
            `${config.pythonEndpoint}/recipes/get_recipe/${recipeId}`;
        const response = await fetch(endpoint, {
            method: "get",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error getting recipe");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Error getting recipe");
    }
};

// get recipes
const getRecipes = async () => {
    try {
        const endpoint = `${config.pythonEndpoint}/recipes/get_recipes`;
        const response = await fetch(endpoint, {
            method: "get",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error getting recipes");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Error getting recipes");
    }
};

// add recipe
const addRecipe = async (recipe: string) => {
    try {
        const endpoint = `${config.pythonEndpoint}/recipes/add_recipe`;
        const response = await fetch(endpoint, {
            method: "post",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipe: recipe,
            }),
        });

        if (!response.ok) {
            throw new Error("Error adding recipe");
        }
        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Error adding recipe");
    }
};

// use recipe
const useRecipe = async (recipe: string) => {
    try {
        const endpoint = `${config.pythonEndpoint}/recipes/use_recipe`;
        const response = await fetch(endpoint, {
            method: "post",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipe: recipe,
            }),
        });
        if (!response.ok) {
            throw new Error("Error using recipe");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Error using recipe");
    }
};

// delete recipe
const deleteRecipe = async (recipes: RecipeType[])=> {
    try {
        const endpoint = `${config.pythonEndpoint}/recipes/delete_recipes`;
        const response = await fetch(endpoint, {
            method: 'delete',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipes)
        })
        if (!response.ok) {
            throw new Error("Error deleting recipe");
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw new Error("Error deleting recipe");
    }
}

export {
    getRecipe,
    getRecipes,
    addRecipe,
    useRecipe,
    deleteRecipe,
}