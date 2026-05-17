// Single source of truth for the basemap style. To swap providers later
// (MapTiler, Stadia, Protomaps, self-hosted), set NEXT_PUBLIC_MAP_STYLE_URL
// in .env.local — no component changes required.
//
// Caveat: OSM's tile policy disallows heavy production traffic on
// tile.openstreetmap.org. Fine for dev; swap before going public.

import type { StyleSpecification } from "maplibre-gl";

const OSM_RASTER_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

export const MAP_STYLE: StyleSpecification | string =
  process.env.NEXT_PUBLIC_MAP_STYLE_URL ?? OSM_RASTER_STYLE;

// Quick-zoom presets for the map. `All` fits everything; the rest centre on
// individual regions. Coordinates and zoom levels are hand-tuned for the
// current mock cities — revisit when real data lands (likely auto-fit from
// the loaded bounds).
export type ViewPreset = {
  id: string;
  label: string;
  longitude: number;
  latitude: number;
  zoom: number;
};

export const VIEW_PRESETS: ViewPreset[] = [
  { id: "all", label: "All", longitude: 20, latitude: 30, zoom: 0.8 },
  { id: "us", label: "US", longitude: -95, latitude: 39, zoom: 3.3 },
  {
    id: "london",
    label: "London",
    longitude: -0.1278,
    latitude: 51.5074,
    zoom: 8,
  },
  {
    id: "singapore",
    label: "Singapore",
    longitude: 103.8198,
    latitude: 1.3521,
    zoom: 9,
  },
];

export const DEFAULT_VIEW_PRESET = VIEW_PRESETS[0];
