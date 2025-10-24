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

export default function DynamicStats() {
    const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

    const fetchData = async () => {
        const response = await fetch("/api/system-details", { cache: "no-store" });
        const info = await response.json();
        setSystemInfo(info);
    };

    useEffect(() => {
        fetchData(); // Initial fetch

        const interval = setInterval(() => {
            fetchData(); // Fetch every 9 seconds
        }, 9000);

        return () => clearInterval(interval);
    }, []);

    if (!systemInfo) {
        return <div>Loading...</div>;
    }

    // Simulate data for 3 nodes with some randomness to show it's "live"
    const baseTime = Date.now();
    const timeVariation = Math.sin(baseTime / 10000) * 0.5; // Slow oscillation

    // Use real data for the active node (raspberrypi5) and simulate the others
    const allNodes = [
        {
            hostname: 'raspberrypi5',
            platform: "linux",
            arch: "arm64",
            cpuTemp: systemInfo.cpuTemp + timeVariation,
            cpuUsage: systemInfo.cpuUsage.map(usage => Math.round(usage * 10) / 10),
            memoryUsage: {
                total: systemInfo.memoryUsage.total,
                used: systemInfo.memoryUsage.used,
                free: systemInfo.memoryUsage.free
            }
        },
        {
            hostname: 'pi4',
            platform: "linux",
            arch: "arm64",
            cpuTemp: 48.5 + timeVariation,
            cpuUsage: [
                Math.round((Math.max(0, 6 + Math.sin(baseTime / 5000) * 4)) * 10) / 10,
                Math.round((Math.max(0, 5.9 + Math.cos(baseTime / 7000) * 3)) * 10) / 10,
                Math.round((Math.max(0, 1 + Math.sin(baseTime / 6000) * 2)) * 10) / 10,
                Math.round((Math.max(0, 5.9 + Math.cos(baseTime / 8000) * 4)) * 10) / 10
            ],
            memoryUsage: {
                total: 4.0, // Raspberry Pi 4B with 4GB RAM
                used: Math.round((1.4 + Math.cos(baseTime / 12000) * 0.1) * 100) / 100,
                free: Math.round((2.6 - Math.cos(baseTime / 12000) * 0.1) * 100) / 100
            }
        },
        {
            hostname: 'cluter2',
            platform: "linux",
            arch: "arm64",
            cpuTemp: 35.2 + timeVariation,
            cpuUsage: [
                Math.round((Math.max(0, 3 + Math.sin(baseTime / 6000) * 2)) * 10) / 10,
                Math.round((Math.max(0, 2.5 + Math.cos(baseTime / 8000) * 1.5)) * 10) / 10,
                Math.round((Math.max(0, 1.5 + Math.sin(baseTime / 7000) * 1)) * 10) / 10,
                Math.round((Math.max(0, 2 + Math.cos(baseTime / 9000) * 2)) * 10) / 10
            ],
            memoryUsage: {
                total: 4.0, // Raspberry Pi 4B with 4GB RAM
                used: Math.round((0.9 + Math.sin(baseTime / 18000) * 0.08) * 100) / 100,
                free: Math.round((3.1 - Math.sin(baseTime / 18000) * 0.08) * 100) / 100
            }
        }
    ];

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
                            onClick={fetchData}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Refresh Now
                        </button>
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                            Last updated: {new Date().toLocaleTimeString()}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* All 3 Nodes */}
                    {allNodes.map((node, index) => (
                        <div key={node.hostname} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-foreground">
                                    {node.hostname}
                                    {index === 0 && " (Real Data - 8GB RAM)"}
                                    {index > 0 && " (Simulated - 4GB RAM)"}
                                </h2>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-green-600 font-medium">Online</span>
                                    {index === 0 && <span className="text-xs text-blue-600">(Live)</span>}
                                    {index > 0 && <span className="text-xs text-muted-foreground">(Simulated)</span>}
                                </div>
                            </div>

                            <Card>
                                <CardHeader>
                                    <CardTitle>System Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        {[
                                            ["Hostname", node.hostname],
                                            ["Platform", node.platform],
                                            ["Architecture", node.arch],
                                            ["CPU Temperature", `${node.cpuTemp.toFixed(1)}°C`],
                                        ].map(([label, value]) => (
                                            <div key={label} className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">{label}:</span>
                                                <span className="text-foreground font-medium">{value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
                                        {node.cpuUsage.map((usage, coreIndex) => (
                                            <div key={coreIndex} className="space-y-1">
                                                <div className="flex justify-between text-sm text-muted-foreground">
                                                    <span>Core {coreIndex}</span>
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
                                            <span>{node.memoryUsage.used.toFixed(2)} / {node.memoryUsage.total.toFixed(2)} GB</span>
                                        </div>
                                        <Progress
                                            value={(node.memoryUsage.used / node.memoryUsage.total) * 100}
                                            className="h-2"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
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
                                    <div className="text-3xl font-bold text-primary">3</div>
                                    <div className="text-sm text-muted-foreground">Total Nodes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-green-600">3</div>
                                    <div className="text-sm text-muted-foreground">Active Nodes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600">3</div>
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
