import { deleteRecipe, getRecipe, RecipeType, useRecipe } from "@/lib/api/recipes";
import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom"
import PagesWrapper from "../components/wrapper";
import { Badge } from "@/components/ui/badge";
import { categoryToUppercase, rateDuration, rateDurationColor } from "../components/recipes/helper";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { customComponents } from "@/utils/customMarkdownComponents";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Loader from "@/components/top-loader";

interface ActionsLoadingType {
    title?: string;
    description?: string;
}

const Recipe = () => {
    const [recipe, setRecipe] = useState<RecipeType>();
    const [durationColor, setDurationColor] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [actionsLoading, setActionsLoading] = useState<ActionsLoadingType|null>(null);
    const [parsedRecipeDescription, setParsedRecipeDescription] = useState("");

    const [uppercaseCategory, setUppercaseCategory] = useState("");
    const { recipeId } = useParams<{ recipeId: string }>();

    const navigate = useNavigate();
    const { toast } = useToast()

    if (!recipeId) return redirect('/recipes');

    useEffect(() => {
        let id: number;
        try {
            id = parseInt(recipeId);
        } catch (error) {
            navigate('/recipes');
            return;
        }
        getRecipe(id).then((recipe) => {
            if (!recipe) redirect('/recipes');
            setRecipe(recipe);
            parseRawRecipe(recipe.content);
            setIsLoading(false);
        }).catch(() => {
            navigate('/recipes');
        });
    }, [])

    useEffect(() => {
        if (recipe) {
            let ratedDuration = rateDuration(recipe.duration_in_minutes);
            let ratedDurationColor = rateDurationColor(ratedDuration);
            setDurationColor(ratedDurationColor);
            setUppercaseCategory(categoryToUppercase(recipe.category));
        }
    }, [recipe])

    const parseRawRecipe = (recipe: string) => {
        console.log("inside parseRawRecipe", recipe)
        let parsedContent = recipe.replace(/^### .+$/m, '');
        setParsedRecipeDescription(parsedContent);
    }

    const handleDeleteRecipe = async () => {
        setActionsLoading({
            title: "Deleting recipe...",
        })
        try {
            if (!recipe) throw new Error("No recipe found");
            const response = await deleteRecipe([recipe]);
            toast({
                title: "Success",
                description: "Recipe deleted",
            })
            navigate("/recipes")
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete recipe",
                variant: "destructive",
            })
        }finally{
            setActionsLoading(null)
        }
    }
    const handleUseRecipe = async () => {
        setActionsLoading({
            title: "Using recipe...",
        })
        try {
            if (!recipe) throw new Error("No recipe found");
            const response = await useRecipe(recipe.content);
            toast({
                title: "Success",
                description: "Recipe used",
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to use recipe",
                variant: "destructive",
            })
        }finally{
            setActionsLoading(null)
        }
    }

    return (
        <PagesWrapper className="h-screen px-0" isLoading={isLoading}>
            {actionsLoading && <Loader title={actionsLoading?.title} description={actionsLoading?.description}/>}
            <div className="container flex flex-col h-full mx-auto space-y-6">
                <div className="flex h-full flex-col justify-start items-start gap-4">
                    <div className="space-y-2 px-16">
                        <h1 className="text-3xl font-bold">{recipe?.title}</h1>
                        <div className="flex space-x-2">
                            <Badge>{uppercaseCategory}</Badge>
                            <Badge className={durationColor}>{recipe?.duration_in_minutes} min</Badge>
                        </div>
                    </div>
                    <div className="flex-1 h-full overflow-auto px-16 pb-16">
                        <ReactMarkdown components={customComponents} remarkPlugins={[remarkGfm]}>{parsedRecipeDescription}</ReactMarkdown>
                    </div>
                    <div className="flex px-16 justify-between w-full py-4">
                        <Button onClick={handleDeleteRecipe} variant="outline">Delete Recipe</Button>
                        <Button onClick={handleUseRecipe} className="bg-blue-600 text-white hover:bg-blue-500 ">Use Recipe</Button>
                    </div>
                </div>
            </div>
        </PagesWrapper>
    )
}

export default Recipe