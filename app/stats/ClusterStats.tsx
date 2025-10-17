"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

export default function ClusterStats() {
    // Simple static data for Raspberry Pi 5
    const systemInfo = {
        hostname: "raspberrypi5",
        platform: "linux",
        architecture: "arm64",
        cpuTemp: 45.2,
        cpuUsage: [5.2, 3.1, 2.8, 4.1],
        memoryUsed: 2.45,
        memoryTotal: 7.87
    };

    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4 text-foreground">Raspberry Pi</h1>
                    <button 
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Uppdatera manuellt
                    </button>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>System Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Hostname:</span>
                                <span className="text-foreground font-medium">{systemInfo.hostname}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Platform:</span>
                                <span className="text-foreground font-medium">{systemInfo.platform}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Architecture:</span>
                                <span className="text-foreground font-medium">{systemInfo.architecture}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">CPU Temperature:</span>
                                <span className="text-foreground font-medium">{systemInfo.cpuTemp.toFixed(1)}°C</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
                            {systemInfo.cpuUsage.map((usage: number, index: number) => (
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
                                <span>{systemInfo.memoryUsed.toFixed(2)} / {systemInfo.memoryTotal.toFixed(2)} GB</span>
                            </div>
                            <Progress
                                value={(systemInfo.memoryUsed / systemInfo.memoryTotal) * 100}
                                className="h-2"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}