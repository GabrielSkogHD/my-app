"use client";

import Head from "next/head";
import Link from "next/link";

export default function Home() {
    return (
        <>
            <Head>
                <title>Delcron's Raspberry Pi</title>
                <meta name="description" content="Check out Delcron's Raspberry Pi setup" />
            </Head>
            <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-bold mb-6 text-foreground">Welcome!</h1>
                <p className="text-xl mb-6 text-foreground">
                    My name is Delcron, and this is my Raspberry Pi 5 8GB.
                </p>

                {/* Image of the setup */}
                <img src="/images/setup.png" alt="Delcron" className="w-80 h-80 mb-6" />



                {/* Link to stats */}
                <Link href="/stats" className="text-blue-500 hover:underline text-xl">
                    Check out my Raspberry Pi stats
                </Link>


            </main>
        </>
    );
}
