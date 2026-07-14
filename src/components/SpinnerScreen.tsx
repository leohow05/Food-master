import { useState, useRef, useEffect, useMemo } from "react";
import { Sparkles, RefreshCw, BookOpen, X, ChevronDown, Utensils, Dices, Globe, ShoppingBag, DollarSign, Shuffle, Flame, Heart, Smile } from "lucide-react";
import { Recipe } from "../types";

interface SpinnerScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipeId: string) => void;
}

export default function SpinnerScreen({ recipes, onSelectRecipe }: SpinnerScreenProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState<string>("singapore");

  // Custom filters
  const [customFilters, setCustomFilters] = useState({
    cuisine: "Any",
    type: "Any",
    pantry: "Any",
    budget: "Any",
  });

  const wheelRef = useRef<HTMLDivElement>(null);

  // Segment colors supporting up to 12 colors
  const segmentColors = [
    "#f4a261", // Warm Apricot
    "#5cc6b7", // Cool Teal
    "#ff8162", // Soft Coral
    "#ffdcc4", // Peach
    "#8cf5e4", // Mint
    "#ffdad2", // Creamy Rose
    "#e9c46a", // Muted Yellow
    "#e76f51", // Burnt Orange
    "#4a90e2", // Elegant Blue
    "#b8e986", // Fresh Green
    "#fbc3bc", // Lavender Peach
    "#9be3de", // Pale Turquoise
  ];

  // List of presets
  const presetsList = [
    { id: "singapore", label: "🇸🇬 Singapore Specials", desc: "Laksa, Chicken Rice, Chili Crab & Asian classics" },
    { id: "classic", label: "🌟 Chef's Classics", desc: "Original balanced favorite dishes" },
    { id: "asian", label: "🍜 Asian Fusion", desc: "Japanese, Chinese, Korean & Thai delights" },
    { id: "spicy", label: "🌶️ Spicy Lovers", desc: "Fiery dishes from Szechuan, Isan & Yucatan" },
    { id: "healthy", label: "🥗 Healthy & Green", desc: "Fresh salads, quinoa bowls & low-carb plates" },
    { id: "european", label: "🇪🇺 European Tour", desc: "Italian pasta, Spanish paella & French stews" },
    { id: "random", label: "🎲 Random Shuffle", desc: "Loads 10 random recipes from all 35+ choices" },
  ];

  // Calculate dynamic meals list based on active preset and custom filters
  const meals = useMemo(() => {
    // If we have custom filters active (any of them is not 'Any'), use custom calculation
    const hasCustomFilters =
      customFilters.cuisine !== "Any" ||
      customFilters.type !== "Any" ||
      customFilters.pantry !== "Any" ||
      customFilters.budget !== "Any";

    let pool = [...recipes];

    if (hasCustomFilters) {
      // 1. Filter by Cuisine
      if (customFilters.cuisine !== "Any") {
        pool = pool.filter(
          (r) =>
            (r.cuisine || "").toLowerCase() === customFilters.cuisine.toLowerCase() ||
            (r.cuisine || "").toLowerCase() === "singaporean" && customFilters.cuisine === "Singaporean"
        );
      }

      // 2. Filter by Type (Difficulty)
      if (customFilters.type !== "Any") {
        pool = pool.filter((r) => r.difficulty === customFilters.type);
      }

      // 3. Filter by Pantry Match
      if (customFilters.pantry !== "Any") {
        // High matching percentage
        pool = pool.filter((r) => r.matchPercentage && r.matchPercentage >= 80);
      }

      // 4. Filter by Budget (Servings scale)
      if (customFilters.budget !== "Any") {
        if (customFilters.budget === "Single (1)") {
          pool = pool.filter((r) => r.servings === 1);
        } else if (customFilters.budget === "Couples (2)") {
          pool = pool.filter((r) => r.servings === 2);
        } else if (customFilters.budget === "Family (3+)") {
          pool = pool.filter((r) => r.servings >= 3);
        }
      }
    } else {
      // Use Preset mapping
      if (activePreset === "singapore") {
        const sg = recipes.filter(
          (r) =>
            (r.cuisine || "").toLowerCase() === "singaporean" ||
            (r.region || "").toLowerCase() === "singapore"
        );
        const asian = recipes.filter(
          (r) =>
            !sg.includes(r) &&
            ["chinese", "japanese", "korean", "thai", "asian"].includes((r.cuisine || "").toLowerCase())
        );
        pool = [...sg, ...asian];
      } else if (activePreset === "asian") {
        pool = recipes.filter((r) =>
          ["chinese", "japanese", "korean", "thai", "asian", "singaporean"].includes(
            (r.cuisine || "").toLowerCase()
          )
        );
      } else if (activePreset === "european") {
        pool = recipes.filter((r) =>
          ["italian", "greek", "mediterranean", "spanish", "french"].includes(
            (r.cuisine || "").toLowerCase()
          )
        );
      } else if (activePreset === "spicy") {
        pool = recipes.filter((r) =>
          r.dietaryTags.some((tag) => tag.toLowerCase() === "spicy")
        );
      } else if (activePreset === "healthy") {
        pool = recipes.filter(
          (r) =>
            r.dietaryTags.some((tag) =>
              ["vegetarian", "vegan", "vegan opt.", "gluten-free", "keto"].includes(tag.toLowerCase())
            ) || (r.description || "").toLowerCase().includes("healthy")
        );
      } else if (activePreset === "classic") {
        // Return custom original subset
        const classicIds = [
          "the-gourmet-smash",
          "classic-carbonara",
          "thai-green-curry",
          "zesty-garlic-shrimp",
          "sage-risotto",
          "savory-chicken-onion-noodles",
          "avocado-heaven",
          "zesty-greek-bowl",
          "creamy-tomato-penne",
          "sun-kissed-quinoa-power-bowl",
        ];
        pool = recipes.filter((r) => classicIds.includes(r.id));
      } else if (activePreset === "random") {
        // Handled below - we shuffle the complete pool
      }
    }

    // Shuffle the result slightly to give fresh variety
    let finalSelection = [...pool];
    
    // For random or if pool is large, shuffle
    if (activePreset === "random" || finalSelection.length > 10) {
      finalSelection.sort(() => 0.5 - Math.random());
    }

    // Map to wheel segments (Aim for 8 to 12 items for optimal spinner rendering)
    let mapped = finalSelection.map((r) => ({
      name: r.title
        .replace("Singapore ", "")
        .replace("Hainanese ", "")
        .replace("Guangdong ", "")
        .replace("Szechuan ", "")
        .replace("Kanto-style ", "")
        .replace("Hokkaido ", "")
        .replace("Punjab ", "")
        .replace("Punjabi ", "")
        .replace("Classic ", "")
        .substring(0, 15),
      recipeId: r.id,
    }));

    // Fallback if empty
    if (mapped.length === 0) {
      return [
        { name: "Chicken Rice", recipeId: "hainanese-chicken-rice" },
        { name: "Katong Laksa", recipeId: "singapore-laksa" },
        { name: "Chili Crab", recipeId: "singapore-chili-crab" },
        { name: "Burger", recipeId: "the-gourmet-smash" },
        { name: "Carbonara", recipeId: "classic-carbonara" },
        { name: "Green Curry", recipeId: "thai-green-curry" },
        { name: "Sage Risotto", recipeId: "sage-risotto" },
        { name: "Avocado Toast", recipeId: "avocado-heaven" },
      ];
    }

    // Limit to 12 items max, 6 items min (repeat items if extremely low to keep spinner beautiful)
    if (mapped.length > 12) {
      return mapped.slice(0, 12);
    }
    if (mapped.length < 6) {
      // Duplicate to ensure at least 6 slices
      const originalLength = mapped.length;
      while (mapped.length < 6) {
        mapped = [...mapped, ...mapped.slice(0, originalLength)];
      }
    }

    return mapped;
  }, [recipes, activePreset, customFilters]);

  // Clean state on preset change
  useEffect(() => {
    setWinner(null);
  }, [activePreset, customFilters]);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // Random extra rotations (5-10 full turns) plus random sector offset
    const extraRotations = 6 + Math.floor(Math.random() * 5);
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + extraRotations * 360 + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      // Calculate winning segment
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const segmentSize = 360 / meals.length;
      const winningIndex = Math.floor(normalizedAngle / segmentSize) % meals.length;

      setWinner(meals[winningIndex].name);
    }, 3000);
  };

  const handleViewWinnerRecipe = () => {
    if (!winner) return;
    const match = meals.find((m) => m.name === winner);
    if (match) {
      onSelectRecipe(match.recipeId);
    }
  };

  // Preset Selection Click
  const handleSelectPreset = (id: string) => {
    setActivePreset(id);
    // Reset custom filters so the preset loads properly
    setCustomFilters({
      cuisine: "Any",
      type: "Any",
      pantry: "Any",
      budget: "Any",
    });
  };

  // Cycling function for Custom Filters
  const handleCycleFilter = (key: keyof typeof customFilters) => {
    setWinner(null);
    if (key === "cuisine") {
      const options = ["Any", "Singaporean", "Chinese", "Japanese", "Korean", "Thai", "Italian", "Mexican", "Mediterranean"];
      setCustomFilters((prev) => {
        const idx = options.indexOf(prev.cuisine);
        const next = options[(idx + 1) % options.length];
        return { ...prev, cuisine: next };
      });
    } else if (key === "type") {
      const options = ["Any", "Easy", "Medium", "Hard"];
      setCustomFilters((prev) => {
        const idx = options.indexOf(prev.type);
        const next = options[(idx + 1) % options.length];
        return { ...prev, type: next };
      });
    } else if (key === "pantry") {
      const options = ["Any", "Best Match"];
      setCustomFilters((prev) => {
        const idx = options.indexOf(prev.pantry);
        const next = options[(idx + 1) % options.length];
        return { ...prev, pantry: next };
      });
    } else if (key === "budget") {
      const options = ["Any", "Single (1)", "Couples (2)", "Family (3+)"];
      setCustomFilters((prev) => {
        const idx = options.indexOf(prev.budget);
        const next = options[(idx + 1) % options.length];
        return { ...prev, budget: next };
      });
    }
  };

  // Direct Shuffle triggers recalculation
  const handleForceShuffle = () => {
    setRotation((prev) => prev + 360); // subtle turn
    setWinner(null);
    // Setting active preset to same value or toggling random triggers update
    if (activePreset === "random") {
      // Toggle a random trick
      setActivePreset("classic");
      setTimeout(() => setActivePreset("random"), 10);
    } else {
      const current = activePreset;
      setActivePreset("random");
      setTimeout(() => setActivePreset(current), 10);
    }
  };

  const activePresetInfo = presetsList.find((p) => p.id === activePreset);

  return (
    <div className="flex flex-col items-center animate-in fade-in duration-300 relative pb-48">
      {/* Header Text */}
      <div className="text-center mb-6 max-w-lg">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-1 flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-primary block animate-pulse" />
          The Culinary Spinner
        </h2>
        <p className="text-on-surface-variant font-medium text-sm md:text-base">
          Choose a theme below, shuffle the choices, and let destiny choose your next delicious meal!
        </p>
      </div>

      {/* Preset Categories Scroller */}
      <div className="w-full max-w-xl mb-6">
        <span className="font-label text-xs font-bold text-primary uppercase tracking-widest block mb-2 px-1 text-left">
          Select Spin Theme
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x touch-pan-x">
          {presetsList.map((preset) => {
            const isSelected = activePreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`flex-none snap-start px-4 py-2.5 rounded-full border text-xs font-headline font-bold transition-all duration-200 cursor-pointer active:scale-95 ${
                  isSelected
                    ? "bg-primary border-primary text-white shadow-md scale-105"
                    : "bg-surface border-outline-variant text-on-surface-variant hover:bg-surface-container-low"
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
        {activePresetInfo && (
          <p className="text-xs text-on-surface-variant italic mt-1.5 px-1">
            {activePresetInfo.desc} ({meals.length} choices on wheel)
          </p>
        )}
      </div>

      {/* Spinner Wheel Display */}
      <div className="relative w-full aspect-square max-w-[320px] mb-6 flex items-center justify-center">
        {/* Glow */}
        <div className="absolute inset-0 bg-primary-container/20 blur-3xl rounded-full scale-110" />

        {/* Pointer Indicator */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 z-20 text-secondary">
          <ChevronDown className="w-10 h-10 block text-secondary drop-shadow-md animate-bounce" />
        </div>

        {/* The Wheel */}
        <div
          ref={wheelRef}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? "transform 3000ms cubic-bezier(0.15, 0, 0.15, 1)" : "none",
          }}
          className="relative w-full h-full rounded-full border-8 border-surface-container-high shadow-2xl overflow-hidden bg-surface"
        >
          {/* Wheel Segments & Labels SVG */}
          <svg className="w-full h-full select-none" viewBox="0 0 100 100">
            <circle cx="50" cy="50" fill="#f2ede7" r="50" />
            {meals.map((meal, index) => {
              const N = meals.length;
              const angleStep = 360 / N;
              const startAngle = index * angleStep - 90;
              const endAngle = (index + 1) * angleStep - 90;
              const centerAngle = (index + 0.5) * angleStep - 90;

              // Convert start and end angles to coordinates on circle of radius 50
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;

              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);

              // SVG Path for slice
              const pathD = `M 50 50 L ${x1.toFixed(2)} ${y1.toFixed(2)} A 50 50 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

              // Find color for the segment
              const color = segmentColors[index % segmentColors.length];

              // Normalize center angle to [-180, 180] for text flipping
              let normalizedAngle = centerAngle;
              while (normalizedAngle > 180) normalizedAngle -= 360;
              while (normalizedAngle < -180) normalizedAngle += 360;
              const shouldFlip = normalizedAngle > 90 || normalizedAngle < -90;

              return (
                <g key={index}>
                  {/* The Slice */}
                  <path
                    d={pathD}
                    fill={color}
                    className="transition-colors duration-200"
                    style={{ opacity: 0.95 }}
                  />
                  {/* Dynamic centered & flipped radial label inside the SVG */}
                  <g transform={`translate(50, 50) rotate(${centerAngle})`}>
                    <text
                      x={28}
                      y={1.2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={shouldFlip ? "rotate(180, 28, 0)" : undefined}
                      fill="#2e1a04"
                      className="font-sans font-black text-[2.8px] tracking-wide select-none pointer-events-none"
                    >
                      {meal.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Center Pivot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg border-4 border-primary-container z-10 flex items-center justify-center">
              <Utensils className="w-5 h-5 text-primary block" />
            </div>
          </div>
        </div>
      </div>

      {/* Confetti Overlay */}
      {winner && !isSpinning && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full animate-ping opacity-15">
          <div className="absolute top-5 left-1/4 w-3 h-3 bg-secondary-container rounded-full" />
          <div className="absolute top-12 right-1/4 w-2.5 h-2.5 bg-tertiary-container rounded-full" />
          <div className="absolute bottom-16 left-1/3 w-3 h-3 bg-primary-container rounded-full" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 w-full max-w-[320px] mb-8">
        <button
          onClick={handleForceShuffle}
          disabled={isSpinning}
          className="flex-1 bg-surface-container-high border border-outline-variant text-on-surface hover:bg-surface-container-highest disabled:opacity-50 font-headline font-bold py-4 rounded-lg shadow active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          title="Reshuffle the wheel choices with fresh random items!"
        >
          <Shuffle className="w-5 h-5 block text-primary" />
          Shuffle
        </button>

        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="flex-2 bg-primary hover:bg-opacity-95 disabled:opacity-50 text-white font-headline font-bold py-4 rounded-lg shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Dices className={`w-5 h-5 block text-white ${isSpinning ? "animate-spin" : ""}`} />
          {isSpinning ? "Deciding..." : "Spin Wheel"}
        </button>
      </div>

      {/* Customization Options */}
      <section className="w-full space-y-4 bg-surface-container-low p-4 rounded-lg shadow-sm border border-surface-variant max-w-xl">
        <div className="flex justify-between items-center">
          <h3 className="font-label text-xs font-bold text-primary uppercase tracking-widest">
            Finetune / Dynamic Filter
          </h3>
          <button
            onClick={() => {
              setCustomFilters({ cuisine: "Any", type: "Any", pantry: "Any", budget: "Any" });
              setWinner(null);
            }}
            className="text-[10px] text-primary hover:underline font-bold"
          >
            Reset Filters
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Cuisine */}
          <div
            onClick={() => handleCycleFilter("cuisine")}
            className={`flex items-center justify-between p-3 bg-surface rounded-md border transition-all cursor-pointer ${
              customFilters.cuisine !== "Any" ? "border-primary bg-primary-container/10" : "border-outline-variant hover:bg-surface-container-low"
            }`}
          >
            <div className="flex items-center gap-2">
              <Globe className="text-primary w-4.5 h-4.5 block" />
              <span className="font-label font-bold text-xs text-on-surface">Cuisine</span>
            </div>
            <span className="font-label text-[11px] font-bold text-primary">
              {customFilters.cuisine}
            </span>
          </div>

          {/* Difficulty */}
          <div
            onClick={() => handleCycleFilter("type")}
            className={`flex items-center justify-between p-3 bg-surface rounded-md border transition-all cursor-pointer ${
              customFilters.type !== "Any" ? "border-primary bg-primary-container/10" : "border-outline-variant hover:bg-surface-container-low"
            }`}
          >
            <div className="flex items-center gap-2">
              <Utensils className="text-primary w-4.5 h-4.5 block" />
              <span className="font-label font-bold text-xs text-on-surface">Difficulty</span>
            </div>
            <span className="font-label text-[11px] font-bold text-primary">
              {customFilters.type}
            </span>
          </div>

          {/* Pantry Matches */}
          <div
            onClick={() => handleCycleFilter("pantry")}
            className={`flex items-center justify-between p-3 bg-surface rounded-md border transition-all cursor-pointer ${
              customFilters.pantry !== "Any" ? "border-primary bg-primary-container/10" : "border-outline-variant hover:bg-surface-container-low"
            }`}
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-primary w-4.5 h-4.5 block" />
              <span className="font-label font-bold text-xs text-on-surface">Pantry Match</span>
            </div>
            <span className="font-label text-[11px] font-bold text-primary">
              {customFilters.pantry === "Any" ? "Any" : "Best Match (80%+)"}
            </span>
          </div>

          {/* Servings scale */}
          <div
            onClick={() => handleCycleFilter("budget")}
            className={`flex items-center justify-between p-3 bg-surface rounded-md border transition-all cursor-pointer ${
              customFilters.budget !== "Any" ? "border-primary bg-primary-container/10" : "border-outline-variant hover:bg-surface-container-low"
            }`}
          >
            <div className="flex items-center gap-2">
              <DollarSign className="text-primary w-4.5 h-4.5 block" />
              <span className="font-label font-bold text-xs text-on-surface">Servings</span>
            </div>
            <span className="font-label text-[11px] font-bold text-primary">
              {customFilters.budget}
            </span>
          </div>
        </div>
      </section>

      {/* Result destiny modal popup */}
      {winner && !isSpinning && (
        <div className="fixed bottom-24 left-0 w-full px-5 z-40 transition-all duration-500 transform translate-y-0 opacity-100">
          <div className="max-w-md mx-auto w-full bg-surface-container-highest p-4 rounded-lg shadow-xl border-t-4 border-primary flex flex-col gap-3 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-label text-[10px] font-bold text-secondary uppercase tracking-widest">
                  TODAY'S DESTINY:
                </span>
                <h4 className="font-headline font-bold text-xl text-primary">{winner}</h4>
              </div>
              <button
                onClick={() => setWinner(null)}
                className="p-1.5 bg-error-container text-on-error-container rounded-full hover:opacity-80 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSpin}
                className="flex-1 bg-surface border-2 border-primary text-primary font-label text-xs font-bold py-2.5 rounded-md hover:bg-primary-fixed-dim transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Spin Again
              </button>
              <button
                onClick={handleViewWinnerRecipe}
                className="flex-1 bg-primary hover:bg-opacity-95 text-on-primary font-label text-xs font-bold py-2.5 rounded-md shadow-md flex items-center justify-center gap-1 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" /> View Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
