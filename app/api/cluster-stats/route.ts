// app/api/cluster-stats/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server';
import { getSystemDetails } from '../../system';

interface ClusterNode {
    hostname: string;
    systemInfo: any;
    timestamp: number;
}

export async function GET() {
    try {
        // Get current node info
        const currentSystemInfo = await getSystemDetails();
        
        // Create cluster node data
        const clusterNode: ClusterNode = {
            hostname: currentSystemInfo.os.hostname,
            systemInfo: currentSystemInfo,
            timestamp: Date.now()
        };

        // For now, we'll simulate data from the other node
        // In a real implementation, you might want to make HTTP calls to other nodes
        // or use Docker Swarm API to get node information
        
        const clusterData = {
            nodes: [clusterNode],
            totalNodes: 2, // We know we have 2 nodes
            lastUpdated: Date.now()
        };

        return new NextResponse(JSON.stringify(clusterData), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
                'Pragma': 'no-cache',
                'CDN-Cache-Control': 'no-store',
                'Vercel-CDN-Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error('Error fetching cluster stats:', error);
        return NextResponse.json({ error: 'Failed to fetch cluster stats' }, { status: 500 });
    }
}
