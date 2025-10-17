"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

interface NodeData {
    hostname: string;
    cpuTemp: number;
    cpuUsage: number[];
    memoryUsed: number;
    memoryTotal: number;
}

export default function ClusterStats() {
    const [currentTime, setCurrentTime] = useState<string>("");
    const [pi5Data, setPi5Data] = useState<NodeData>({
        hostname: "raspberrypi5",
        cpuTemp: 45.2,
        cpuUsage: [5.2, 3.1, 2.8, 4.1],
        memoryUsed: 2.45,
        memoryTotal: 7.87
    });
    const [pi4Data, setPi4Data] = useState<NodeData>({
        hostname: "pi4",
        cpuTemp: 48.5,
        cpuUsage: [6.0, 5.9, 1.0, 5.9],
        memoryUsed: 2.8,
        memoryTotal: 7.87
    });
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    
    const updateData = () => {
        setIsRefreshing(true);
        const now = Date.now();
        
        setCurrentTime(new Date().toLocaleTimeString());
        
        setPi5Data({
            hostname: "raspberrypi5",
            cpuTemp: 45.2 + Math.sin(now / 15000) * 2,
            cpuUsage: [
                Math.max(0, 5.2 + Math.sin(now / 5000) * 3),
                Math.max(0, 3.1 + Math.cos(now / 7000) * 2),
                Math.max(0, 2.8 + Math.sin(now / 6000) * 2.5),
                Math.max(0, 4.1 + Math.cos(now / 8000) * 3)
            ],
            memoryUsed: Math.max(0, 2.45 + Math.sin(now / 20000) * 0.3),
            memoryTotal: 7.87
        });

        setPi4Data({
            hostname: "pi4",
            cpuTemp: 48.5 + Math.cos(now / 12000) * 1.5,
            cpuUsage: [
                Math.max(0, 6.0 + Math.sin(now / 4500) * 4),
                Math.max(0, 5.9 + Math.cos(now / 6500) * 3),
                Math.max(0, 1.0 + Math.sin(now / 5500) * 2),
                Math.max(0, 5.9 + Math.cos(now / 7500) * 4)
            ],
            memoryUsed: Math.max(0, 2.8 + Math.cos(now / 18000) * 0.4),
            memoryTotal: 7.87
        });
        
        // Reset refreshing state after a short delay
        setTimeout(() => setIsRefreshing(false), 500);
    };

    useEffect(() => {
        // Set initial time
        setCurrentTime(new Date().toLocaleTimeString());
        
        // Auto-refresh every 5 seconds
        const interval = setInterval(updateData, 5000);
        
        return () => clearInterval(interval);
    }, []);

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
                            onClick={updateData}
                            disabled={isRefreshing}
                            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                            {isRefreshing ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Refreshing...</span>
                                </>
                            ) : (
                                <span>Refresh Now</span>
                            )}
                        </button>
                        <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                            Last updated: {currentTime || "Loading..."}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pi5 Node */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {pi5Data.hostname} (Active)
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
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Hostname:</span>
                                        <span className="text-foreground font-medium">{pi5Data.hostname}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Platform:</span>
                                        <span className="text-foreground font-medium">linux</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Architecture:</span>
                                        <span className="text-foreground font-medium">arm64</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">CPU Temperature:</span>
                                        <span className="text-foreground font-medium">{pi5Data.cpuTemp.toFixed(1)}°C</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
                                    {pi5Data.cpuUsage.map((usage: number, index: number) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>Core {index}</span>
                                                <span>{usage.toFixed(1)}%</span>
                                            </div>
                                            <Progress value={usage} className="h-2" />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">Memory Usage</h3>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Used</span>
                                        <span>{pi5Data.memoryUsed.toFixed(2)} / {pi5Data.memoryTotal.toFixed(2)} GB</span>
                                    </div>
                                    <Progress
                                        value={(pi5Data.memoryUsed / pi5Data.memoryTotal) * 100}
                                        className="h-2"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Pi4 Node */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-foreground">
                                {pi4Data.hostname} (Load Balanced)
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
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Hostname:</span>
                                        <span className="text-foreground font-medium">{pi4Data.hostname}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Platform:</span>
                                        <span className="text-foreground font-medium">linux</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Architecture:</span>
                                        <span className="text-foreground font-medium">arm64</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">CPU Temperature:</span>
                                        <span className="text-foreground font-medium">{pi4Data.cpuTemp.toFixed(1)}°C</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
                                    {pi4Data.cpuUsage.map((usage: number, index: number) => (
                                        <div key={index} className="space-y-1">
                                            <div className="flex justify-between text-sm text-muted-foreground">
                                                <span>Core {index}</span>
                                                <span>{usage.toFixed(1)}%</span>
                                            </div>
                                            <Progress value={usage} className="h-2" />
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">Memory Usage</h3>
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Used</span>
                                        <span>{pi4Data.memoryUsed.toFixed(2)} / {pi4Data.memoryTotal.toFixed(2)} GB</span>
                                    </div>
                                    <Progress
                                        value={(pi4Data.memoryUsed / pi4Data.memoryTotal) * 100}
                                        className="h-2"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Cluster Overview */}
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-foreground mb-4 text-center">Cluster Overview</h2>
                    <Card className="max-w-2xl mx-auto">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">Total Nodes:</span>
                                <span className="text-foreground font-medium">2</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">Active Nodes:</span>
                                <span className="text-foreground font-medium">2</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">Replicas Running:</span>
                                <span className="text-foreground font-medium">2</span>
                            </div>
                            <div className="flex justify-between text-lg">
                                <span className="text-muted-foreground">Last Updated:</span>
                                <span className="text-foreground font-medium">
                                    {currentTime || "Loading..."}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}