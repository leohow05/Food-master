import { useState } from "react";
import { DietaryPreferences, TasteProfile } from "../types";
import { Check, Flame, Candy, Grape, Disc, Sparkles, X, Fish, Beef, Ban, Utensils, FileText, Leaf, Sprout, Milk, ChefHat } from "lucide-react";

interface PreferencesScreenProps {
  preferences: DietaryPreferences;
  tasteProfile: TasteProfile;
  onChangePreferences: (prefs: DietaryPreferences) => void;
  onChangeTasteProfile: (profile: TasteProfile) => void;
  onFindMeal: () => void;
}

export default function PreferencesScreen({
  preferences,
  tasteProfile,
  onChangePreferences,
  onChangeTasteProfile,
  onFindMeal,
}: PreferencesScreenProps) {
  const [activeSubTab, setActiveSubTab] = useState<"dietary" | "palate">("dietary");
  const [customInput, setCustomInput] = useState("");
  const [savedSuccess, setSavedSaved] = useState(false);

  const exclusionsList = [
    { name: "Seafood", icon: Fish },
    { name: "Nuts", icon: Sprout },
    { name: "Dairy", icon: Milk },
    { name: "Pork", icon: Beef },
    { name: "Beef", icon: Beef },
    { name: "Spicy", icon: Flame },
    { name: "Cilantro", icon: Leaf },
    { name: "Mushrooms", icon: Sprout }
  ];

  const lifestyleDiets = ["Vegetarian", "Vegan", "Halal", "Gluten-free", "Lactose-free"];

  const handleToggleExclusion = (name: string) => {
    const updated = preferences.exclusions.includes(name)
      ? preferences.exclusions.filter((e) => e !== name)
      : [...preferences.exclusions, name];
    onChangePreferences({ ...preferences, exclusions: updated });
  };

  const handleToggleLifestyle = (diet: string) => {
    const updated = preferences.lifestyleDiets.includes(diet)
      ? preferences.lifestyleDiets.filter((d) => d !== diet)
      : [...preferences.lifestyleDiets, diet];
    onChangePreferences({ ...preferences, lifestyleDiets: updated });
  };

  const handleAddCustomExclusion = () => {
    if (!customInput.trim()) return;
    const splitItems = customInput
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
    const updated = [
      ...preferences.customExclusions,
      ...splitItems.filter((item) => !preferences.customExclusions.includes(item)),
    ];
    onChangePreferences({ ...preferences, customExclusions: updated });
    setCustomInput("");
  };

  const handleRemoveCustomExclusion = (name: string) => {
    onChangePreferences({
      ...preferences,
      customExclusions: preferences.customExclusions.filter((item) => item !== name),
    });
  };

  // Slider helpers
  const sliderLabels = {
    spiciness: ["Mild", "A bit", "Medium", "Hot!", "Nuclear"],
    sweetness: ["None", "Subtle", "Balanced", "Dessert-like", "Sugary"],
    sourness: ["None", "Fresh", "Zesty", "Tangy", "Pucker-up"],
    saltiness: ["Low", "Light", "Balanced", "Seasoned", "Salty"],
    richness: ["Clean", "Light", "Hearty", "Creamy", "Indulgent"],
  };

  const handleSliderChange = (key: keyof TasteProfile, val: number) => {
    onChangeTasteProfile({
      ...tasteProfile,
      [key]: val,
    });
  };

  const handleSaveAll = () => {
    setSavedSaved(true);
    setTimeout(() => setSavedSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto pb-32">
      {/* Settings Top Toggle */}
      <div className="relative bg-surface-container-low rounded-lg p-1 flex items-center mb-6 border border-surface-container-high shadow-sm">
        <button
          onClick={() => setActiveSubTab("dietary")}
          className={`relative z-10 flex-1 py-3 font-label text-sm font-semibold transition-colors cursor-pointer ${
            activeSubTab === "dietary" ? "text-primary font-bold" : "text-on-surface-variant"
          }`}
        >
          Dietary Restrictions
        </button>
        <button
          onClick={() => setActiveSubTab("palate")}
          className={`relative z-10 flex-1 py-3 font-label text-sm font-semibold transition-colors cursor-pointer ${
            activeSubTab === "palate" ? "text-primary font-bold" : "text-on-surface-variant"
          }`}
        >
          Fine-tune Palate
        </button>
        <div
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-md shadow-sm transition-transform duration-300"
          style={{
            transform: activeSubTab === "palate" ? "translateX(100%)" : "translateX(0)",
          }}
        />
      </div>

      {activeSubTab === "dietary" ? (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header */}
          <section className="text-center md:text-left">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-1">
              Dietary Restrictions
            </h2>
            <p className="text-on-surface-variant text-sm font-medium">
              Tell us what's off the menu so we can find your perfect bite.
            </p>
          </section>

          {/* Common Exclusions */}
          <section>
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <Ban className="w-5 h-5 text-secondary block" />
              Common Exclusions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {exclusionsList.map((item) => {
                const isActive = preferences.exclusions.includes(item.name);
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleToggleExclusion(item.name)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 active:scale-95 cursor-pointer ${
                      isActive
                        ? "bg-primary-container/20 border-primary text-primary shadow-sm"
                        : "bg-surface-container-low border-transparent hover:bg-surface-container-high text-on-surface"
                    }`}
                  >
                    <IconComponent className="w-8 h-8 mb-2 text-primary block" />
                    <span className="font-label text-xs font-bold">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Lifestyle Diets */}
          <section>
            <h3 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-tertiary block" />
              Lifestyle Diets
            </h3>
            <div className="flex flex-wrap gap-2">
              {lifestyleDiets.map((diet) => {
                const isActive = preferences.lifestyleDiets.includes(diet);
                return (
                  <button
                    key={diet}
                    onClick={() => handleToggleLifestyle(diet)}
                    className={`px-5 py-2.5 rounded-full border text-xs font-label font-bold transition-all duration-200 active:scale-95 cursor-pointer ${
                      isActive
                        ? "bg-primary-fixed text-on-primary-fixed border-primary shadow-sm"
                        : "bg-surface-container-lowest text-on-surface border-outline-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {diet}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Custom Exclusions */}
          <section className="space-y-3 pb-8">
            <h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary block" />
              Custom Exclusions
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddCustomExclusion();
                }}
                placeholder="e.g. Avocado, Olives, Squid..."
                className="flex-grow bg-surface-container-low border-2 border-transparent focus:border-primary-container focus:ring-0 rounded-lg p-4 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none"
              />
              <button
                onClick={handleAddCustomExclusion}
                className="bg-primary hover:bg-opacity-95 text-white px-6 rounded-lg font-label font-bold text-sm shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                Add
              </button>
            </div>
            <p className="text-xs text-on-surface-variant font-semibold pl-1">
              Separate ingredients with a comma.
            </p>

            {/* Custom Exclusions Tag List */}
            {preferences.customExclusions.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {preferences.customExclusions.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 bg-surface-container-high px-3 py-1.5 rounded-full text-xs font-label font-bold text-on-surface border border-outline-variant"
                  >
                    <span>{tag}</span>
                    <button
                      onClick={() => handleRemoveCustomExclusion(tag)}
                      className="text-on-surface-variant hover:text-error cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Save Button */}
          <div className="fixed bottom-24 left-0 right-0 flex justify-center px-5 pointer-events-none z-40">
            <button
              onClick={handleSaveAll}
              className={`pointer-events-auto font-headline font-bold px-12 py-4 rounded-full shadow-[0_8px_30px_rgb(142,78,20,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 w-full max-w-sm cursor-pointer ${
                savedSuccess ? "bg-tertiary text-white" : "bg-primary text-white"
              }`}
            >
              {savedSuccess ? "Preferences Saved!" : "Save Preferences"}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Header */}
          <section className="text-center md:text-left">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-1">
              Fine-tune your palate
            </h2>
            <p className="text-on-surface-variant text-sm font-medium">
              Tell us exactly how you're feeling today, and we'll find the perfect match.
            </p>
          </section>

          {/* Floating Bubbles */}
          <div className="relative h-24 overflow-hidden rounded-lg bg-surface-container-lowest/30 border border-surface-container shadow-sm p-4 flex justify-around items-center">
            <div className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full shadow-sm text-xs font-label font-bold animate-pulse">
              "No seafood"
            </div>
            <div className="bg-tertiary-container text-on-tertiary-container px-4 py-2 rounded-full shadow-sm text-xs font-label font-bold animate-bounce delay-100">
              "Not too spicy"
            </div>
            <div className="bg-primary-container text-on-primary-container px-4 py-2 rounded-full shadow-sm text-xs font-label font-bold animate-pulse delay-300">
              "Extra sour"
            </div>
          </div>

          {/* Preference Sliders Stack */}
          <section className="space-y-4 pb-12">
            {/* Spiciness */}
            <div className="bg-surface-container-low p-4 rounded-lg shadow-sm border border-surface-container">
              <div className="flex justify-between items-center mb-2">
                <label className="font-label text-sm font-bold text-primary flex items-center gap-2">
                  <Flame className="w-5 h-5 text-secondary fill-secondary" />
                  Spiciness
                </label>
                <span className="font-label text-xs font-bold bg-surface-container-highest px-2 py-1 rounded-md text-on-surface">
                  {sliderLabels.spiciness[tasteProfile.spiciness - 1]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={tasteProfile.spiciness}
                onChange={(e) => handleSliderChange("spiciness", parseInt(e.target.value))}
                className="w-full accent-primary-container h-2 rounded-lg bg-surface-container-high cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-label font-bold">
                <span>Mild</span>
                <span>Extra Spicy</span>
              </div>
            </div>

            {/* Sweetness */}
            <div className="bg-surface-container-low p-4 rounded-lg shadow-sm border border-surface-container">
              <div className="flex justify-between items-center mb-2">
                <label className="font-label text-sm font-bold text-primary flex items-center gap-2">
                  <Candy className="w-5 h-5 text-primary" />
                  Sweetness
                </label>
                <span className="font-label text-xs font-bold bg-surface-container-highest px-2 py-1 rounded-md text-on-surface">
                  {sliderLabels.sweetness[tasteProfile.sweetness - 1]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={tasteProfile.sweetness}
                onChange={(e) => handleSliderChange("sweetness", parseInt(e.target.value))}
                className="w-full accent-primary-container h-2 rounded-lg bg-surface-container-high cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-label font-bold">
                <span>Savory</span>
                <span>Very Sweet</span>
              </div>
            </div>

            {/* Sourness */}
            <div className="bg-surface-container-low p-4 rounded-lg shadow-sm border border-surface-container">
              <div className="flex justify-between items-center mb-2">
                <label className="font-label text-sm font-bold text-primary flex items-center gap-2">
                  <Grape className="w-5 h-5 text-tertiary" />
                  Sourness
                </label>
                <span className="font-label text-xs font-bold bg-surface-container-highest px-2 py-1 rounded-md text-on-surface">
                  {sliderLabels.sourness[tasteProfile.sourness - 1]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={tasteProfile.sourness}
                onChange={(e) => handleSliderChange("sourness", parseInt(e.target.value))}
                className="w-full accent-primary-container h-2 rounded-lg bg-surface-container-high cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-label font-bold">
                <span>Mild</span>
                <span>Extra Tart</span>
              </div>
            </div>

            {/* Saltiness */}
            <div className="bg-surface-container-low p-4 rounded-lg shadow-sm border border-surface-container">
              <div className="flex justify-between items-center mb-2">
                <label className="font-label text-sm font-bold text-primary flex items-center gap-2">
                  <Disc className="w-5 h-5 text-primary" />
                  Saltiness
                </label>
                <span className="font-label text-xs font-bold bg-surface-container-highest px-2 py-1 rounded-md text-on-surface">
                  {sliderLabels.saltiness[tasteProfile.saltiness - 1]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={tasteProfile.saltiness}
                onChange={(e) => handleSliderChange("saltiness", parseInt(e.target.value))}
                className="w-full accent-primary-container h-2 rounded-lg bg-surface-container-high cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-label font-bold">
                <span>Low Sodium</span>
                <span>Well Seasoned</span>
              </div>
            </div>

            {/* Richness */}
            <div className="bg-surface-container-low p-4 rounded-lg shadow-sm border border-surface-container">
              <div className="flex justify-between items-center mb-2">
                <label className="font-label text-sm font-bold text-primary flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-primary" />
                  Richness
                </label>
                <span className="font-label text-xs font-bold bg-surface-container-highest px-2 py-1 rounded-md text-on-surface">
                  {sliderLabels.richness[tasteProfile.richness - 1]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={tasteProfile.richness}
                onChange={(e) => handleSliderChange("richness", parseInt(e.target.value))}
                className="w-full accent-primary-container h-2 rounded-lg bg-surface-container-high cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant font-label font-bold">
                <span>Clean</span>
                <span>Decadent</span>
              </div>
            </div>
          </section>

          {/* Primary Action Find my meal */}
          <div className="flex justify-center pt-4">
            <button
              onClick={onFindMeal}
              className="bg-primary-container hover:brightness-105 text-on-primary-container font-headline font-bold text-lg px-12 py-4 rounded-full shadow-[0_8px_30px_rgba(244,162,97,0.4)] active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 group"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Find My Meal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
