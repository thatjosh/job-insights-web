// Single entry point for snapshot data. Components import from here, not
// from mock-data directly — when the real JSON lands in public/data/, only
// this file changes. The find/filter helpers exist so components don't
// re-encode the "slug is the key for companies, id for jobs, key for
// cities" mapping in five different places.

import { MOCK_SNAPSHOT } from "@/lib/mock-data";
import type { City, Company, Job, Snapshot } from "@/types/snapshot";

export function loadSnapshot(): Snapshot {
  return MOCK_SNAPSHOT;
}

export function findCompany(
  snapshot: Snapshot,
  slug: string,
): Company | undefined {
  return snapshot.companies.find((c) => c.slug === slug);
}

export function findJob(snapshot: Snapshot, id: string): Job | undefined {
  return snapshot.jobs.find((j) => j.id === id);
}

export function findCity(snapshot: Snapshot, key: string): City | undefined {
  return snapshot.cities.find((c) => c.key === key);
}

export function jobsForCompany(snapshot: Snapshot, slug: string): Job[] {
  return snapshot.jobs.filter((j) => j.company === slug);
}
