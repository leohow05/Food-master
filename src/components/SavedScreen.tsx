import { useState } from "react";
import { Recipe } from "../types";
import { Heart, Star, Calendar, RefreshCw, FileText } from "lucide-react";

interface SavedScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipeId: string) => void;
  onToggleFavorite: (recipeId: string) => void;
  onCookAgain: (recipeId: string) => void;
  onNavigateToTab: (tab: "search" | "spin" | "saved" | "profile") => void;
}

export default function SavedScreen({
  recipes,
  onSelectRecipe,
  onToggleFavorite,
  onCookAgain,
  onNavigateToTab,
}: SavedScreenProps) {
  const [activeTab, setActiveTab] = useState<"favorites" | "history">("favorites");

  const favorites = recipes.filter((r) => r.isFavorite);
  
  // Let's mock a structured chronological history based on recipes
  const historyItems = [
    {
      recipeId: "avocado-heaven",
      timeAgo: "2h ago",
      group: "Today",
      rating: 5,
    },
    {
      recipeId: "sun-kissed-quinoa-power-bowl",
      timeAgo: "Yesterday",
      group: "Yesterday",
      rating: 4,
    },
    {
      recipeId: "creamy-tomato-penne",
      timeAgo: "Yesterday",
      group: "Yesterday",
      rating: 0, // Not rated yet
    },
  ];

  const handleUpdateItemRating = (recipeId: string, newRating: number) => {
    // Rating callback can be triggered locally
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Tab Navigation */}
      <div className="relative bg-surface-container-low rounded-lg p-1 flex items-center border border-surface-container-high shadow-sm">
        <button
          onClick={() => setActiveTab("favorites")}
          className={`relative z-10 flex-1 py-3 font-label text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "favorites" ? "text-primary font-bold" : "text-on-surface-variant"
          }`}
        >
          Favorites
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`relative z-10 flex-1 py-3 font-label text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "history" ? "text-primary font-bold" : "text-on-surface-variant"
          }`}
        >
          Recently Cooked
        </button>
        <div
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-md shadow-sm transition-transform duration-300"
          style={{
            transform: activeTab === "history" ? "translateX(100%)" : "translateX(0)",
          }}
        />
      </div>

      {/* Tab Content: Favorites */}
      {activeTab === "favorites" ? (
        favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {favorites.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(244,162,97,0.08)] border border-surface-container hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
                onClick={() => onSelectRecipe(recipe.id)}
              >
                <div className="relative h-44">
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
                    className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 rounded-full text-secondary shadow-md hover:bg-white active:scale-90 transition-transform cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-primary text-primary" />
                  </button>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-headline font-bold text-on-surface text-base group-hover:text-primary transition-colors line-clamp-1">
                        {recipe.title}
                      </h3>
                      <span className="text-tertiary font-label text-[10px] font-bold bg-tertiary/10 px-2 py-0.5 rounded-full flex-shrink-0">
                        {recipe.cuisine}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-on-surface-variant line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-surface-container">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= Math.floor(recipe.rating)
                              ? "text-primary-container fill-primary-container"
                              : "text-outline-variant"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-label text-[10px] text-on-surface-variant italic font-semibold">
                      Cooked {recipe.cookedCount}x
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-300">
            <div className="w-36 h-36 mb-6 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary">
              <Heart className="w-16 h-16 stroke-[1.5]" />
            </div>
            <h2 className="font-headline text-lg font-bold text-on-surface mb-2">No favorites yet</h2>
            <p className="font-sans text-sm text-on-surface-variant max-w-xs mx-auto mb-6">
              Start exploring and tap the heart icon to save meals you love!
            </p>
            <button
              onClick={() => onNavigateToTab("search")}
              className="bg-primary-container text-on-primary-container font-label text-xs font-bold px-8 py-3.5 rounded-full shadow-lg active:scale-95 transition-all cursor-pointer hover:brightness-105"
            >
              Explore Recipes
            </button>
          </div>
        )
      ) : (
        /* History Section */
        <div className="space-y-6 animate-in slide-in-from-right duration-300">
          {["Today", "Yesterday"].map((groupName) => {
            const items = historyItems.filter((item) => item.group === groupName);
            if (items.length === 0) return null;

            return (
              <div key={groupName} className="space-y-3">
                <h4 className="font-label text-xs font-bold text-on-surface-variant uppercase tracking-wider pl-1">
                  {groupName}
                </h4>
                <div className="space-y-4">
                  {items.map((item, idx) => {
                    const recipe = recipes.find((r) => r.id === item.recipeId);
                    if (!recipe) return null;

                    return (
                      <div
                        key={idx}
                        className="bg-white rounded-lg p-4 shadow-[0_4px_20px_rgba(244,162,97,0.08)] border border-surface-container flex gap-4 items-center group hover:border-primary-container transition-colors"
                      >
                        <div
                          onClick={() => onSelectRecipe(recipe.id)}
                          className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                        >
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
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h5
                              onClick={() => onSelectRecipe(recipe.id)}
                              className="font-headline font-bold text-on-surface text-sm md:text-base cursor-pointer hover:text-primary transition-colors truncate"
                            >
                              {recipe.title}
                            </h5>
                            <span className="text-on-surface-variant font-label text-[10px] font-bold flex-shrink-0">
                              {item.timeAgo}
                            </span>
                          </div>

                          {/* Star Ratings Input */}
                          <div className="flex items-center gap-0.5 mt-1.5 mb-2.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                onClick={() => handleUpdateItemRating(recipe.id, star)}
                                className="cursor-pointer active:scale-125 transition-transform"
                              >
                                <Star
                                  className={`w-4 h-4 ${
                                    star <= (item.rating || 0)
                                      ? "text-primary-container fill-primary-container"
                                      : "text-outline-variant"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>

                          <div className="flex gap-4">
                            <button
                              onClick={() => onCookAgain(recipe.id)}
                              className="text-primary font-label text-xs font-bold hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <RefreshCw className="w-3 h-3" /> Cook again
                            </button>
                            <button
                              onClick={() => onSelectRecipe(recipe.id)}
                              className="text-on-surface-variant hover:text-on-surface font-label text-xs font-bold hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <FileText className="w-3 h-3" /> View details
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
