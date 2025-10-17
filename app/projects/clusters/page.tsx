export default function selfhosted() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
            <section className="max-w-3xl text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Raspberry Pi Cluster with Docker Swarm
                </h1>

                <p className="text-muted-foreground mb-6">
                    A Raspberry Pi cluster running <strong>Docker Swarm</strong> is by no means a powerful setup, but it serves as an invaluable <strong>hobby project and educational platform</strong>. This setup allows me to practice deploying and managing <strong>distributed containerized applications</strong> in a cost-effective environment. It is an ideal way to gain hands-on experience with concepts like <strong>fault tolerance</strong>, <strong>load balancing</strong>, and <strong>cluster orchestration</strong>, skills that are directly relevant to modern cloud computing and a Computer Science curriculum. This approach offers a safe, low-power sandbox for learning devops principles without the recurring costs of a commercial cloud provider.
                </p>

                <img
                    src="/images/docker.png"
                    alt="Demo"
                    className="rounded-lg shadow-lg max-w-full w-[1780px] mx-auto"
                />

            </section>
        </main>
    );
}