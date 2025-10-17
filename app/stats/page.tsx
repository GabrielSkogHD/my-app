// app/stats/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import ClusterStats from "./ClusterStats";

export default function StatsPage() {
    return <ClusterStats />;
}

// Add cache-busting headers
export async function generateMetadata() {
    return {
        other: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    };
}
