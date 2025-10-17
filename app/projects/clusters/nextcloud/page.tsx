import Head from "next/head";
import React from "react";

export default function NextcloudProject() {
    return (
        <>
            <Head>
                <title>Nextcloud Self-Hosted Solution</title>
            </Head>
            <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
                <section className="max-w-4xl text-center">
                    <h1 className="text-3xl font-bold mb-6">
                        Nextcloud Self-Hosted Cloud Storage
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="text-left">
                            <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
                            <p className="text-muted-foreground mb-4">
                                Deployed a complete <strong>Nextcloud instance</strong> on my Raspberry Pi cluster using <strong>Docker containers</strong>. This self-hosted solution provides secure file storage, calendar, contacts, and collaboration tools, replacing commercial cloud services with full data ownership.
                            </p>

                            <h3 className="text-lg font-semibold mb-3">Key Features Implemented:</h3>
                            <ul className="text-muted-foreground space-y-2">
                                <li>• <strong>File Storage & Sync</strong> - Secure cloud storage with mobile/desktop sync</li>
                                <li>• <strong>Calendar & Contacts</strong> - Full CalDAV/CardDAV support</li>
                                <li>• <strong>Document Collaboration</strong> - OnlyOffice integration for real-time editing</li>
                                <li>• <strong>External Access</strong> - Cloudflare tunnel for secure remote access</li>
                                <li>• <strong>Database Integration</strong> - PostgreSQL for robust data management</li>
                                <li>• <strong>Redis Caching</strong> - Performance optimization with Redis</li>
                            </ul>
                        </div>

                        <div className="text-left">
                            <h2 className="text-xl font-semibold mb-4">Technical Implementation</h2>
                            <p className="text-muted-foreground mb-4">
                                The setup demonstrates <strong>container orchestration</strong>, <strong>reverse proxy configuration</strong>, and <strong>secure remote access</strong> using modern DevOps practices.
                            </p>

                            <h3 className="text-lg font-semibold mb-3">Technologies Used:</h3>
                            <ul className="text-muted-foreground space-y-2">
                                <li>• <strong>Docker & Docker Compose</strong> - Container orchestration</li>
                                <li>• <strong>PostgreSQL</strong> - Database backend</li>
                                <li>• <strong>Redis</strong> - Caching and session management</li>
                                <li>• <strong>Cloudflare Tunnel</strong> - Secure external access</li>
                                <li>• <strong>Nginx</strong> - Reverse proxy and SSL termination</li>
                                <li>• <strong>Portainer</strong> - Container management interface</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Project Highlights</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-card p-4 rounded-lg border">
                                <h3 className="font-semibold mb-2">Security</h3>
                                <p className="text-sm text-muted-foreground">
                                    Implemented trusted domains, SSL encryption, and secure tunnel access for enterprise-grade security.
                                </p>
                            </div>
                            <div className="bg-card p-4 rounded-lg border">
                                <h3 className="font-semibold mb-2">Scalability</h3>
                                <p className="text-sm text-muted-foreground">
                                    Containerized architecture allows easy scaling and migration across different environments.
                                </p>
                            </div>
                            <div className="bg-card p-4 rounded-lg border">
                                <h3 className="font-semibold mb-2">Reliability</h3>
                                <p className="text-sm text-muted-foreground">
                                    Automated backups, health monitoring, and fault-tolerant design ensure high availability.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Live Demo</h2>
                        <p className="text-muted-foreground mb-4">
                            The Nextcloud instance is currently running and accessible through a secure Cloudflare tunnel, demonstrating real-world deployment and management capabilities.
                        </p>
                        <div className="bg-card p-6 rounded-lg border">
                            <p className="text-sm text-muted-foreground">
                                <strong>Access URL:</strong> <a href="http://cloud.gabrielskoghd.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">cloud.gabrielskoghd.org</a>
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                                * Secure access via Cloudflare tunnel with trusted domain configuration
                            </p>
                        </div>
                    </div>

                    <img
                        src="/images/dashboard.png"
                        alt="Nextcloud Dashboard"
                        className="rounded-lg shadow-lg max-w-full mx-auto"
                    />
                </section>
            </main>
        </>
    );
}
