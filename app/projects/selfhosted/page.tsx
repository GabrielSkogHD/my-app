export default function selfhosted() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
            <section className="max-w-3xl text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Self hosted website and media streamer
                </h1>

                <p className="text-muted-foreground mb-6">
                    Raspberry Pi Web Dashboard Built with Next.js, Cloudflare Tunnel.
                    Media Server Automation Set up Radarr, Sonarr, and qBittorrent on Pi. Accessible from anywhere using cloudflare tunnel. Media is accessible from Emby.
                </p>

                <img
                    src="/images/whoami.jpg"
                    alt="Demo"
                    className="rounded-lg shadow-lg max-w-full w-[1780px] mx-auto"
                />
                <img
                    src="/images/emby.jpg"
                    alt="Demo"
                    className="rounded-lg shadow-lg max-w-full w-[1780px] mx-auto"
                />
            </section>
        </main>
    );
}
