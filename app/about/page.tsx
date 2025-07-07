"use client";

import Head from "next/head";
import Link from "next/link";

export default function About() {
    return (
        <>
            <Head>
                <title>About Me</title>
            </Head>

            <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
                <h1 className="text-4xl font-bold mb-6 text-foreground">About Me</h1>

                <section className="w-full max-w-3xl bg-card p-6 rounded-2xl shadow-lg">
                    {/* Introduction */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-foreground">Hello, I'm Gabriel!</h2>
                        <p className="text-lg text-muted-foreground mt-2">
                            I'm a computer engineering student at LTH, passionate about
                            <strong> concurrent programming, Raspberry Pi projects, and backend development.</strong>
                        </p>
                    </div>

                    {/* Education */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Education</h2>
                        <p className="text-lg text-muted-foreground mt-2">
                            - 📖 <strong>Lund University, LTH</strong> – Computer Engineer (Year 4)
                        </p>
                    </div>

                    {/* Projects */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Projects</h2>
                        <ul className="text-lg text-muted-foreground mt-2 list-disc pl-6">
                            <li> <strong>Raspberry Pi Web Dashboard</strong> – Built with Next.js, Cloudflare Tunnel</li>
                            <li> <strong>Webshop setup on Shopify</strong> – Implemented HTML, JavaScript and CSS</li>
                            <Link href="https://swemallow.se" className="text-blue-500 hover:underline ml-1">
                                swemallow.se
                            </Link>
                            <li>🎬 <strong>Media Server Automation</strong> – Set up Radarr, Sonarr, and qBittorrent on Pi</li>
                        </ul>
                    </div>

                    {/* Contact or Links */}
                    <div className="mt-6 text-center">
                        <p className="text-lg text-muted-foreground">
                            Want to connect? Find me on
                            <Link href="https://github.com/GabrielSkogHD" className="text-blue-500 hover:underline ml-1">
                                GitHub
                            </Link>
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
