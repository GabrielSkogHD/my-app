export default function NewsfeedBot() {
    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">
                        AI Workflow Automation & Daily Newsletter
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Self-hosted automation using n8n and OpenAI API
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-12">
                    <p className="text-muted-foreground text-lg leading-relaxed text-left mb-4">
                        Implemented a sophisticated <strong>AI-powered workflow automation</strong> using self-hosted n8n and OpenAI's API. This system automatically scrapes news articles from 5 RSS sources, processes them through AI summarization, and delivers personalized newsletters to my Discord server.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed text-left">
                        The workflow demonstrates practical application of <strong>API integration, data processing, and automated content delivery</strong>, showcasing skills in workflow automation and AI integration for real-world productivity solutions.
                    </p>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Workflow Interface</h2>
                    <img
                        src="/images/n8n.jpg"
                        alt="n8n Workflow Interface"
                        className="rounded-lg shadow-lg max-w-2xl mx-auto hover:shadow-xl transition-shadow duration-300"
                    />
                </div>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Sample Newsletter Output</h2>
                    <div className="bg-card border border-gray-300 p-6 rounded-xl shadow-md text-sm text-left whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                        {`📦 Tech Tools/Hardware:

New job, boss asked me to spin up a docker container.

This post could help inspire you with the practical use of docker containers which are an essential part of modern software development. Here, a reddit user shares their excitement and relief at being able to apply home-lab experience to a real-world job scenario, thus proving that practicing at home can be beneficial for work. 💼

🐧 Linux/Raspberry Pi/Homelab Tricks:

Homelab Cleanup Progression.

This reddit post gives an account of an individual's journey to upgrade and organize their network cabinet. As a computer science engineering student, following this progression could provide you with valuable insights on upgrading your system, cable management, and enhancing the efficacy of your homelab setup. 🛠

📚 Productivity/Student Life & Health:

None of the available articles cover this section this time. 😔 I'll keep an eye on this topic for the next batch!

🧠 Motivational Quotes for the Road:
"Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." - Albert Schweitzer
"Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
"Believe you can and you're halfway there." - Theodore Roosevelt`}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-12">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Technical Implementation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">Data Collection</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• RSS feed monitoring</li>
                                <li>• Automated content scraping</li>
                                <li>• Multi-source aggregation</li>
                            </ul>
                        </div>
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">AI Processing</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• OpenAI API integration</li>
                                <li>• Content summarization</li>
                                <li>• Category classification</li>
                            </ul>
                        </div>
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">Delivery System</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• Discord webhook integration</li>
                                <li>• Scheduled automation</li>
                                <li>• Formatted output</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
