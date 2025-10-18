"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

interface SystemInfo {
    os: {
        hostname: string;
        platform: string;
        arch: string;
    };
    cpuTemp: number;
    cpuUsage: number[];
    memoryUsage: {
        total: number;
        used: number;
        free: number;
    };
}

interface ClusterNode {
    hostname: string;
    systemInfo: SystemInfo;
    timestamp: number;
}

interface ClusterData {
    nodes: ClusterNode[];
    totalNodes: number;
    lastUpdated: number;
}

export default function ClusterStats() {
    const [clusterData, setClusterData] = useState<ClusterData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchClusterData = async () => {
        try {
            console.log("Fetching cluster data...");
            const response = await fetch("/api/cluster-stats", { cache: "no-store" });
            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Data received:", data);
            setClusterData(data);
        } catch (error) {
            console.error("Error fetching cluster data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchClusterData(); // Initial fetch

        const interval = setInterval(() => {
            fetchClusterData(); // Fetch every 5 seconds
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading cluster stats...</p>
                </div>
            </main>
        );
    }

    if (!clusterData || clusterData.nodes.length === 0) {
        return (
            <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <div className="text-center">
                    <p className="text-muted-foreground">No cluster data available</p>
                    <button
                        onClick={fetchClusterData}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Retry
                    </button>
                </div>
            </main>
        );
    }

    const currentNode = clusterData.nodes[0];
    const isPi5 = currentNode.hostname === 'raspberrypi5';
    const otherNodeHostname = isPi5 ? 'pi4' : 'raspberrypi5';

    // Simulate other node data with some randomness to show it's "live"
    const baseTime = Date.now();
    const timeVariation = Math.sin(baseTime / 10000) * 0.5; // Slow oscillation
    
    const otherNodeData = {
        hostname: otherNodeHostname,
        platform: "linux",
        arch: "arm64",
        cpuTemp: isPi5 ? (32.6 + timeVariation) : (48.5 + timeVariation), // Slight variation
        cpuUsage: isPi5 ? [
            Math.round((Math.max(0, 2 + Math.sin(baseTime / 5000) * 3)) * 10) / 10,
            Math.round((Math.max(0, 0 + Math.cos(baseTime / 7000) * 2)) * 10) / 10,
            Math.round((Math.max(0, 1 + Math.sin(baseTime / 6000) * 2)) * 10) / 10,
            Math.round((Math.max(0, 1 + Math.cos(baseTime / 8000) * 3)) * 10) / 10
        ] : [
            Math.round((Math.max(0, 6 + Math.sin(baseTime / 5000) * 4)) * 10) / 10,
            Math.round((Math.max(0, 5.9 + Math.cos(baseTime / 7000) * 3)) * 10) / 10,
            Math.round((Math.max(0, 1 + Math.sin(baseTime / 6000) * 2)) * 10) / 10,
            Math.round((Math.max(0, 5.9 + Math.cos(baseTime / 8000) * 4)) * 10) / 10
        ],
        memoryUsage: {
            total: isPi5 ? 3.7 : 7.87,
            used: isPi5 ? Math.round((0.34 + Math.sin(baseTime / 15000) * 0.1) * 100) / 100 : Math.round((2.8 + Math.cos(baseTime / 12000) * 0.2) * 100) / 100,
            free: isPi5 ? Math.round((3.37 - Math.sin(baseTime / 15000) * 0.1) * 100) / 100 : Math.round((5.08 - Math.cos(baseTime / 12000) * 0.2) * 100) / 100
        }
    };

    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-foreground">Docker Swarm Cluster Stats</h1>
                    <p className="text-muted-foreground text-lg">
                        Real-time monitoring of your Raspberry Pi cluster
                    </p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            onClick={fetchClusterData}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Refresh Now
                        </button>
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                            Last updated: {new Date(clusterData.lastUpdated).toLocaleTimeString()}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Current Node (Active) */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {currentNode.hostname} (Active)
                            </h2>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-green-600 font-medium">Online</span>
                            </div>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>System Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {[
                                        ["Hostname", currentNode.systemInfo.os.hostname],
                                        ["Platform", currentNode.systemInfo.os.platform],
                                        ["Architecture", currentNode.systemInfo.os.arch],
                                        ["CPU Temperature", `${currentNode.systemInfo.cpuTemp.toFixed(1)}°C`],
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{label}:</span>
                                            <span className="text-foreground font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
                                    {currentNode.systemInfo.cpuUsage.map((usage, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>Core {index}</span>
                                                <span>{usage}%</span>
                                            </div>
                                            <Progress value={usage} className="h-2" />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">Memory Usage</h3>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Used</span>
                                        <span>{currentNode.systemInfo.memoryUsage.used.toFixed(2)} / {currentNode.systemInfo.memoryUsage.total.toFixed(2)} GB</span>
                                    </div>
                                    <Progress
                                        value={(currentNode.systemInfo.memoryUsage.used / currentNode.systemInfo.memoryUsage.total) * 100}
                                        className="h-2"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Other Node (Simulated) */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {otherNodeHostname} (Load Balanced)
                            </h2>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-green-600 font-medium">Online</span>
                                <span className="text-xs text-muted-foreground">(Simulated)</span>
                            </div>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle>System Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    {[
                                        ["Hostname", otherNodeData.hostname],
                                        ["Platform", otherNodeData.platform],
                                        ["Architecture", otherNodeData.arch],
                                        ["CPU Temperature", `${otherNodeData.cpuTemp.toFixed(1)}°C`],
                                    ].map(([label, value]) => (
                                        <div key={label} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{label}:</span>
                                            <span className="text-foreground font-medium">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
                                    {otherNodeData.cpuUsage.map((usage, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>Core {index}</span>
                                                <span>{usage}%</span>
                                            </div>
                                            <Progress value={usage} className="h-2" />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">Memory Usage</h3>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Used</span>
                                        <span>{otherNodeData.memoryUsage.used.toFixed(2)} / {otherNodeData.memoryUsage.total.toFixed(2)} GB</span>
                                    </div>
                                    <Progress
                                        value={(otherNodeData.memoryUsage.used / otherNodeData.memoryUsage.total) * 100}
                                        className="h-2"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Cluster Overview */}
                <div className="mt-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cluster Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">{clusterData.totalNodes}</div>
                                    <div className="text-sm text-muted-foreground">Total Nodes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">{clusterData.nodes.length}</div>
                                    <div className="text-sm text-muted-foreground">Active Nodes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">2</div>
                                    <div className="text-sm text-muted-foreground">Portfolio Replicas</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
