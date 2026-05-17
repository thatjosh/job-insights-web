import type { Snapshot } from "@/types/snapshot";
import { findCity } from "@/lib/data";
import CompanyLogo from "./CompanyLogo";

// Filters to companies hiring in the currently selected city when one is
// picked on the map.

type Props = {
  snapshot: Snapshot;
  cityKey: string | null;
  onCompanySelect: (slug: string) => void;
  onClearCity: () => void;
};

export default function CompanyList({
  snapshot,
  cityKey,
  onCompanySelect,
  onClearCity,
}: Props) {
  const city = cityKey ? findCity(snapshot, cityKey) : null;
  const companies = city
    ? snapshot.companies.filter((c) => (city.by_company[c.slug] ?? 0) > 0)
    : snapshot.companies;

  return (
    <div className="p-4">
      {city && (
        <div className="mb-3 flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400">
          <span>
            Filtered to{" "}
            <strong className="text-neutral-900 dark:text-neutral-100">
              {city.city}
            </strong>
          </span>
          <button
            onClick={onClearCity}
            className="underline hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            clear
          </button>
        </div>
      )}
      <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {companies.map((company) => {
          const topCity = company.top_cities[0]?.city ?? "—";
          const remotePct = Math.round(company.remote_ratio * 100);
          const total = city
            ? (city.by_company[company.slug] ?? 0)
            : company.total;
          return (
            <li key={company.slug}>
              <button
                onClick={() => onCompanySelect(company.slug)}
                className="w-full py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                <div className="flex items-center gap-3">
                  <CompanyLogo
                    slug={company.slug}
                    name={company.name}
                    size={36}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">
                        {company.name}
                      </span>
                      <span className="text-sm text-neutral-600 tabular-nums dark:text-neutral-400">
                        {total}
                      </span>
                    </div>
                    <div className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                      Top city: {topCity} · {remotePct}% remote
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
