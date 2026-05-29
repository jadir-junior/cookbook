export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  image: string;
}

export interface RecipeDetails {
  id: number;
  prepTime: number;
  cuisine: string;
  diet: string;
  url: string;
  nutrition: Nutrition;
}

export interface Nutrition {
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}

export interface ImageUrl {
  id: number;
  url: string;
}
