export default function WebDev() {
    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">
                        Web Development for Swemallow.se
                    </h1>
                </div>

                <div className="max-w-4xl mx-auto mb-12">
                    <p className="text-muted-foreground text-lg leading-relaxed text-left mb-4">
                        Designed and developed a custom <strong>e-commerce platform</strong> for Swemallow, overcoming the limitations of standard Shopify templates through custom implementation of HTML, CSS, and JavaScript.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed text-left">
                        The site features <strong>auto-looping videos, responsive design, and modern UI/UX principles</strong> to create an engaging shopping experience that stands out from typical e-commerce platforms.
                    </p>
                </div>

                <div className="text-center mb-12">
                    <h2 className="text-2xl font-semibold mb-6">Live Demo</h2>
                    <div className="max-w-4xl mx-auto">
                        <img
                            src="/images/swemallow.gif"
                            alt="Swemallow Website Demo"
                            className="rounded-lg shadow-lg w-full max-w-4xl mx-auto hover:shadow-xl transition-shadow duration-300"
                        />
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Technical Implementation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">Frontend Development</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• Custom HTML5 structure</li>
                                <li>• Advanced CSS3 animations</li>
                                <li>• Responsive JavaScript interactions</li>
                                <li>• Cross-browser compatibility</li>
                            </ul>
                        </div>
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">E-commerce Features</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• Shopify platform integration</li>
                                <li>• Custom product displays</li>
                                <li>• Optimized checkout flow</li>
                                <li>• Mobile-first design approach</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <a
                        href="https://swemallow.se"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Visit Live Site
                    </a>
                </div>
            </div>
        </main>
    );
}
