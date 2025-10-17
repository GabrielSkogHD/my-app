export default function WebDev() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
            <section className="max-w-3xl text-center">
                <h1 className="text-3xl font-bold mb-4">
                    Web Development for Swemallow.se
                </h1>

                <p className="text-muted-foreground mb-6">
                    I designed and developed a custom e-commerce platform for Swemallow.
                    Due to the limitations of Shopify templates, I implemented custom HTML, CSS, and JavaScript.
                    The site features auto-looping videos and a responsive layout for a modern, engaging experience.
                </p>

                <img
                    src="/images/swemallow.gif"
                    alt="Swemallow Demo"
                    className="rounded-lg shadow-lg max-w-full w-[1780px] mx-auto"
                />
            </section>
        </main>
    );
}
