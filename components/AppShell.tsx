"use client";

// Owns selection + active-tab state. Picking a new ancestor clears its
// descendants (new city → clears company and job; new company → clears job).

import { useState } from "react";
import type { Snapshot } from "@/types/snapshot";
import type { ActiveTab, Selection } from "@/types/ui";
import MapPanel from "./MapPanel";
import SidePanel from "./SidePanel";

type Props = { snapshot: Snapshot };

const EMPTY: Selection = { city: null, company: null, job: null };

export default function AppShell({ snapshot }: Props) {
  const [selection, setSelection] = useState<Selection>(EMPTY);
  const [activeTab, setActiveTab] = useState<ActiveTab>("companies");

  const selectCity = (cityKey: string | null) => {
    setSelection({ city: cityKey, company: null, job: null });
    setActiveTab("companies");
  };

  const selectCompany = (companySlug: string) => {
    setSelection((prev) => ({
      city: prev.city,
      company: companySlug,
      job: null,
    }));
    setActiveTab("company");
  };

  const selectJob = (jobId: string) => {
    // Jobs are only openable from CompanyView, so prev.company is already
    // set correctly — no need to re-derive it from the job.
    setSelection((prev) => ({ ...prev, job: jobId }));
    setActiveTab("job");
  };

  return (
    <div className="flex h-screen w-full gap-4 bg-white p-4 dark:bg-neutral-950">
      <MapPanel
        cities={snapshot.cities}
        selection={selection}
        onCitySelect={selectCity}
      />
      <SidePanel
        snapshot={snapshot}
        selection={selection}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCompanySelect={selectCompany}
        onJobSelect={selectJob}
        onClearCity={() => selectCity(null)}
      />
    </div>
  );
}
