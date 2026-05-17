// Three tabs acting as breadcrumbs through the drill-down. A tab stays
// disabled until its prerequisite is selected (Company needs a company,
// Job needs a job).

import type { ActiveTab } from "@/types/ui";

type Props = {
  active: ActiveTab;
  enabled: Record<ActiveTab, boolean>;
  onChange: (tab: ActiveTab) => void;
};

const TABS: { key: ActiveTab; label: string }[] = [
  { key: "companies", label: "Companies" },
  { key: "company", label: "Company" },
  { key: "job", label: "Job" },
];

export default function TabBar({ active, enabled, onChange }: Props) {
  return (
    <div
      role="tablist"
      className="flex border-b border-neutral-200 dark:border-neutral-800"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        const isEnabled = enabled[tab.key];
        return (
          <button
            key={tab.key}
            role="tab"
            aria-selected={isActive}
            disabled={!isEnabled}
            onClick={() => onChange(tab.key)}
            className={
              "flex-1 px-3 py-2 text-sm transition-colors " +
              (isActive
                ? "border-b-2 border-black font-medium text-neutral-900 dark:border-white dark:text-neutral-100"
                : isEnabled
                  ? "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  : "cursor-not-allowed text-neutral-300 dark:text-neutral-600")
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
