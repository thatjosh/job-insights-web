import AppShell from "@/components/AppShell";
import { loadSnapshot } from "@/lib/data";

export default function Home() {
  return <AppShell snapshot={loadSnapshot()} />;
}
