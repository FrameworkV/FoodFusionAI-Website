import { Badge } from '@/components/ui/badge';
import { RecipeType } from '@/lib/api/recipes';
import { categoryToUppercase, rateDuration, rateDurationColor } from './helper';

const RecipePreview = ({recipe, colorGenerator}:{recipe:RecipeType, colorGenerator: (category:string) => string}) => {
  const {id, title, category, duration_in_minutes, short_description, content} = recipe;
  const uppercaseCategory = categoryToUppercase(category);
  const ratedDuration = rateDuration(duration_in_minutes);
  const ratedDurationColor = rateDurationColor(ratedDuration);
  const categoryColor = colorGenerator(category);
  return (
    <div key={id} className="border rounded-lg shadow-md p-4 space-y-2">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="space-x-2">
        <Badge style={{backgroundColor: categoryColor}}>{uppercaseCategory}</Badge>
        <Badge variant="outline" className={`${ratedDurationColor}`}>{duration_in_minutes} min</Badge>
      </div>
      <p className="text-muted-foreground mb-4">{short_description}</p>
    </div>
  )
}

export default RecipePreview