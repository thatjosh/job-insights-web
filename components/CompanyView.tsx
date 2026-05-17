import type { Snapshot } from "@/types/snapshot";
import { findCompany, jobsForCompany } from "@/lib/data";

type Props = {
  snapshot: Snapshot;
  companySlug: string;
  onJobSelect: (id: string) => void;
};

export default function CompanyView({
  snapshot,
  companySlug,
  onJobSelect,
}: Props) {
  // SidePanel only mounts CompanyView when selection.company points to a real
  // company in the snapshot, so the lookup can't miss.
  const company = findCompany(snapshot, companySlug)!;
  const jobs = jobsForCompany(snapshot, companySlug);
  const remotePct = Math.round(company.remote_ratio * 100);

  return (
    <div className="p-4">
      <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
        {company.name}
      </h2>
      <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
        {company.total} jobs · {remotePct}% remote
      </div>

      {company.top_cities.length > 0 && (
        <section className="mt-4">
          <h3 className="text-xs tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
            Cities
          </h3>
          <ul className="mt-2 space-y-1">
            {company.top_cities.map((entry) => (
              <li key={entry.city} className="flex justify-between text-sm">
                <span className="text-neutral-800 dark:text-neutral-200">
                  {entry.city}
                </span>
                <span className="text-neutral-600 tabular-nums dark:text-neutral-400">
                  {entry.count}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-5">
        <h3 className="text-xs tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
          Open roles
        </h3>
        <ul className="mt-2 divide-y divide-neutral-200 dark:divide-neutral-800">
          {jobs.map((job) => (
            <li key={job.id}>
              <button
                onClick={() => onJobSelect(job.id)}
                className="w-full py-2 text-left hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                <div className="text-sm text-neutral-900 dark:text-neutral-100">
                  {job.title}
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  {job.city ?? "Remote"} · {job.team ?? "—"}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
