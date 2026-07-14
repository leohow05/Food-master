export interface RecipeIngredient {
  name: string;
  amount: string;
}

export interface PreviewStep {
  number: number;
  title: string;
  description: string;
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  cuisine: string;
  dietaryTags: string[];
  prepTime: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  region?: string;
  recommendationReason?: string;
  matchPercentage?: number;
  youHave: RecipeIngredient[];
  youNeed: RecipeIngredient[];
  previewSteps: PreviewStep[];
  servings: number;
  rating: number;
  cookedCount: number;
  isFavorite: boolean;
}

export interface DietaryPreferences {
  exclusions: string[]; // Seafood, Nuts, Dairy, Pork, Beef, Spicy, Cilantro, Mushrooms
  lifestyleDiets: string[]; // Vegetarian, Vegan, Halal, Gluten-free, Lactose-free
  customExclusions: string[];
}

export interface TasteProfile {
  spiciness: number; // 1 to 5
  sweetness: number; // 1 to 5
  sourness: number; // 1 to 5
  saltiness: number; // 1 to 5
  richness: number; // 1 to 5
}

export type ActiveTab = "home" | "search" | "spin" | "saved" | "profile" | "cuisine-select" | "taste-preferences" | "picks-for-you" | "recipe-detail";
