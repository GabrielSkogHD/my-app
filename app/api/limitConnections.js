let activeConnections = 0;
const MAX_CONNECTIONS = 10; // Limit to 10 connections

export default function handler(req, res) {
    if (activeConnections >= MAX_CONNECTIONS) {
        res.status(503).json({ message: "Server is currently busy. Try again later." });
        return;
    }

    activeConnections++;

    // Simulate some processing (e.g., server logic or fetching data)
    setTimeout(() => {
        activeConnections--;
    }, 5000); // Decrease active connections after 5 seconds (or after the request completes)

    res.status(200).json({ message: "Connected successfully." });
}
