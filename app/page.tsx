"use client";

import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>Landing Page</title>
                <meta name="description" content="Welcome to my personal site" />
            </Head>

            <main className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
                {/* Main Content Box */}
                <section className="w-full max-w-4xl bg-card p-10 rounded-2xl shadow-lg text-center">

                    {/* Title & Description */}
                    <h1 className="text-5xl font-bold text-foreground mb-4">Welcome!</h1>
                    <p className="text-2xl text-muted-foreground mb-8">
                        My name is <strong>Gabriel Skog</strong>. This is my personal website where I showcase my projects and Raspberry Pi 8 GB setup.
                    </p>

                    {/* Image Section (Responsive Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center mb-8">
                        <img
                            src="/images/me.jpeg"
                            alt="Description 1"
                            className="w-full max-w-[320px] h-auto rounded-lg shadow-md object-cover"
                        />
                        <img
                            src="/images/setup.png"
                            alt="Description 2"
                            className="w-full max-w-[320px] h-auto rounded-lg shadow-md object-cover"
                        />
                    </div>

                    {/* Button Section (Centered & Aligned) */}
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/stats" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-md hover:bg-blue-600 transition text-center">
                            📊 View Stats
                        </Link>
                        <Link href="/about" className="bg-gray-700 text-white px-6 py-3 rounded-lg text-xl font-semibold shadow-md hover:bg-gray-800 transition text-center">
                            ℹ️ About Me
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
