// app/stats/page.tsx
export const dynamic = "force-dynamic";

import ClusterStats from "./ClusterStats";

export default function StatsPage() {
    return <ClusterStats />;
}
