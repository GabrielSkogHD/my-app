import Link from "next/link";

export default function Clusters() {
    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">
                        Raspberry Pi Cluster with Docker Swarm
                    </h1>
                </div>

                <div className="max-w-4xl mx-auto mb-12">
                    <p className="text-muted-foreground text-lg leading-relaxed text-left">
                        A Raspberry Pi cluster running <strong>Docker Swarm</strong> is by no means a powerful setup, but it serves as an invaluable <strong>hobby project and educational platform</strong>. This setup allows me to practice deploying and managing <strong>distributed containerized applications</strong> in a cost-effective environment.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed text-left mt-4">
                        It is an ideal way to gain hands-on experience with concepts like <strong>fault tolerance</strong>, <strong>load balancing</strong>, and <strong>cluster orchestration</strong>, skills that are directly relevant to modern cloud computing and a Computer Science curriculum. This approach offers a safe, low-power sandbox for learning devops principles without the recurring costs of a commercial cloud provider.
                    </p>
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 mt-6">
                        <p className="text-green-400 text-lg leading-relaxed text-left">
                            <strong>🎉 Successfully Deployed!</strong> This very website is now running as a <strong>containerized application</strong> on the Docker Swarm cluster with <strong>load balancing</strong> between the Raspberry Pi 5 (manager) and Raspberry Pi 4 (worker) nodes. The application automatically distributes requests and provides fault tolerance across both devices.
                        </p>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-2xl font-semibold mb-8 text-center">Cluster Applications</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <Link href="/projects/clusters/nextcloud" className="group">
                            <div className="bg-card p-6 rounded-lg border hover:border-primary transition-colors">
                                <div className="flex items-center space-x-4">
                                    <img
                                        src="/images/nextcloud.png"
                                        alt="Nextcloud"
                                        className="w-16 h-16 rounded-lg"
                                    />
                                    <div className="text-left">
                                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                                            Nextcloud Self-Hosted Cloud
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            Complete file storage, calendar, and collaboration platform with secure external access via Cloudflare tunnel.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <div className="bg-card p-6 rounded-lg border opacity-50">
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <div className="text-left">
                                    <h3 className="text-lg font-semibold text-muted-foreground">
                                        More Applications Coming Soon
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Additional containerized applications will be added to showcase cluster capabilities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <img
                        src="/images/docker.png"
                        alt="Docker Swarm Cluster"
                        className="rounded-lg shadow-lg max-w-full mx-auto"
                    />
                </div>
            </div>
        </main>
    );
}