export enum Duration {
    Short = "Short",
    Medium = "Medium",
    Long = "Long",
}
const rateDuration = (duration:number) => {
    if (duration <= 15) return Duration.Short;
    else if (duration <= 30) return Duration.Medium;
    else return Duration.Long;
};

const rateDurationColor = (duration: Duration) => {
    switch (duration) {
        case Duration.Short:
            return "bg-green-400 text-black";
        case Duration.Medium:
            return "bg-yellow-400 text-black";
        case Duration.Long:
            return "bg-red-400 text-white";
    }
};

const categoryToUppercase = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
};

const createCategoryColorGenerator = () => {
    const hashMap = new Map();
    let categoryCount = 1;
    const colorGenerator = (category:string) => {
        if (hashMap.has(category)) return hashMap.get(category);
        else {
            const hue = (categoryCount * 137.508) % 360; // golden angle
            const saturation = 70;
            const lightness = 60;
            const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
            categoryCount+=2;
            hashMap.set(category, color);
            return color;
        }
    };
    return colorGenerator;
};

export {
    categoryToUppercase,
    createCategoryColorGenerator,
    rateDuration,
    rateDurationColor,
};
