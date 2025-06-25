import { useEffect, useState } from "react";
import PagesWrapper from "../components/wrapper"
import { getRecipes, RecipeType } from "@/lib/api/recipes";
import RecipePreview from "../components/recipes/recipe-preview";
import { Skeleton } from "@/components/ui/skeleton";
import { createCategoryColorGenerator } from "../components/recipes/helper";
import FilterCard from "../components/recipes/filter";
import EmptyState from "../components/recipes/empty-state";

const Recipes = () => {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getRecipes().then((recipes) => {
      setRecipes(recipes);
      setFilteredRecipes(recipes);
      setIsLoading(false);
    });
  }, [])

  const colorGenerator = createCategoryColorGenerator();

  return (
    <PagesWrapper className="h-screen">
      <div className="container flex flex-col h-full mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Recipes</h1>
            <p className="text-muted-foreground">Manage your Recipes</p>
          </div>
        </div>
        <FilterCard items={recipes} setFilteredItems={setFilteredRecipes} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-auto ">
          {isLoading == true ? (
            <>
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-full h-32" />
              <Skeleton className="w-full h-32" />
            </>
          ) : filteredRecipes.map((recipe: RecipeType) => (
            <RecipePreview key={recipe.id} recipe={recipe} colorGenerator={colorGenerator} />
          ))}
          <EmptyState filteredItems={filteredRecipes} items={recipes} />


        </div>
      </div>
    </PagesWrapper>
  )
}

export default Recipes