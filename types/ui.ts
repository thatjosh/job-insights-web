// Internal UI state types. Selection captures the drill-down through the
// panel tabs; picking a new ancestor clears its descendants (see AppShell).

export type ActiveTab = "companies" | "company" | "job";

export type Selection = {
  city: string | null; // city.key
  company: string | null; // company.slug
  job: string | null; // job.id
};
