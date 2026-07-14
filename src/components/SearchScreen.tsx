import { useState, useMemo, useEffect } from "react";
import { Recipe } from "../types";
import { TOMATO_PROMO_IMAGE } from "../recipesData";
import { Plus, X, CheckCircle, ShoppingCart, Clock, Heart, Sparkles, Refrigerator, ShoppingBag, ChefHat, MapPin, Globe, Trash2, Search } from "lucide-react";

interface SearchScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipeId: string) => void;
  onToggleFavorite: (recipeId: string) => void;
  preselectedCuisine?: string | null;
  onClearPreselectedCuisine?: () => void;
}

export default function SearchScreen({
  recipes,
  onSelectRecipe,
  onToggleFavorite,
  preselectedCuisine,
  onClearPreselectedCuisine,
}: SearchScreenProps) {
  // Empty by default so that navigating away and coming back yields a fresh, blank search experience
  const [basket, setBasket] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(preselectedCuisine || null);
  const [regionSearch, setRegionSearch] = useState(preselectedCuisine || "");

  useEffect(() => {
    if (preselectedCuisine) {
      setSelectedRegion(preselectedCuisine);
      setRegionSearch(preselectedCuisine);
    }
  }, [preselectedCuisine]);

  const commonIngredients = ["chicken", "eggs", "tomatoes", "rice", "noodles", "garlic", "onion"];

  const popularRegions = [
    "Singapore",
    "Szechuan",
    "Oaxaca",
    "Jeonju",
    "Kyoto",
    "Isan",
    "Provence",
    "Tuscany",
    "Yucatán",
    "Kanto (Tokyo)",
    "Amalfi Coast",
    "California",
    "Lazio (Rome)",
    "Andes",
    "Jeju Island",
    "Kansai (Osaka)",
    "Mexico City",
    "Hunan",
    "Valencia",
    "Punjab",
    "Hokkaido",
    "Jalisco",
    "Shaanxi",
    "Hiroshima"
  ];

  const filteredRegions = useMemo(() => {
    if (!regionSearch.trim()) return popularRegions;
    return popularRegions.filter((reg) =>
      reg.toLowerCase().includes(regionSearch.toLowerCase())
    );
  }, [regionSearch]);

  const handleAddIngredient = (item: string) => {
    const trimmed = item.trim();
    if (!trimmed) return;
    const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    if (!basket.includes(capitalized)) {
      setBasket((prev) => [...prev, capitalized]);
    }
    setInputVal("");
  };

  const handleRemoveIngredient = (item: string) => {
    setBasket((prev) => prev.filter((i) => i !== item));
  };

  const handleClearAll = () => {
    setBasket([]);
    setInputVal("");
    setSelectedRegion(null);
    setRegionSearch("");
    if (onClearPreselectedCuisine) {
      onClearPreselectedCuisine();
    }
  };

  // Safe reset when component unmounts to guarantee it is blank next time they return
  useEffect(() => {
    return () => {
      setBasket([]);
      setInputVal("");
      setSelectedRegion(null);
      setRegionSearch("");
      if (onClearPreselectedCuisine) {
        onClearPreselectedCuisine();
      }
    };
  }, []);

  // Dynamic Matching & Specific Regional Filtering Logic!
  const recommendedRecipes = useMemo(() => {
    let filtered = recipes;

    // Specific region filter
    if (selectedRegion) {
      const query = selectedRegion.toLowerCase();
      filtered = recipes.filter((r) => {
        const regionMatch = (r.region || "").toLowerCase().includes(query);
        const cuisineMatch = (r.cuisine || "").toLowerCase().includes(query);
        const tagsMatch = r.dietaryTags.some((tag) => (tag || "").toLowerCase().includes(query));

        // Special mapping for Asian
        const isAsianQuery = query === "asian";
        const isAsianCuisine = ["asian", "chinese", "japanese", "korean", "thai", "singapore", "singaporean"].includes((r.cuisine || "").toLowerCase());
        const asianMatch = isAsianQuery && (isAsianCuisine || r.dietaryTags.some(tag => ["asian", "chinese", "japanese", "korean", "thai", "singapore", "singaporean"].includes(tag.toLowerCase())));

        // Special mapping for Healthy
        const isHealthyQuery = query === "healthy";
        const isHealthyCuisine = r.dietaryTags.some(tag => ["vegetarian", "vegan", "vegan opt.", "gluten-free", "keto"].includes(tag.toLowerCase())) || (r.description || "").toLowerCase().includes("healthy");
        const healthyMatch = isHealthyQuery && isHealthyCuisine;

        return regionMatch || cuisineMatch || tagsMatch || asianMatch || healthyMatch;
      });
    }

    if (basket.length === 0) {
      // Return recipes matching region, or a curated subset if no region/basket is present
      return filtered.map((recipe) => ({
        ...recipe,
        matchPercentage: undefined,
      }));
    }

    const basketLower = basket.map((b) => b.toLowerCase());

    return filtered
      .map((recipe) => {
        // Calculate matches
        const allIngredients = [
          ...recipe.youHave.map((i) => i.name.toLowerCase()),
          ...recipe.youNeed.map((i) => i.name.toLowerCase()),
        ];

        const matchedCount = allIngredients.filter((ing) =>
          basketLower.some((b) => ing.includes(b) || b.includes(ing))
        ).length;

        // Base score
        let matchScore = 0;
        if (allIngredients.length > 0) {
          matchScore = Math.round((matchedCount / allIngredients.length) * 100);
        }

        // Boost score slightly if direct matching is found
        if (recipe.title.toLowerCase().includes("chicken") && basketLower.includes("chicken")) {
          matchScore = Math.max(matchScore, 85);
        }
        if (recipe.title.toLowerCase().includes("onion") && basketLower.includes("onion")) {
          matchScore = Math.max(matchScore, 80);
        }

        return {
          ...recipe,
          matchPercentage: matchScore,
          matchedCount,
        };
      })
      .filter((recipe) => recipe.matchedCount > 0) // Strictly deletes/filters out the recipes that do not have the selected foods/ingredients!
      .sort((a, b) => b.matchPercentage! - a.matchPercentage!);
  }, [recipes, basket, selectedRegion]);

  const hasTomatoes = useMemo(() => {
    return basket.some((b) => b.toLowerCase() === "tomatoes");
  }, [basket]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Search Hero Section */}
      <section className="space-y-4">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">
          What's in your fridge?
        </h2>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Refrigerator className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddIngredient(inputVal);
              }}
              className="w-full h-14 pl-12 pr-4 rounded-lg bg-surface-container-low border-none focus:ring-2 focus:ring-primary-container text-base placeholder:text-on-surface-variant/50 shadow-sm transition-all outline-none"
              placeholder="Type an ingredient (e.g. Chicken, Tofu, Eggs)..."
            />
          </div>
          <button
            onClick={() => handleAddIngredient(inputVal)}
            className="bg-primary-container hover:brightness-105 active:scale-95 transition-all text-on-primary-container h-14 px-6 rounded-lg font-label font-bold flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            <span>Add</span>
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="font-label text-xs text-on-surface-variant font-bold w-full mb-1">
            Common ingredients
          </span>
          {commonIngredients.map((item) => (
            <button
              key={item}
              onClick={() => handleAddIngredient(item)}
              className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-primary-container hover:text-on-primary-container transition-colors font-label text-xs font-semibold cursor-pointer active:scale-95"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Current Basket of Ingredients */}
      <section className="bg-primary-container/10 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center gap-4 border border-primary-container/20">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container shadow-sm">
            <ShoppingBag className="w-5 h-5 block" />
          </div>
          <div>
            <p className="font-label text-xs font-bold text-on-surface">Pantry Basket</p>
            <p className="text-on-surface-variant font-label text-[10px]">
              {basket.length === 0 ? "Basket is empty" : `${basket.length} selected`}
            </p>
          </div>
        </div>

        <div className="flex gap-2 flex-grow overflow-x-auto no-scrollbar py-1">
          {basket.length === 0 ? (
            <span className="text-xs text-on-surface-variant/50 italic self-center pl-2">
              Add ingredients above to find recipes...
            </span>
          ) : (
            basket.map((item) => (
              <div
                key={item}
                className="bg-surface rounded-full px-3 py-1.5 flex items-center gap-2 border border-primary-container/30 flex-shrink-0 shadow-sm"
              >
                <span className="font-label text-xs font-bold text-on-surface">{item}</span>
                <button
                  onClick={() => handleRemoveIngredient(item)}
                  className="text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {(basket.length > 0 || selectedRegion !== null) && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-primary hover:text-error transition-colors cursor-pointer self-end sm:self-auto border border-dashed border-primary/20 hover:border-error/30 rounded-md bg-surface"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </section>

      {/* SPECIFIC REGIONAL FILTER GROUP */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="font-headline text-sm font-bold text-on-surface">Explore Specific Regions</h3>
          </div>
          {/* Typing Search Input for Region */}
          <div className="relative w-full sm:max-w-xs">
            <input
              type="text"
              placeholder="Search or type region..."
              value={regionSearch}
              onChange={(e) => {
                const val = e.target.value;
                setRegionSearch(val);
                if (!val.trim()) {
                  setSelectedRegion(null);
                } else {
                  // If there is an exact match with popular regions, use that, otherwise use typed query
                  const exactMatch = popularRegions.find(
                    (reg) => reg.toLowerCase() === val.toLowerCase()
                  );
                  setSelectedRegion(exactMatch || val);
                }
              }}
              className="w-full pl-8 pr-8 py-1.5 text-xs rounded-lg border border-outline bg-surface-container text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-sans"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant/70" />
            {regionSearch && (
              <button
                onClick={() => {
                  setRegionSearch("");
                  setSelectedRegion(null);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant/70 hover:text-error transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar -mx-5 px-5">
          <button
            onClick={() => {
              setSelectedRegion(null);
              setRegionSearch("");
            }}
            className={`px-4 py-2 rounded-full font-label text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
              selectedRegion === null
                ? "bg-primary text-white border-primary"
                : "bg-surface-container text-on-surface border-surface-container-high hover:bg-surface-container-high"
            }`}
          >
            All Regions
          </button>
          {filteredRegions.map((reg) => {
            const isSelected = selectedRegion?.toLowerCase() === reg.toLowerCase();
            return (
              <button
                key={reg}
                onClick={() => {
                  setSelectedRegion(reg);
                  setRegionSearch(reg);
                }}
                className={`px-4 py-2 rounded-full font-label text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface-container text-on-surface border-surface-container-high hover:bg-surface-container-high"
                }`}
              >
                <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-primary/75"}`} />
                <span>{reg}</span>
              </button>
            );
          })}
          {regionSearch && !filteredRegions.some(reg => reg.toLowerCase() === regionSearch.toLowerCase()) && (
            <button
              onClick={() => {
                setSelectedRegion(regionSearch);
              }}
              className="px-4 py-2 rounded-full font-label text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 border bg-primary text-white border-primary shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-white" />
              <span>Custom: "{regionSearch}"</span>
            </button>
          )}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div className="space-y-1">
            <h2 className="font-headline text-xl font-bold text-on-surface">
              {selectedRegion ? `Regional Specials: ${selectedRegion}` : "Recommended for you"}
            </h2>
            <p className="text-xs text-on-surface-variant font-medium">
              {selectedRegion
                ? `Showing authentic recipes originating specifically from ${selectedRegion}`
                : "Matched using your active fridge ingredients"}
            </p>
          </div>
          <span className="text-primary font-label text-xs font-bold hover:underline cursor-pointer">
            {recommendedRecipes.length} Results
          </span>
        </div>

        {/* Recipe Grid */}
        {recommendedRecipes.length === 0 ? (
          <div className="bg-surface-container-low p-8 rounded-lg border border-dashed border-surface-container-high text-center space-y-2">
            <p className="text-sm font-bold text-on-surface">No regional matches found</p>
            <p className="text-xs text-on-surface-variant">Try selecting another region or clear filters.</p>
            <button
              onClick={() => setSelectedRegion(null)}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full cursor-pointer"
            >
              Show All Regions
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedRecipes.map((recipe) => {
              // Calculate dynamic checklist matching
              const basketLower = basket.map((b) => b.toLowerCase());
              
              const matchedIngredients = recipe.youHave
                .filter((ing) =>
                  basketLower.some((b) => ing.name.toLowerCase().includes(b) || b.includes(ing.name.toLowerCase()))
                )
                .map((ing) => ing.name);

              const missingIngredients = recipe.youNeed
                .filter((ing) =>
                  !basketLower.some((b) => ing.name.toLowerCase().includes(b) || b.includes(ing.name.toLowerCase()))
                )
                .map((ing) => ing.name);

              const hasListLabel = matchedIngredients.length > 0 
                ? matchedIngredients.slice(0, 2).join(", ") 
                : recipe.youHave.slice(0, 2).map(i => i.name).join(", ");

              const needListLabel = missingIngredients.length > 0 
                ? missingIngredients.slice(0, 2).join(", ") 
                : recipe.youNeed.slice(0, 2).map(i => i.name).join(", ");

              return (
                <div
                  key={recipe.id}
                  onClick={() => onSelectRecipe(recipe.id)}
                  className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(244,162,97,0.08)] group hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-surface-container-low flex flex-col h-full"
                >
                  <div className="relative h-48 w-full overflow-hidden flex-shrink-0">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
                      className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full p-2 text-primary shadow-sm hover:bg-white active:scale-90 transition-transform cursor-pointer z-10"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          recipe.isFavorite ? "fill-primary" : ""
                        }`}
                      />
                    </button>
                    {recipe.matchPercentage !== undefined && recipe.matchPercentage > 0 && (
                      <div className="absolute top-3 left-3 bg-primary-container text-on-primary-container px-2.5 py-1 rounded-full text-xs font-bold shadow-md z-10">
                        Match: {recipe.matchPercentage}%
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-white z-10">
                      <Clock className="w-4 h-4" />
                      <span className="font-label text-xs font-bold">{recipe.prepTime} min</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-primary text-xs font-bold">
                        <span>{recipe.cuisine}</span>
                        {recipe.region && (
                          <>
                            <span className="text-on-surface-variant/30">•</span>
                            <span className="flex items-center gap-0.5 text-on-surface-variant bg-surface-container px-2 py-0.5 rounded text-[10px]">
                              <MapPin className="w-3 h-3 text-primary" />
                              {recipe.region}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-headline font-bold text-on-surface text-base group-hover:text-primary transition-colors line-clamp-1">
                        {recipe.title}
                      </h3>
                      <p className="text-on-surface-variant text-xs line-clamp-2">
                        {recipe.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      <div className="flex items-center gap-1 bg-tertiary-container/10 text-on-tertiary-container px-2 py-0.5 rounded-full border border-tertiary-container/20 text-[10px]">
                        <CheckCircle className="w-3 h-3 text-tertiary" />
                        <span className="font-label font-bold truncate max-w-[140px]">
                          Have: {hasListLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded-full text-[10px]">
                        <ShoppingCart className="w-3 h-3" />
                        <span className="font-label font-bold truncate max-w-[140px]">
                          Need: {needListLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Dynamic Recommendation Banner */}
      {!hasTomatoes && (
        <section className="bg-secondary text-on-secondary p-6 rounded-lg flex flex-col md:flex-row items-center gap-6 overflow-hidden relative shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
          <div className="flex-1 space-y-4 relative z-10 text-left">
            <h2 className="font-headline text-2xl font-bold leading-tight">Missing something?</h2>
            <p className="font-sans text-sm md:text-base opacity-95">
              We found <span className="font-bold underline text-white">12 more recipes</span> if
              you add <span className="font-bold underline text-white">Tomatoes</span> to your
              fridge!
            </p>
            <button
              onClick={() => handleAddIngredient("tomatoes")}
              className="bg-surface text-secondary px-8 py-3 rounded-full font-label text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer border border-transparent"
            >
              Add Tomatoes
            </button>
          </div>
          <div className="w-full md:w-1/3 aspect-video md:aspect-square relative z-10 overflow-hidden rounded-lg shadow-xl animate-pulse">
            <img
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              src={TOMATO_PROMO_IMAGE}
              alt="Glistening tomatoes"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80";
              }}
            />
          </div>
        </section>
      )}

      {/* Primary FAB */}
      <button className="fixed right-6 bottom-24 w-16 h-16 bg-primary-container text-on-primary-container rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform duration-200 hover:rotate-12 group cursor-pointer z-40">
        <ChefHat className="w-7 h-7 group-hover:scale-110 transition-transform block" />
      </button>
    </div>
  );
}
