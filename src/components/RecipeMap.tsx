import { useState, useEffect } from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { MapPin, ShoppingCart, Loader2 } from "lucide-react";

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  "";

const hasValidKey = Boolean(API_KEY) && API_KEY !== "YOUR_API_KEY" && API_KEY.trim().length > 10;

interface StorePlace {
  id: string;
  displayName: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
}

interface MapContentProps {
  center: google.maps.LatLngLiteral;
  recipeTitle: string;
}

function MapContent({ center, recipeTitle }: MapContentProps) {
  const map = useMap();
  const placesLib = useMapsLibrary("places");
  const [stores, setStores] = useState<StorePlace[]>([]);
  const [selectedStore, setSelectedStore] = useState<StorePlace | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!map || !placesLib) return;

    setSearching(true);
    // Move map to current location
    map.panTo(center);

    // Search for supermarkets or grocery stores nearby
    const request = {
      textQuery: "supermarket OR grocery store",
      fields: ["id", "displayName", "location", "formattedAddress"],
      locationBias: center,
      maxResultCount: 8,
    };

    placesLib.Place.searchByText(request)
      .then(({ places }) => {
        const mappedStores: StorePlace[] = (places || []).map((p) => ({
          id: p.id || Math.random().toString(),
          displayName: p.displayName || "Grocery Store",
          formattedAddress: p.formattedAddress || "",
          location: p.location ? { lat: p.location.lat(), lng: p.location.lng() } : center,
        }));
        setStores(mappedStores);
        setSearching(false);
      })
      .catch((err) => {
        console.error("Places search error:", err);
        setSearching(false);
      });
  }, [map, placesLib, center]);

  return (
    <>
      {searching && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-sm shadow-md rounded-full px-4 py-1.5 flex items-center gap-2 z-10 border border-surface-container-high">
          <Loader2 className="w-4 h-4 text-primary animate-spin" />
          <span className="text-xs font-label font-bold text-on-surface">Searching grocery stores...</span>
        </div>
      )}

      {/* User's position marker */}
      <AdvancedMarker position={center} title="Your Location">
        <Pin background="#ea4335" glyphColor="#fff" scale={1.1} />
      </AdvancedMarker>

      {/* Grocery Store markers */}
      {stores.map((store) => (
        <AdvancedMarker
          key={store.id}
          position={store.location}
          title={store.displayName}
          onClick={() => setSelectedStore(store)}
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg text-white border-2 border-white hover:scale-110 active:scale-95 transition-transform cursor-pointer">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </AdvancedMarker>
      ))}

      {/* InfoWindow for selected store */}
      {selectedStore && (
        <InfoWindow
          position={selectedStore.location}
          onCloseClick={() => setSelectedStore(null)}
        >
          <div className="p-1 max-w-[200px] text-gray-900">
            <h4 className="font-sans font-bold text-sm text-primary flex items-center gap-1.5 mb-1">
              <ShoppingCart className="w-4 h-4" /> {selectedStore.displayName}
            </h4>
            <p className="font-sans text-xs text-gray-600 leading-relaxed">
              {selectedStore.formattedAddress}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

export default function RecipeMap({ recipeTitle }: { recipeTitle: string }) {
  const [coords, setCoords] = useState<google.maps.LatLngLiteral | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Attempt to fetch browser geolocation
  useEffect(() => {
    if (!hasValidKey) {
      setLoadingLocation(false);
      return;
    }

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      // Default to San Francisco
      setCoords({ lat: 37.7749, lng: -122.4194 });
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoadingLocation(false);
      },
      (error) => {
        console.warn("Geolocation permission error/timeout:", error);
        setLocationError("Couldn't retrieve location. Defaulting to standard view.");
        // Default to San Francisco
        setCoords({ lat: 37.7749, lng: -122.4194 });
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
    );
  }, []);

  // If no Google Maps API key has been added as a secret, show a gorgeous instructions block
  if (!hasValidKey) {
    return (
      <div className="bg-surface-container-low p-5 rounded-xl border border-surface-container-highest space-y-4 shadow-sm text-on-surface">
        <div className="flex items-start gap-3">
          <div className="bg-primary/10 p-2.5 rounded-lg text-primary">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-headline font-bold text-base text-primary">Nearby Supermarkets & Markets Map</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Connect Google Maps to find actual, real-world ingredients or grocery stores near your current location!
            </p>
          </div>
        </div>

        <div className="bg-surface-container-highest/40 p-4 rounded-lg text-xs space-y-3 leading-relaxed border border-surface-container-high">
          <p className="font-bold text-on-surface">To enable the Interactive Map:</p>
          <ol className="list-decimal list-inside space-y-2 text-on-surface-variant">
            <li>
              <a
                href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-bold inline-flex items-center gap-1"
              >
                Get a free Google Maps API Key
              </a>
            </li>
            <li>
              Open <strong className="text-on-surface font-semibold">Settings</strong> (⚙️ gear icon, top-right corner of AI Studio)
            </li>
            <li>
              Select <strong className="text-on-surface font-semibold">Secrets</strong>
            </li>
            <li>
              Type <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-primary font-mono font-bold">GOOGLE_MAPS_PLATFORM_KEY</code>, press Enter
            </li>
            <li>Paste your key and press Enter. The app will automatically rebuild.</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low rounded-xl border border-surface-container shadow-sm overflow-hidden text-on-surface">
      <div className="p-4 border-b border-surface-container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <h4 className="font-headline font-bold text-sm text-primary">Markets Nearby</h4>
        </div>
        {locationError ? (
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
            Default View
          </span>
        ) : (
          <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
            Live Location
          </span>
        )}
      </div>

      <div className="relative w-full h-[280px] bg-surface-container-high">
        {loadingLocation ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-on-surface-variant">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <span className="font-label text-xs font-bold">Acquiring Geolocation...</span>
          </div>
        ) : (
          coords && (
            <APIProvider apiKey={API_KEY} version="weekly">
              <Map
                defaultCenter={coords}
                defaultZoom={13}
                mapId="DEMO_MAP_ID"
                disableDefaultUI={true}
                zoomControl={true}
                internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                style={{ width: "100%", height: "100%" }}
              >
                <MapContent center={coords} recipeTitle={recipeTitle} />
              </Map>
            </APIProvider>
          )
        )}
      </div>
    </div>
  );
}
