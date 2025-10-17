import * as os from 'os';
import * as fs from 'fs/promises';

// A simple helper to wait for a specific time
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Calculates CPU usage over a 1-second interval
async function getCpuUsage(): Promise<number[]> {
    const startCpus = os.cpus();

    // Wait for 1 second to get a meaningful difference
    await delay(1000);

    const endCpus = os.cpus();

    return startCpus.map((startCore, i) => {
        const endCore = endCpus[i];

        // Calculate the total ticks and idle ticks for both samples
        const totalStart = Object.values(startCore.times).reduce((a, b) => a + b, 0);
        const totalEnd = Object.values(endCore.times).reduce((a, b) => a + b, 0);
        const idleStart = startCore.times.idle;
        const idleEnd = endCore.times.idle;

        // Calculate the deltas
        const totalDelta = totalEnd - totalStart;
        const idleDelta = idleEnd - idleStart;

        // If totalDelta is 0, the CPU was likely sleeping or had no activity
        if (totalDelta === 0) {
            return 0;
        }

        // The percentage of time that was NOT idle
        const usagePercentage = 100 * (1 - (idleDelta / totalDelta));
        return parseFloat(usagePercentage.toFixed(1)); // Return with one decimal place
    });
}

// Reads the CPU temperature from the Pi's sensor file
async function getCpuTemp(): Promise<number> {
    try {
        const tempRaw = await fs.readFile('/sys/class/thermal/thermal_zone0/temp', 'utf-8');
        // The value is in millidegrees Celsius, so divide by 1000
        return parseInt(tempRaw, 10) / 1000;
    } catch (error) {
        console.error("Could not read CPU temperature:", error);
        return 0; // Return 0 if reading fails
    }
}

// Main function to gather all system details
export async function getSystemDetails() {
    const totalMemBytes = os.totalmem();
    const freeMemBytes = os.freemem();
    const usedMemBytes = totalMemBytes - freeMemBytes;

    // Run the two async functions concurrently for efficiency
    const [cpuUsage, cpuTemp] = await Promise.all([
        getCpuUsage(),
        getCpuTemp()
    ]);

    return {
        os: {
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
        },
        cpuTemp,
        cpuUsage,
        memoryUsage: {
            total: totalMemBytes / (1024 ** 3), // Convert bytes to GB
            used: usedMemBytes / (1024 ** 3),
            free: freeMemBytes / (1024 ** 3),
        },
    };
}