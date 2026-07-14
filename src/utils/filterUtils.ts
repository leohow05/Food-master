import { Recipe, DietaryPreferences } from "../types";

export function isRecipeExcluded(recipe: Recipe, preferences: DietaryPreferences): boolean {
  if (!preferences) return false;

  const titleLower = recipe.title.toLowerCase();
  const descLower = (recipe.description || "").toLowerCase();
  const tagsLower = recipe.dietaryTags.map((t) => t.toLowerCase());

  // Helper to check if any ingredient contains a list of keywords
  const hasIngredientMatch = (keywords: string[]) => {
    return [...recipe.youHave, ...recipe.youNeed].some((ing) => {
      const nameLower = ing.name.toLowerCase();
      return keywords.some((kw) => nameLower.includes(kw));
    });
  };

  // 1. Check exclusions list
  for (const exclusion of preferences.exclusions) {
    const excLower = exclusion.toLowerCase();

    if (excLower === "seafood") {
      const seafoodKeywords = ["shrimp", "prawn", "crab", "lobster", "squid", "octopus", "fish", "scallop", "mussel", "clam", "oyster", "anchovy", "seafood", "salmon", "tuna", "cod", "halibut", "snapper"];
      if (tagsLower.includes("seafood") || seafoodKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(seafoodKeywords)) {
        return true;
      }
    }

    if (excLower === "nuts") {
      const nutKeywords = ["nut", "peanut", "almond", "cashew", "walnut", "pecan", "hazelnut", "pistachio", "macadamia"];
      if (tagsLower.includes("nuts") || nutKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(nutKeywords)) {
        return true;
      }
    }

    if (excLower === "dairy") {
      const dairyKeywords = ["milk", "cheese", "feta", "butter", "cream", "yogurt", "parmesan", "mozzarella", "ricotta", "paneer", "ghee", "whey"];
      if (tagsLower.includes("dairy") || dairyKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(dairyKeywords)) {
        return true;
      }
    }

    if (excLower === "pork") {
      const porkKeywords = ["pork", "bacon", "ham", "lard", "pancetta", "prosciutto", "sausage"];
      if (tagsLower.includes("pork") || porkKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(porkKeywords)) {
        return true;
      }
    }

    if (excLower === "beef") {
      const beefKeywords = ["beef", "steak", "sirloin", "ribeye", "veal"];
      if (tagsLower.includes("beef") || beefKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(beefKeywords)) {
        return true;
      }
    }

    if (excLower === "spicy") {
      const spicyKeywords = ["chili", "chilli", "cayenne", "jalapeño", "habanero", "sriracha", "gochujang", "wasabi", "sambal", "gochugaru"];
      const hasSpicyTag = tagsLower.some(t => t.includes("spicy"));
      const hasSpicyDesc = descLower.includes("spicy") || descLower.includes("fiery") || descLower.includes("hot and spicy") || descLower.includes("chili");
      if (hasSpicyTag || hasSpicyDesc || spicyKeywords.some(kw => titleLower.includes(kw)) || hasIngredientMatch(spicyKeywords)) {
        return true;
      }
    }

    if (excLower === "cilantro") {
      const cilantroKeywords = ["cilantro", "coriander"];
      if (tagsLower.includes("cilantro") || cilantroKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(cilantroKeywords)) {
        return true;
      }
    }

    if (excLower === "mushrooms") {
      const mushroomKeywords = ["mushroom", "shiitake", "button mushroom", "portobello", "fungus"];
      if (tagsLower.includes("mushrooms") || mushroomKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(mushroomKeywords)) {
        return true;
      }
    }
  }

  // 2. Check Custom Exclusions
  if (preferences.customExclusions && preferences.customExclusions.length > 0) {
    for (const customExclusion of preferences.customExclusions) {
      if (!customExclusion.trim()) continue;
      const customLower = customExclusion.toLowerCase();
      if (
        titleLower.includes(customLower) ||
        descLower.includes(customLower) ||
        tagsLower.includes(customLower) ||
        [...recipe.youHave, ...recipe.youNeed].some((ing) => ing.name.toLowerCase().includes(customLower))
      ) {
        return true;
      }
    }
  }

  // 3. Check Lifestyle Diets
  for (const diet of preferences.lifestyleDiets) {
    const dietLower = diet.toLowerCase();

    if (dietLower === "vegetarian") {
      const meatKeywords = ["chicken", "beef", "pork", "bacon", "ham", "fish", "shrimp", "prawn", "crab", "seafood", "duck", "lamb", "turkey", "meat", "salmon", "tuna", "anchovy", "mutton", "ribs", "sirloin", "steak", "pancetta", "prosciutto", "pepperoni", "gelatin"];
      const isTaggedVeg = tagsLower.includes("vegetarian") || tagsLower.includes("vegan");
      const hasMeat = meatKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(meatKeywords);
      
      if (hasMeat || (!isTaggedVeg && !descLower.includes("vegetarian") && !descLower.includes("plant-based"))) {
        return true;
      }
    }

    if (dietLower === "vegan") {
      const animalProductKeywords = ["chicken", "beef", "pork", "bacon", "ham", "fish", "shrimp", "prawn", "crab", "seafood", "duck", "lamb", "turkey", "meat", "salmon", "tuna", "anchovy", "mutton", "ribs", "sirloin", "steak", "pancetta", "prosciutto", "pepperoni", "gelatin", "egg", "milk", "cheese", "feta", "butter", "cream", "yogurt", "parmesan", "mozzarella", "ricotta", "paneer", "honey", "whey", "mayo", "mayonnaise"];
      const isTaggedVegan = tagsLower.includes("vegan") || tagsLower.includes("vegan opt.");
      const hasAnimalProducts = animalProductKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(animalProductKeywords);
      
      if (hasAnimalProducts || (!isTaggedVegan && !descLower.includes("vegan") && !descLower.includes("plant-based"))) {
        return true;
      }
    }

    if (dietLower === "halal") {
      const nonHalalKeywords = ["pork", "bacon", "ham", "lard", "pancetta", "prosciutto", "sausage", "pepperoni", "wine", "beer", "rum", "mirin", "sake", "alcohol"];
      if (nonHalalKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(nonHalalKeywords)) {
        return true;
      }
    }

    if (dietLower === "gluten-free") {
      const isTaggedGF = tagsLower.includes("gluten-free") || tagsLower.includes("gluten free");
      const glutenKeywords = ["wheat", "flour", "bread", "pasta", "bun", "noodle", "ramen", "semolina", "barley", "rye", "wrap", "flatbread", "breadcrumbs", "puff pastry", "tortilla"];
      if (!isTaggedGF) {
        if (glutenKeywords.some(kw => titleLower.includes(kw)) || hasIngredientMatch(glutenKeywords)) {
          return true;
        }
      }
    }

    if (dietLower === "lactose-free") {
      const dairyKeywords = ["milk", "cheese", "feta", "butter", "cream", "yogurt", "parmesan", "mozzarella", "ricotta", "paneer", "whey"];
      if (tagsLower.includes("dairy") || dairyKeywords.some(kw => titleLower.includes(kw) || descLower.includes(kw)) || hasIngredientMatch(dairyKeywords)) {
        return true;
      }
    }
  }

  return false;
}
