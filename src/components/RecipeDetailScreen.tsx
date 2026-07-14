import { useState, useEffect } from "react";
import { Recipe } from "../types";
import { ArrowLeft, Heart, Clock, BarChart2, Users, Minus, Plus, CheckCircle, Play, Globe, ExternalLink, Loader2, MapPin, Sparkles, Compass } from "lucide-react";
import { USER_AVATAR } from "../recipesData";
import RecipeMap from "./RecipeMap";

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
  onToggleFavorite: (recipeId: string) => void;
  onStartCooking: (recipeId: string) => void;
}

export default function RecipeDetailScreen({
  recipe,
  onBack,
  onToggleFavorite,
  onStartCooking,
}: RecipeDetailScreenProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [checkedIngredients, setBasketChecked] = useState<string[]>([]);
  const [cookedSuccess, setCookedSuccess] = useState(false);

  // States for interactive tabs and internet search integration
  const [activeDetailTab, setActiveDetailTab] = useState<"steps" | "web" | "map">("steps");
  const [webResults, setWebResults] = useState<{ summary: string; sources: { title: string; url: string }[] } | null>(null);
  const [loadingWeb, setLoadingWeb] = useState(false);
  const [webError, setWebError] = useState<string | null>(null);

  const fetchWebRecipes = async () => {
    if (webResults || loadingWeb) return;
    setLoadingWeb(true);
    setWebError(null);
    try {
      const response = await fetch("/api/search-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeTitle: recipe.title }),
      });
      if (!response.ok) {
        throw new Error("Failed to search real-world recipes.");
      }
      const data = await response.json();
      setWebResults(data);
    } catch (err: any) {
      console.error(err);
      setWebError(err.message || "An error occurred while fetching.");
    } finally {
      setLoadingWeb(false);
    }
  };

  // Auto-fetch web recipes when the Web tab is selected
  useEffect(() => {
    if (activeDetailTab === "web") {
      fetchWebRecipes();
    }
  }, [activeDetailTab]);

  const scaleFactor = servings / recipe.servings;

  const handleToggleIngredient = (name: string) => {
    setBasketChecked((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleStartCookingLocal = () => {
    setCookedSuccess(true);
    onStartCooking(recipe.id);
    setTimeout(() => {
      setCookedSuccess(false);
    }, 3000);
  };

  // Helper to scale amounts dynamically!
  const parseAndScaleAmount = (amountStr: string) => {
    const numPart = amountStr.match(/^([0-9.]+)/);
    if (!numPart) return amountStr;
    const num = parseFloat(numPart[1]);
    if (isNaN(num)) return amountStr;
    const unitPart = amountStr.replace(numPart[1], "");
    const scaledNum = Math.round(num * scaleFactor * 10) / 10;
    return `${scaledNum}${unitPart}`;
  };

  return (
    <div className="animate-in fade-in duration-300 pb-32 max-w-2xl mx-auto -mt-6">
      {/* Top Header Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-surface-container-high">
        <div className="flex justify-between items-center px-5 h-16 w-full max-w-2xl mx-auto">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors active:scale-95 duration-200 cursor-pointer text-primary"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-headline font-bold text-lg text-primary tracking-tight">Recipe Details</h1>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-surface shadow-sm">
            <img
              className="w-full h-full object-cover"
              src={USER_AVATAR}
              alt="User headshot"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
              }}
            />
          </div>
        </div>
      </header>

      {/* Hero Image Section */}
      <section className="relative w-full h-[360px] overflow-hidden rounded-b-xl pt-16">
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-10" />
        <img
          className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-[2000ms]"
          src={recipe.imageUrl}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80";
          }}
        />
        {/* Floating Title Card */}
        <div className="absolute bottom-0 left-0 w-full px-5 z-20 translate-y-4">
          <div className="bg-surface-container-lowest p-4 rounded-lg shadow-[0_8px_30px_rgba(244,162,97,0.12)] border border-white/40 backdrop-blur-sm">
            <div className="flex justify-between items-start mb-2">
              <span className="font-label text-xs text-tertiary bg-tertiary-container/20 px-3 py-1 rounded-full font-bold">
                {recipe.cuisine}
              </span>
              <button
                onClick={() => onToggleFavorite(recipe.id)}
                className="text-primary active:scale-90 transition-transform cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    recipe.isFavorite ? "fill-primary" : ""
                  }`}
                />
              </button>
            </div>
            <h2 className="font-headline font-bold text-xl md:text-2xl text-on-surface leading-tight">
              {recipe.title}
            </h2>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="px-5 mt-10 flex justify-between items-center bg-surface-container-low py-4 rounded-lg mx-5">
        <div className="flex flex-col items-center flex-1 border-r border-outline-variant/30">
          <Clock className="w-5 h-5 text-primary-container mb-1" />
          <span className="font-label text-xs font-bold text-on-surface">{recipe.prepTime}m</span>
        </div>
        <div className="flex flex-col items-center flex-1 border-r border-outline-variant/30">
          <BarChart2 className="w-5 h-5 text-primary-container mb-1" />
          <span className="font-label text-xs font-bold text-on-surface">{recipe.difficulty}</span>
        </div>
        <div className="flex flex-col items-center flex-1">
          <Users className="w-5 h-5 text-primary-container mb-1" />
          <span className="font-label text-xs font-bold text-on-surface">{servings} Servings</span>
        </div>
      </section>

      {/* Serving Adjuster */}
      <section className="px-5 mt-8 flex justify-between items-center">
        <h3 className="font-headline text-lg font-bold text-on-surface">Ingredients</h3>
        <div className="flex items-center bg-surface-container-high rounded-full p-1 shadow-sm">
          <button
            onClick={() => setServings((prev) => Math.max(1, prev - 1))}
            className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary active:scale-95 transition-all shadow-sm cursor-pointer border border-transparent"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="px-4 font-label text-sm font-bold text-on-surface-variant">
            {servings}
          </span>
          <button
            onClick={() => setServings((prev) => prev + 1)}
            className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container active:scale-95 transition-all shadow-md cursor-pointer border border-transparent"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Ingredients List */}
      <section className="px-5 mt-4 space-y-6">
        {/* You Have */}
        {recipe.youHave.length > 0 && (
          <div className="space-y-3">
            <p className="font-label text-xs font-bold text-tertiary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tertiary block" /> YOU HAVE
            </p>
            <div className="grid grid-cols-1 gap-2">
              {recipe.youHave.map((ing) => {
                const isChecked = checkedIngredients.includes(ing.name);
                return (
                  <div
                    key={ing.name}
                    onClick={() => handleToggleIngredient(ing.name)}
                    className={`flex items-center justify-between p-4 rounded-md border transition-all cursor-pointer ${
                      isChecked
                        ? "bg-tertiary-container/10 border-tertiary-container text-on-surface-variant opacity-70"
                        : "bg-tertiary-container/5 border-tertiary-container/10 text-on-surface"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle
                        className={`w-5 h-5 transition-colors ${
                          isChecked ? "text-tertiary fill-tertiary-container/20" : "text-tertiary/40"
                        }`}
                      />
                      <span className={`font-sans text-sm ${isChecked ? "line-through" : ""}`}>
                        {ing.name}
                      </span>
                    </div>
                    <span className="font-label text-xs font-bold text-on-surface-variant">
                      {parseAndScaleAmount(ing.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* You Need */}
        {recipe.youNeed.length > 0 && (
          <div className="space-y-3">
            <p className="font-label text-xs font-bold text-secondary flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary block" /> YOU NEED
            </p>
            <div className="grid grid-cols-1 gap-2">
              {recipe.youNeed.map((ing) => {
                const isChecked = checkedIngredients.includes(ing.name);
                return (
                  <div
                    key={ing.name}
                    onClick={() => handleToggleIngredient(ing.name)}
                    className={`flex items-center justify-between p-4 rounded-md border transition-all cursor-pointer ${
                      isChecked
                        ? "bg-surface-container-high border-surface-container-highest opacity-70 text-on-surface-variant"
                        : "bg-surface-container border-transparent text-on-surface"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isChecked ? "bg-primary border-primary text-white" : "border-outline-variant"
                        }`}
                      >
                        {isChecked && <Plus className="w-3.5 h-3.5 rotate-45 stroke-[3]" />}
                      </span>
                      <span className={`font-sans text-sm ${isChecked ? "line-through" : ""}`}>
                        {ing.name}
                      </span>
                    </div>
                    <span className="font-label text-xs font-bold text-on-surface-variant">
                      {parseAndScaleAmount(ing.amount)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Interactive Tabs System: Quick Steps, Internet Guides, Ingredients Map */}
      <section className="mt-10 px-5 space-y-6">
        {/* Tab Headers */}
        <div className="flex bg-surface-container rounded-lg p-1 border border-surface-container-high">
          <button
            onClick={() => setActiveDetailTab("steps")}
            className={`flex-1 py-2.5 rounded-md font-headline font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeDetailTab === "steps"
                ? "bg-surface shadow text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>Quick Steps</span>
          </button>
          
          <button
            onClick={() => setActiveDetailTab("web")}
            className={`flex-1 py-2.5 rounded-md font-headline font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeDetailTab === "web"
                ? "bg-surface shadow text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Real Recipes</span>
          </button>

          <button
            onClick={() => setActiveDetailTab("map")}
            className={`flex-1 py-2.5 rounded-md font-headline font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
              activeDetailTab === "map"
                ? "bg-surface shadow text-primary"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Ingredients Map</span>
          </button>
        </div>

        {/* Tab Content Rendering */}
        <div className="min-h-[220px] pb-10">
          {activeDetailTab === "steps" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="font-headline text-base font-bold text-on-surface">Quick Cooking Guide</h3>
              </div>
              <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4 -mx-5 scroll-smooth">
                {recipe.previewSteps.map((step) => (
                  <div
                    key={step.number}
                    className="min-w-[280px] max-w-[280px] bg-surface-container-highest/20 p-4 rounded-lg border border-surface-variant space-y-2 first:ml-5 last:mr-5 shadow-sm"
                  >
                    <span className="inline-block w-8 h-8 rounded-full bg-primary text-on-primary text-center leading-8 font-label text-xs font-bold">
                      {step.number}
                    </span>
                    <h4 className="font-label text-sm font-bold text-primary">{step.title}</h4>
                    <p className="text-on-surface-variant text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeDetailTab === "web" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <h3 className="font-headline text-base font-bold text-on-surface">Real-World Web Recipes</h3>
              </div>

              {loadingWeb && (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  <p className="text-xs font-label text-on-surface-variant animate-pulse text-center">
                    Searching Google & verifying live cooking blogs...
                  </p>
                </div>
              )}

              {webError && (
                <div className="p-4 bg-red-50 text-red-700 text-xs rounded-lg border border-red-100 flex flex-col gap-2">
                  <p className="font-bold">Could not fetch real recipes:</p>
                  <p>{webError}</p>
                  <button
                    onClick={fetchWebRecipes}
                    className="self-start px-3 py-1 bg-red-100 hover:bg-red-200 rounded font-bold cursor-pointer text-[10px] transition-colors"
                  >
                    Retry Search
                  </button>
                </div>
              )}

              {webResults && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-surface-container/30 p-4 rounded-lg border border-surface-container-high text-xs text-on-surface-variant leading-relaxed">
                    {webResults.summary}
                  </div>

                  {webResults.sources && webResults.sources.length > 0 ? (
                    <div className="space-y-2">
                      <p className="font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
                        Real-World Cooking Tutorials & Blogs:
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {webResults.sources.map((src, index) => (
                          <a
                            key={index}
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3.5 bg-surface-container-low hover:bg-surface-container-high border border-surface-container-high rounded-lg group transition-all text-xs cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                <Globe className="w-3.5 h-3.5" />
                              </div>
                              <span className="font-semibold text-on-surface group-hover:text-primary transition-colors truncate max-w-[220px] md:max-w-[400px]">
                                {src.title}
                              </span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-on-surface-variant/50 group-hover:text-primary transition-colors" />
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-on-surface-variant">No source links found on the web.</p>
                  )}
                </div>
              )}
            </div>
          )}

          {activeDetailTab === "map" && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <h3 className="font-headline text-base font-bold text-on-surface">Find Ingredients Nearby</h3>
              </div>
              <RecipeMap recipeTitle={recipe.title} />
            </div>
          )}
        </div>
      </section>

      {/* Start Cooking CTA overlay */}
      <div className="fixed bottom-0 left-0 w-full p-5 bg-gradient-to-t from-surface via-surface to-transparent z-40">
        <button
          onClick={handleStartCookingLocal}
          className="w-full bg-primary-container hover:brightness-105 text-on-primary-container font-headline font-bold text-lg py-4 rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-transparent"
        >
          <Play className="w-5 h-5 fill-on-primary-container" />
          <span>{cookedSuccess ? "Yum! Cooked Count Updated" : "Start Cooking"}</span>
        </button>
      </div>
    </div>
  );
}
