import type { Snapshot } from "@/types/snapshot";
import type { ActiveTab, Selection } from "@/types/ui";
import Hud from "./Hud";
import TabBar from "./TabBar";
import CompanyList from "./CompanyList";
import CompanyView from "./CompanyView";
import JobView from "./JobView";

type Props = {
  snapshot: Snapshot;
  selection: Selection;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onCompanySelect: (slug: string) => void;
  onJobSelect: (id: string) => void;
  onClearCity: () => void;
};

export default function SidePanel({
  snapshot,
  selection,
  activeTab,
  onTabChange,
  onCompanySelect,
  onJobSelect,
  onClearCity,
}: Props) {
  const enabled = {
    companies: true,
    company: selection.company !== null,
    job: selection.job !== null,
  };

  return (
    <aside className="flex w-[36ch] shrink-0 flex-col overflow-hidden rounded-2xl bg-white dark:bg-neutral-900">
      <Hud meta={snapshot.meta} />
      <TabBar active={activeTab} enabled={enabled} onChange={onTabChange} />
      <div className="flex-1 overflow-y-auto">
        {activeTab === "companies" && (
          <CompanyList
            snapshot={snapshot}
            cityKey={selection.city}
            onCompanySelect={onCompanySelect}
            onClearCity={onClearCity}
          />
        )}
        {activeTab === "company" && selection.company && (
          <CompanyView
            snapshot={snapshot}
            companySlug={selection.company}
            onJobSelect={onJobSelect}
          />
        )}
        {activeTab === "job" && selection.job && (
          <JobView snapshot={snapshot} jobId={selection.job} />
        )}
      </div>
    </aside>
  );
}
