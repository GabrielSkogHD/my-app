import Head from "next/head";
import Link from "next/link";

export default function Projects() {
    return (
        <>
            <Head>
                <title>My Projects</title>
            </Head>
            <main className="min-h-screen bg-background p-8 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-10 text-center">My Projects</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl w-full">
                    <Link href="/projects/WebDev" className="flex flex-col items-center">
                        <img
                            src="/images/js.png"
                            alt="Web development"
                            className="rounded-lg shadow-lg hover:scale-105 transition w-full max-w-[180px]"
                        />
                        <p className="mt-3 text-center text-muted-foreground">Web Development</p>
                    </Link>

                    <Link href="/projects/newsfeedbot" className="flex flex-col items-center">
                        <img
                            src="/images/n8n.png"
                            alt="RSS Bot"
                            className="rounded-lg shadow-lg hover:scale-105 transition w-full max-w-[280px]"
                        />
                        <p className="mt-3 text-center text-muted-foreground">Newsfeed Automation Bot</p>
                    </Link>

                    {/* Lägg till fler projekt här */}
                </div>
            </main>
        </>
    );
}
