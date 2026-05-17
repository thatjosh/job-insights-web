// Types mirror the JSON contract in ../job-insights/docs/website-plan.md §8.
// The pipeline writes four files (meta.json, cities.json, companies.json,
// jobs.json) into public/data/. Snapshot bundles them in memory so the
// rest of the app passes one object around instead of four.

export type Meta = {
  date: string; // YYYY-MM-DD
  totals: {
    companies: number;
    jobs: number;
    cities: number;
    off_map: number;
  };
};

export type City = {
  key: string; // stable identifier, e.g. "san-francisco-ca-us"
  city: string;
  state: string | null;
  country: string; // ISO2
  lat: number;
  lng: number;
  total: number;
  by_company: Record<string, number>; // company slug -> count
};

export type Company = {
  slug: string;
  name: string;
  total: number;
  by_country: Record<string, number>; // ISO2 -> count
  top_cities: { city: string; count: number }[];
  remote_ratio: number; // 0..1
};

export type Job = {
  id: string;
  company: string; // company slug
  title: string;
  city: string | null;
  country: string | null; // ISO2
  is_remote: boolean;
  team: string | null;
  posted_at: string; // ISO date
  apply_url: string;
};

export type Snapshot = {
  meta: Meta;
  cities: City[];
  companies: Company[];
  jobs: Job[];
};
