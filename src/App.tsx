import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { INITIAL_RECIPES, USER_AVATAR } from "./recipesData";
import { Recipe, DietaryPreferences, TasteProfile, ActiveTab } from "./types";
import { Home, Search, Compass, Heart, User, Sparkles, Menu } from "lucide-react";
import { isRecipeExcluded } from "./utils/filterUtils";

// Subcomponents
import CuisineSelectScreen from "./components/CuisineSelectScreen";
import HomeScreen from "./components/HomeScreen";
import SearchScreen from "./components/SearchScreen";
import PreferencesScreen from "./components/PreferencesScreen";
import SpinnerScreen from "./components/SpinnerScreen";
import SavedScreen from "./components/SavedScreen";
import RecipeDetailScreen from "./components/RecipeDetailScreen";

export default function App() {
  // 1. Core App State
  const [recipes, setRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem("what_should_i_eat_recipes");
    if (saved) {
      try {
        const parsed: Recipe[] = JSON.parse(saved);
        const merged = [...parsed, ...INITIAL_RECIPES];
        // Deduplicate by ID
        const unique = Array.from(new Map(merged.map((r) => [r.id, r])).values());
        return unique;
      } catch (e) {
        return INITIAL_RECIPES;
      }
    }
    return INITIAL_RECIPES;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    const started = localStorage.getItem("what_should_i_eat_started");
    return started ? "home" : "cuisine-select";
  });

  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [preselectedCuisine, setPreselectedCuisine] = useState<string | null>(null);

  const [preferences, setPreferences] = useState<DietaryPreferences>(() => {
    const saved = localStorage.getItem("what_should_i_eat_prefs");
    return saved
      ? JSON.parse(saved)
      : { exclusions: ["Seafood"], lifestyleDiets: ["Vegetarian"], customExclusions: [] };
  });

  const [tasteProfile, setTasteProfile] = useState<TasteProfile>(() => {
    const saved = localStorage.getItem("what_should_i_eat_taste");
    return saved ? JSON.parse(saved) : { spiciness: 3, sweetness: 2, sourness: 4, saltiness: 3, richness: 2 };
  });

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => !isRecipeExcluded(recipe, preferences));
  }, [recipes, preferences]);

  // History stack for sub-screen back routing
  const [historyStack, setHistoryStack] = useState<ActiveTab[]>([]);

  // 2. Persist states in localStorage
  useEffect(() => {
    localStorage.setItem("what_should_i_eat_recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("what_should_i_eat_prefs", JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem("what_should_i_eat_taste", JSON.stringify(tasteProfile));
  }, [tasteProfile]);

  // 3. Navigation handlers
  const handleSelectRecipe = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
    setHistoryStack((prev) => [...prev, activeTab]);
  };

  const handleToggleFavorite = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, isFavorite: !recipe.isFavorite } : recipe
      )
    );
  };

  const handleStartCooking = (recipeId: string) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId ? { ...recipe, cookedCount: recipe.cookedCount + 1 } : recipe
      )
    );
  };

  const handleSurpriseMe = () => {
    const pool = filteredRecipes.length > 0 ? filteredRecipes : recipes;
    const randomIndex = Math.floor(Math.random() * pool.length);
    handleSelectRecipe(pool[randomIndex].id);
  };

  const handleCuisineSelectContinue = (selectedCuisines: string[]) => {
    localStorage.setItem("what_should_i_eat_started", "true");
    setActiveTab("home");
  };

  const handleBack = () => {
    if (selectedRecipeId) {
      setSelectedRecipeId(null);
    }
    const previous = historyStack[historyStack.length - 1];
    if (previous) {
      setActiveTab(previous);
      setHistoryStack((prev) => prev.slice(0, -1));
    } else {
      setActiveTab("home");
    }
  };

  const handleFindMealFromPalate = () => {
    setActiveTab("search");
  };

  const handleTabClick = (tab: "home" | "search" | "spin" | "saved" | "profile", cuisinePreset?: string | null) => {
    setSelectedRecipeId(null);
    setActiveTab(tab);
    setHistoryStack([]);
    if (cuisinePreset !== undefined) {
      setPreselectedCuisine(cuisinePreset);
    } else if (tab !== "search") {
      setPreselectedCuisine(null);
    }
  };

  // Render current active screen/view
  const renderScreen = () => {
    if (selectedRecipeId) {
      const activeRecipe = recipes.find((r) => r.id === selectedRecipeId);
      if (activeRecipe) {
        return (
          <RecipeDetailScreen
            recipe={activeRecipe}
            onBack={handleBack}
            onToggleFavorite={handleToggleFavorite}
            onStartCooking={handleStartCooking}
          />
        );
      }
    }

    switch (activeTab) {
      case "cuisine-select":
        return <CuisineSelectScreen onContinue={handleCuisineSelectContinue} />;
      case "home":
        return (
          <HomeScreen
            recipes={filteredRecipes}
            onSelectRecipe={handleSelectRecipe}
            onToggleFavorite={handleToggleFavorite}
            onNavigateToTab={handleTabClick}
            onSurpriseMe={handleSurpriseMe}
          />
        );
      case "search":
        return (
          <SearchScreen
            recipes={filteredRecipes}
            onSelectRecipe={handleSelectRecipe}
            onToggleFavorite={handleToggleFavorite}
            preselectedCuisine={preselectedCuisine}
            onClearPreselectedCuisine={() => setPreselectedCuisine(null)}
          />
        );
      case "spin":
        return <SpinnerScreen recipes={filteredRecipes} onSelectRecipe={handleSelectRecipe} />;
      case "saved":
        return (
          <SavedScreen
            recipes={filteredRecipes}
            onSelectRecipe={handleSelectRecipe}
            onToggleFavorite={handleToggleFavorite}
            onCookAgain={handleStartCooking}
            onNavigateToTab={handleTabClick}
          />
        );
      case "profile":
        return (
          <PreferencesScreen
            preferences={preferences}
            tasteProfile={tasteProfile}
            onChangePreferences={setPreferences}
            onChangeTasteProfile={setTasteProfile}
            onFindMeal={handleFindMealFromPalate}
          />
        );
      default:
        return <CuisineSelectScreen onContinue={handleCuisineSelectContinue} />;
    }
  };

  // Check if detail/landing screens require hiding the general outer header shell or tabs
  const isCuisineSelect = activeTab === "cuisine-select";
  const isDetailScreen = selectedRecipeId !== null;

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container text-on-surface">
      {/* Dynamic Shell Header */}
      {!isCuisineSelect && !isDetailScreen && (
        <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md w-full border-b border-surface-container-high">
          <div className="flex justify-between items-center px-5 h-16 w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95 duration-200 cursor-pointer">
                <Menu className="w-5 h-5 text-primary" />
              </button>
              <h1 className="font-headline font-bold text-lg md:text-xl text-primary tracking-tight">
                What Should I Eat?
              </h1>
            </div>
            <div
              onClick={() => handleTabClick("profile")}
              className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border-2 border-primary-container cursor-pointer active:scale-95 transition-transform"
            >
              <img
                className="w-full h-full object-cover"
                src={USER_AVATAR}
                alt="Profile Avatar"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                }}
              />
            </div>
          </div>
        </header>
      )}

      {/* Main Content Layout */}
      <main
        className={`flex-grow max-w-4xl mx-auto w-full px-5 ${
          isCuisineSelect ? "pt-8 pb-32" : isDetailScreen ? "pt-24 pb-32" : "pt-6 pb-32"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRecipeId || activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Universal Bottom Navigation */}
      {!isCuisineSelect && (
        <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-container shadow-[0_-4px_20px_rgba(244,162,97,0.08)] rounded-t-lg border-t border-surface-container-high">
          <div className="flex justify-around items-center px-4 pb-4 pt-2 max-w-md mx-auto">
            {/* Home */}
            <button
              onClick={() => handleTabClick("home")}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                activeTab === "home" && !isDetailScreen
                  ? "bg-secondary-container text-on-secondary-container scale-105"
                  : "text-on-surface-variant hover:opacity-85"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="font-label text-[10px] font-bold mt-0.5">Home</span>
            </button>

            {/* Search */}
            <button
              onClick={() => handleTabClick("search")}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                activeTab === "search" && !isDetailScreen
                  ? "bg-secondary-container text-on-secondary-container scale-105"
                  : "text-on-surface-variant hover:opacity-85"
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="font-label text-[10px] font-bold mt-0.5">Search</span>
            </button>

            {/* Spin */}
            <button
              onClick={() => handleTabClick("spin")}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                activeTab === "spin" && !isDetailScreen
                  ? "bg-secondary-container text-on-secondary-container scale-105"
                  : "text-on-surface-variant hover:opacity-85"
              }`}
            >
              <Compass className="w-5 h-5 animate-spin-slow" />
              <span className="font-label text-[10px] font-bold mt-0.5">Spin</span>
            </button>

            {/* Saved */}
            <button
              onClick={() => handleTabClick("saved")}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                activeTab === "saved" && !isDetailScreen
                  ? "bg-secondary-container text-on-secondary-container scale-105"
                  : "text-on-surface-variant hover:opacity-85"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${
                  activeTab === "saved" && !isDetailScreen ? "fill-on-secondary-container" : ""
                }`}
              />
              <span className="font-label text-[10px] font-bold mt-0.5">Saved</span>
            </button>

            {/* Profile */}
            <button
              onClick={() => handleTabClick("profile")}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                activeTab === "profile" && !isDetailScreen
                  ? "bg-secondary-container text-on-secondary-container scale-105"
                  : "text-on-surface-variant hover:opacity-85"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="font-label text-[10px] font-bold mt-0.5">Profile</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
