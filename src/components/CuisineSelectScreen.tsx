import { useState } from "react";
import { CUISINE_IMAGES } from "../recipesData";
import { Check, ArrowRight } from "lucide-react";

interface CuisineSelectScreenProps {
  onContinue: (selectedCuisines: string[]) => void;
}

export default function CuisineSelectScreen({ onContinue }: CuisineSelectScreenProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [noPreference, setNoPreference] = useState(false);

  const cuisines = [
    { name: "Japanese", key: "Japanese" },
    { name: "Italian", key: "Italian" },
    { name: "Chinese", key: "Chinese" },
    { name: "Mexican", key: "Mexican" },
    { name: "Korean", key: "Korean" },
    { name: "American", key: "American" },
    { name: "Thai", key: "Thai" },
    { name: "Mediterranean", key: "Mediterranean" },
    { name: "Singaporean", key: "Singaporean" }
  ];

  const handleToggleCuisine = (key: string) => {
    setNoPreference(false);
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleToggleNoPreference = () => {
    setNoPreference(!noPreference);
    if (!noPreference) {
      setSelected([]);
    }
  };

  const handleContinue = () => {
    onContinue(noPreference ? [] : selected);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom duration-300">
      {/* Intro Section */}
      <section className="mb-8 text-center">
        <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface mb-2">
          Pick Your Flavors
        </h2>
        <p className="text-on-surface-variant font-medium text-sm md:text-base">
          What kind of food are you craving today?
        </p>
      </section>

      {/* No Preference Toggle */}
      <div className="mb-8 flex justify-center">
        <button
          id="no-preference-btn"
          onClick={handleToggleNoPreference}
          className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all duration-200 active:scale-95 cursor-pointer ${
            noPreference
              ? "bg-secondary-container border-primary text-on-secondary-container font-semibold"
              : "bg-surface-container-low border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
          }`}
        >
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              noPreference
                ? "border-primary bg-primary text-white"
                : "border-outline-variant"
            }`}
          >
            {noPreference && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </span>
          <span className="font-label text-sm font-semibold">
            I'm Feeling Lucky (No Preference)
          </span>
        </button>
      </div>

      {/* Cuisine Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-32">
        {cuisines.map((cuisine) => {
          const isSelected = selected.includes(cuisine.key);
          return (
            <div
              key={cuisine.key}
              onClick={() => handleToggleCuisine(cuisine.key)}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-sm transition-all duration-300 hover:shadow-md ${
                isSelected
                  ? "ring-4 ring-primary-container scale-[0.97]"
                  : "hover:scale-[1.02]"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={CUISINE_IMAGES[cuisine.key]}
                alt={cuisine.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute bottom-3 left-3 z-20">
                <span className="text-white font-headline font-bold text-base md:text-lg">
                  {cuisine.name}
                </span>
              </div>
              <div
                className={`absolute top-3 right-3 z-20 transition-all duration-300 ${
                  isSelected ? "opacity-100 scale-100" : "opacity-0 scale-50"
                }`}
              >
                <div className="bg-primary-container text-on-primary-container rounded-full p-1.5 shadow-md">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Continue Button Container */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-5 z-40">
        <button
          onClick={handleContinue}
          className="w-full py-4 bg-primary hover:bg-opacity-95 text-white rounded-full font-headline font-bold text-lg shadow-[0_8px_30px_rgba(142,78,20,0.3)] hover:brightness-115 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          Continue
          <ArrowRight className="w-5 h-5 stroke-[2]" />
        </button>
      </div>
    </div>
  );
}
