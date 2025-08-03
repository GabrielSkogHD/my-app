export default function NewsfeedBot() {
    return (
        <main className="p-6 flex flex-col items-center justify-center min-h-screen bg-background">
            <h1 className="text-3xl font-bold mb-4 text-center">
                AI Workflow Automation, Daily Newsletter
            </h1>

            <p className="mb-6 text-center">Self-hosted and using Hostinger.</p>

            <img
                src="/images/n8n.jpg"
                alt="Web development"
                className="rounded-lg shadow-lg hover:scale-150 transition mb-10 max-w-md"
            />

            <h1 className="text-3x1 font-bold"> Discord message example:</h1>

            <div className="w-full max-w-2xl bg-card border border-gray-300 p-4 rounded-xl shadow-md text-sm text-left whitespace-pre-wrap font-mono">
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
        </main>
    );
}
