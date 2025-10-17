export default function SelfHosted() {
    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">
                        Self-Hosted Website and Media Streamer
                    </h1>
                </div>

                <div className="max-w-4xl mx-auto mb-12">
                    <p className="text-muted-foreground text-lg leading-relaxed text-left mb-4">
                        Built a comprehensive <strong>Raspberry Pi Web Dashboard</strong> using Next.js with secure external access via Cloudflare Tunnel. This setup provides a centralized interface for monitoring and managing all my self-hosted services.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed text-left">
                        Implemented a complete <strong>Media Server Automation</strong> system with Radarr, Sonarr, and qBittorrent running on the Pi. The entire setup is accessible from anywhere using Cloudflare tunnel, with media streaming capabilities through Emby for a seamless entertainment experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">Web Dashboard</h3>
                        <img
                            src="/images/whoami.jpg"
                            alt="Web Dashboard Interface"
                            className="rounded-lg shadow-lg w-full max-w-md mx-auto hover:shadow-xl transition-shadow duration-300"
                        />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-4">Media Streaming</h3>
                        <img
                            src="/images/emby.jpg"
                            alt="Emby Media Interface"
                            className="rounded-lg shadow-lg w-full max-w-md mx-auto hover:shadow-xl transition-shadow duration-300"
                        />
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Key Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">Web Dashboard</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• Next.js framework with modern UI</li>
                                <li>• Secure external access via Cloudflare tunnel</li>
                                <li>• Real-time system monitoring</li>
                                <li>• Responsive design for all devices</li>
                            </ul>
                        </div>
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">Media Automation</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• Automated content discovery with Radarr/Sonarr</li>
                                <li>• Efficient downloading with qBittorrent</li>
                                <li>• Media streaming via Emby</li>
                                <li>• Remote access from anywhere</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
