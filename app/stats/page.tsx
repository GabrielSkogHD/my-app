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

export default function Stats() {
    const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/system-details");
            const info = await response.json();
            setSystemInfo(info);
        };

        fetchData(); // Initial fetch

        const interval = setInterval(() => {
            fetchData(); // Fetch every 3 seconds
        }, 3000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    if (!systemInfo) {
        return <div>Loading...</div>; // Show loading while data is being fetched
    }

    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold mb-6 text-foreground">Raspberry Pi</h1>

            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>System Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        {[
                            ["Hostname", systemInfo.os.hostname],
                            ["Platform", systemInfo.os.platform],
                            ["Architecture", systemInfo.os.arch],
                            ["CPU Temperature", `${systemInfo.cpuTemp.toFixed(1)}°C`],
                        ].map(([label, value]) => (
                            <div key={label} className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{label}:</span>
                                <span className="text-foreground font-medium">{value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
                        {systemInfo.cpuUsage.map((usage, index) => (
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
                            <span>{systemInfo.memoryUsage.used.toFixed(2)} / {systemInfo.memoryUsage.total.toFixed(2)} GB</span>
                        </div>
                        <Progress
                            value={(systemInfo.memoryUsage.used / systemInfo.memoryUsage.total) * 100}
                            className="h-2"
                        />
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
