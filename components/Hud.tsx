import type { Meta } from "@/types/snapshot";

type Props = { meta: Meta };

export default function Hud({ meta }: Props) {
  const { date, totals } = meta;
  return (
    <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
      <div className="text-xs tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
        {date}
      </div>
      <div className="text-sm text-neutral-800 dark:text-neutral-200">
        {totals.companies} companies · {totals.jobs.toLocaleString()} jobs ·{" "}
        {totals.cities} cities
        {totals.off_map > 0
          ? ` · ${totals.off_map.toLocaleString()} off-map`
          : ""}
      </div>
    </div>
  );
}
