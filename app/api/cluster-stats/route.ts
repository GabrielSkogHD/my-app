import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Simulate cluster data for 3 nodes
        const clusterData = {
            nodes: [
                {
                    hostname: 'raspberrypi5',
                    systemInfo: {
                        os: {
                            hostname: 'raspberrypi5',
                            platform: 'linux',
                            arch: 'arm64'
                        },
                        cpuTemp: 32.6,
                        cpuUsage: [2.1, 0.8, 1.2, 1.5],
                        memoryUsage: {
                            total: 3.7,
                            used: 0.34,
                            free: 3.37
                        }
                    },
                    timestamp: Date.now()
                },
                {
                    hostname: 'pi4',
                    systemInfo: {
                        os: {
                            hostname: 'pi4',
                            platform: 'linux',
                            arch: 'arm64'
                        },
                        cpuTemp: 48.5,
                        cpuUsage: [6.2, 5.9, 1.1, 5.9],
                        memoryUsage: {
                            total: 7.87,
                            used: 2.8,
                            free: 5.08
                        }
                    },
                    timestamp: Date.now()
                },
                {
                    hostname: 'cluter2',
                    systemInfo: {
                        os: {
                            hostname: 'cluter2',
                            platform: 'linux',
                            arch: 'arm64'
                        },
                        cpuTemp: 35.2,
                        cpuUsage: [3.1, 2.5, 1.5, 2.0],
                        memoryUsage: {
                            total: 7.87,
                            used: 1.8,
                            free: 6.07
                        }
                    },
                    timestamp: Date.now()
                }
            ],
            totalNodes: 3,
            lastUpdated: Date.now()
        };

        return NextResponse.json(clusterData);
    } catch (error) {
        console.error('Error fetching cluster data:', error);
        return NextResponse.json({ error: 'Failed to fetch cluster data' }, { status: 500 });
    }
}
