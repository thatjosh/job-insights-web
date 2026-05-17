"use client";

// maplibre-gl references `window` at module load, so MapView is dynamic-
// imported with `ssr: false` to keep it out of the SSR pass.

import dynamic from "next/dynamic";
import { useState } from "react";
import type { City } from "@/types/snapshot";
import type { Selection } from "@/types/ui";
import { DEFAULT_VIEW_PRESET, VIEW_PRESETS, type ViewPreset } from "@/lib/map";
import LocationPills from "./LocationPills";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-sm text-neutral-500">
      Loading map…
    </div>
  ),
});

type Props = {
  cities: City[];
  selection: Selection;
  onCitySelect: (cityKey: string | null) => void;
};

export default function MapPanel(props: Props) {
  const [viewPreset, setViewPreset] = useState<ViewPreset>(DEFAULT_VIEW_PRESET);

  return (
    <section className="relative flex-1 overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="absolute top-3 left-3 z-10">
        <LocationPills
          presets={VIEW_PRESETS}
          activeId={viewPreset.id}
          onSelect={setViewPreset}
        />
      </div>
      <MapView {...props} viewPreset={viewPreset} />
    </section>
  );
}
