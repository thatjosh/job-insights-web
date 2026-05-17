"use client";

// Real maplibre basemap with one bubble per city. Bubble area scales with
// posting count via sqrt so a single hot city doesn't dominate the view.
// At ~400 cities this will want a deck.gl ScatterplotLayer instead of DOM
// markers; fine for now at the mock scale.

import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { Map, Marker, type MapRef } from "react-map-gl/maplibre";
import type { City } from "@/types/snapshot";
import type { Selection } from "@/types/ui";
import { MAP_STYLE, type ViewPreset } from "@/lib/map";

type Props = {
  cities: City[];
  selection: Selection;
  onCitySelect: (cityKey: string | null) => void;
  viewPreset: ViewPreset;
};

function bubbleDiameter(total: number): number {
  return 16 + Math.sqrt(total) * 8;
}

export default function MapView({
  cities,
  selection,
  onCitySelect,
  viewPreset,
}: Props) {
  const mapRef = useRef<MapRef>(null);

  // Fly to the new preset whenever the user picks one. The first run after
  // mount targets the initial preset, which is a no-op visually (map is
  // already there) but is cheap and keeps the logic in one place.
  useEffect(() => {
    mapRef.current?.flyTo({
      center: [viewPreset.longitude, viewPreset.latitude],
      zoom: viewPreset.zoom,
      duration: 800,
    });
  }, [viewPreset]);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: viewPreset.longitude,
        latitude: viewPreset.latitude,
        zoom: viewPreset.zoom,
      }}
      mapStyle={MAP_STYLE}
      style={{ width: "100%", height: "100%" }}
    >
      {cities.map((city) => {
        const selected = selection.city === city.key;
        const size = bubbleDiameter(city.total);
        return (
          <Marker
            key={city.key}
            longitude={city.lng}
            latitude={city.lat}
            anchor="center"
            onClick={(event) => {
              event.originalEvent.stopPropagation();
              onCitySelect(selected ? null : city.key);
            }}
          >
            <button
              aria-label={`${city.city} — ${city.total} postings`}
              title={`${city.city} — ${city.total}`}
              className={
                "rounded-full border-2 transition-all " +
                (selected
                  ? "border-white bg-black dark:shadow-lg"
                  : "border-white/80 bg-black/70 hover:bg-black")
              }
              style={{ width: size, height: size }}
            />
          </Marker>
        );
      })}
    </Map>
  );
}
