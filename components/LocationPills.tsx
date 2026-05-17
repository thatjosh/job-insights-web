// Pill-shaped segmented control for quick map zooms. Clicking a pill flies
// the map to the matching preset; the selected pill stays highlighted until
// another is picked. Doesn't touch the snapshot Selection — purely a map
// navigation aid.

import type { ViewPreset } from "@/lib/map";

type Props = {
  presets: ViewPreset[];
  activeId: string;
  onSelect: (preset: ViewPreset) => void;
};

export default function LocationPills({ presets, activeId, onSelect }: Props) {
  return (
    <div className="flex gap-0.5 rounded-full border border-neutral-200 bg-white/95 p-1 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95 dark:shadow-sm">
      {presets.map((preset) => {
        const active = preset.id === activeId;
        return (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            className={
              "rounded-full px-3 py-1 text-xs transition-colors " +
              (active
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100")
            }
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}
