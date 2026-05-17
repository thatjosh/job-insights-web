// Apply button links out — descriptions aren't bundled client-side.

import type { Snapshot } from "@/types/snapshot";
import { findCompany, findJob } from "@/lib/data";

type Props = { snapshot: Snapshot; jobId: string };

export default function JobView({ snapshot, jobId }: Props) {
  // SidePanel only mounts JobView when selection.job points to a real job,
  // so this lookup can't miss.
  const job = findJob(snapshot, jobId)!;
  // company *can* miss if a job's slug isn't in the companies list (a real
  // data-integrity drift the pipeline could produce); fall back to the slug.
  const company = findCompany(snapshot, job.company);

  return (
    <div className="p-4">
      <h2 className="text-base font-medium text-neutral-900 dark:text-neutral-100">
        {job.title}
      </h2>
      <div className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
        {company?.name ?? job.company}
      </div>
      <dl className="mt-4 grid grid-cols-[8ch_1fr] gap-y-1 text-sm">
        <dt className="text-neutral-500 dark:text-neutral-400">City</dt>
        <dd className="text-neutral-800 dark:text-neutral-200">
          {job.city ?? "Remote"}
        </dd>
        <dt className="text-neutral-500 dark:text-neutral-400">Team</dt>
        <dd className="text-neutral-800 dark:text-neutral-200">
          {job.team ?? "—"}
        </dd>
        <dt className="text-neutral-500 dark:text-neutral-400">Posted</dt>
        <dd className="text-neutral-800 dark:text-neutral-200">
          {job.posted_at}
        </dd>
        <dt className="text-neutral-500 dark:text-neutral-400">Remote</dt>
        <dd className="text-neutral-800 dark:text-neutral-200">
          {job.is_remote ? "Yes" : "No"}
        </dd>
      </dl>
      <a
        href={job.apply_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-block rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
      >
        Apply
      </a>
    </div>
  );
}
