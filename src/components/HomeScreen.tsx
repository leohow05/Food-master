import { Recipe } from "../types";
import { FIND_RECIPE_BENTO_IMAGE, SPIN_MEAL_BENTO_IMAGE } from "../recipesData";
import { Heart, Star, Sparkles, ChevronRight, ChefHat, Dices, Utensils, Soup, Flame, Leaf } from "lucide-react";

interface HomeScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipeId: string) => void;
  onToggleFavorite: (recipeId: string) => void;
  onNavigateToTab: (tab: "search" | "spin" | "saved" | "profile", cuisine?: string) => void;
  onSurpriseMe: () => void;
}

export default function HomeScreen({
  recipes,
  onSelectRecipe,
  onToggleFavorite,
  onNavigateToTab,
  onSurpriseMe,
}: HomeScreenProps) {
  // Let's filter some representative recently viewed recipes
  const recentlyViewedIds = ["avocado-heaven", "classic-carbonara", "rainbow-quinoa", "the-gourmet-smash"];
  const recentlyViewed = recipes.filter((r) => recentlyViewedIds.includes(r.id));

  const quickCuisines = [
    { name: "Italian", icon: Utensils },
    { name: "Asian", icon: Soup },
    { name: "Mexican", icon: Flame },
    { name: "Healthy", icon: Leaf }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Welcome */}
      <section>
        <h2 className="font-headline text-3xl font-bold text-on-surface">Hello, Foodie!</h2>
        <p className="text-on-surface-variant font-medium text-sm md:text-base mt-1">
          Your next favorite meal is just a tap away.
        </p>
      </section>

      {/* High-Impact Action Cards (Bento Style) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Find a Recipe Card */}
        <button
          onClick={() => onNavigateToTab("search")}
          className="relative h-60 overflow-hidden rounded-lg shadow-[0_4px_20px_rgba(244,162,97,0.08)] group transition-all duration-300 text-left cursor-pointer active:scale-[0.98]"
        >
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110 bg-cover bg-center"
            style={{ backgroundImage: `url('${FIND_RECIPE_BENTO_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end z-20">
            <div>
              <h3 className="font-headline text-xl font-bold text-white">Find a Recipe</h3>
              <p className="font-sans text-sm text-white/90">Browse curated favorites</p>
            </div>
            <div className="bg-primary p-3 rounded-full text-white shadow-lg">
              <ChefHat className="w-6 h-6 block" />
            </div>
          </div>
        </button>

        {/* Spin for a Meal Card */}
        <button
          onClick={() => onNavigateToTab("spin")}
          className="relative h-60 overflow-hidden rounded-lg shadow-[0_4px_20px_rgba(244,162,97,0.08)] group transition-all duration-300 text-left cursor-pointer active:scale-[0.98]"
        >
          <div
            className="absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-110 bg-cover bg-center"
            style={{ backgroundImage: `url('${SPIN_MEAL_BENTO_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end z-20">
            <div>
              <h3 className="font-headline text-xl font-bold text-white">Spin for a Meal</h3>
              <p className="font-sans text-sm text-white/90">Let fate decide dinner</p>
            </div>
            <div className="bg-secondary-container p-3 rounded-full text-on-secondary-container shadow-lg">
              <Dices className="w-6 h-6 block" />
            </div>
          </div>
        </button>
      </section>

      {/* Recently Viewed Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="font-headline text-xl font-bold text-on-surface">Recently Viewed</h2>
          <button
            onClick={() => onNavigateToTab("saved")}
            className="font-label text-xs md:text-sm text-primary hover:underline font-bold flex items-center gap-0.5"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex overflow-x-auto no-scrollbar -mx-5 px-5 gap-4 pb-2">
          {recentlyViewed.map((recipe) => (
            <div
              key={recipe.id}
              className="flex-shrink-0 w-44 space-y-2 group cursor-pointer active:scale-[0.97] transition-all duration-200"
            >
              <div className="h-44 rounded-lg overflow-hidden relative">
                <img
                  onClick={() => onSelectRecipe(recipe.id)}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80";
                  }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(recipe.id);
                  }}
                  className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm hover:bg-white active:scale-90 transition-transform cursor-pointer text-primary"
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      recipe.isFavorite ? "fill-primary" : ""
                    }`}
                  />
                </button>
              </div>
              <div onClick={() => onSelectRecipe(recipe.id)}>
                <p className="font-label text-sm text-on-surface font-semibold line-clamp-1">
                  {recipe.title}
                </p>
                <p className="font-sans text-xs text-on-surface-variant flex items-center gap-1">
                  <span>{recipe.prepTime} min</span>
                  <span>•</span>
                  <span>{recipe.difficulty}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Category Grid Quick Links */}
      <section className="space-y-3 pb-12">
        <h2 className="font-headline text-xl font-bold text-on-surface">Cuisines</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {quickCuisines.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.name}
                onClick={() => onNavigateToTab("search", item.name)}
                className="bg-surface-container-low hover:bg-surface-container-high p-4 rounded-lg flex items-center gap-3 transition-all cursor-pointer active:scale-95 duration-200 shadow-sm"
              >
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <IconComponent className="w-5 h-5 block" />
                </div>
                <span className="font-label font-bold text-sm text-on-surface">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Surprise Me FAB */}
      <button
        onClick={onSurpriseMe}
        className="fixed bottom-24 right-6 bg-primary-container hover:brightness-105 text-on-primary-container px-6 py-4 rounded-full shadow-lg flex items-center gap-2 active:scale-95 transition-transform duration-200 cursor-pointer z-40 group"
      >
        <Sparkles className="w-5 h-5 group-hover:animate-bounce" />
        <span className="font-label text-sm font-bold">Surprise Me</span>
      </button>
    </div>
  );
}
