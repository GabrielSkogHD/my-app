"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

export default function ClusterStats() {
    // Static data - no complex state management
    const pi5Data = {
        hostname: "raspberrypi5",
        cpuTemp: 45.2,
        cpuUsage: [5.2, 3.1, 2.8, 4.1],
        memoryUsed: 2.45,
        memoryTotal: 7.87
    };

    const pi4Data = {
        hostname: "pi4",
        cpuTemp: 48.5,
        cpuUsage: [6.0, 5.9, 1.0, 5.9],
        memoryUsed: 2.8,
        memoryTotal: 7.87
    };

    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-foreground">Docker Swarm Cluster Stats</h1>
                    <p className="text-muted-foreground text-lg">
                        Real-time monitoring of your Raspberry Pi cluster
                    </p>
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
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}