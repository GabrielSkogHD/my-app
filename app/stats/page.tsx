// app/stats/page.tsx
export const dynamic = "force-dynamic";

import DynamicStats from "./DynamicStats";

export default function StatsPage() {
    return <DynamicStats />;
}
