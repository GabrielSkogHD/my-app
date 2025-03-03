import os from "os";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface SystemInfo {
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

function getCpuUsage() {
    const cpus = os.cpus();
    return cpus.map((cpu) => {
        const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
        const usage = 100 - (100 * cpu.times.idle) / total;
        return parseFloat(usage.toFixed(1));
    });
}

async function getCpuTemp() {
    const { stdout } = await execAsync("vcgencmd measure_temp");
    return parseFloat(stdout.replace("temp=", "").replace("'C", ""));
}

function bytesToGB(bytes: number) {
    return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

export async function getSystemDetails(): Promise<SystemInfo> {
    const cpuUsage = getCpuUsage();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const cpuTemp = await getCpuTemp();

    return {
        os: {
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
        },
        cpuTemp,
        cpuUsage,
        memoryUsage: {
            total: parseFloat(bytesToGB(totalMem)),
            used: parseFloat(bytesToGB(usedMem)),
            free: parseFloat(bytesToGB(freeMem)),
        },
    };
}
