"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
    const [terminalText, setTerminalText] = useState("");
    const [showCursor, setShowCursor] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [repeatCount, setRepeatCount] = useState(0);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const terminalSequence = [
        { text: "Hello, my name is Gabriel", delay: 100 },
        { text: "Hello, my name is Gabrie", delay: 50 },
        { text: "Hello, my name is Gabri", delay: 50 },
        { text: "Hello, my name is Gabr", delay: 50 },
        { text: "Hello, my name is Gab", delay: 50 },
        { text: "Hello, my name is Ga", delay: 50 },
        { text: "Hello, my name is G", delay: 50 },
        { text: "Hello, my name is ", delay: 50 },
        { text: "Hello, my name is Gabriel Skog", delay: 100 },
        { text: "Hello, my name is Gabriel Skog - Computer Engineering Student", delay: 100 },
        { text: "Hello, my name is Gabriel Skog - Computer Engineering Student", delay: 2000 }
    ];

    const projects = [
        {
            id: 'webdev',
            title: 'Web Development',
            description: 'Custom e-commerce platform for Swemallow',
            href: '/projects/WebDev',
            image: '/images/js.png'
        },
        {
            id: 'newsfeedbot',
            title: 'AI Newsletter Automation',
            description: 'Automated news aggregation and AI summarization',
            href: '/projects/newsfeedbot',
            image: '/images/n8n.png'
        },
        {
            id: 'selfhosted',
            title: 'Self-Hosted Infrastructure',
            description: 'Complete media server and web dashboard',
            href: '/projects/selfhosted',
            image: '/images/pi.jpg'
        },
        {
            id: 'clusters',
            title: 'Raspberry Pi Cluster',
            description: 'Docker Swarm cluster with distributed applications',
            href: '/projects/clusters',
            image: '/images/cluster.png'
        },
        {
            id: '3d_printing',
            title: '3D Printing Projects',
            description: 'Functional and decorative 3D printed solutions',
            href: '/projects/3d_printing',
            image: '/images/3d.webp'
        },
        {
            id: 'java_design',
            title: 'Java Design Patterns',
            description: 'Comprehensive guide to Java streams and patterns',
            href: '/projects/JavaDesign',
            image: '/images/java.png'
        }
    ];

    const images = [
        { src: "/images/me.jpeg", alt: "Gabriel Skog" },
        { src: "/images/setup1.jpeg", alt: "My Computer Setup" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (currentStep < terminalSequence.length) {
            const timeout = setTimeout(() => {
                setTerminalText(terminalSequence[currentStep].text);
                setCurrentStep(prev => prev + 1);
            }, terminalSequence[currentStep].delay);

            return () => clearTimeout(timeout);
        } else if (repeatCount < 2) {
            // Repeat the animation 2 more times (3 total)
            const resetTimeout = setTimeout(() => {
                setCurrentStep(0);
                setRepeatCount(prev => prev + 1);
            }, 1000);

            return () => clearTimeout(resetTimeout);
        }
    }, [currentStep, terminalSequence, repeatCount]);

    // Image rotation effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);
    return (
        <>
            <Head>
                <title>Landing Page</title>
                <meta name="description" content="Welcome to my personal site" />
            </Head>

            <main className="min-h-screen bg-background p-6 flex flex-col justify-center">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Welcome Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-6xl font-bold text-foreground mb-4">Welcome!</h1>
                    </div>

                    {/* Terminal Animation */}
                    <div className="w-full max-w-3xl mx-auto mb-12">
                        <div className="bg-black rounded-lg p-6 font-mono text-green-400 shadow-2xl border border-gray-700">
                            <div className="flex items-center mb-4">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                </div>
                                <div className="ml-4 text-gray-400 text-sm">terminal</div>
                            </div>
                            <div className="text-lg">
                                <span className="text-blue-400">user@raspberrypi:~$</span>
                                <span className="ml-2">{terminalText}</span>
                                <span className={`inline-block w-2 h-5 bg-green-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Left Side - Navigation Sections */}
                        <div className="space-y-6">
                            {/* Stats Section */}
                            <div className="bg-card p-6 rounded-lg border hover:border-primary transition-colors cursor-pointer"
                                onClick={() => setExpandedSection(expandedSection === 'stats' ? null : 'stats')}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-3xl">📊</div>
                                        <div>
                                            <h3 className="text-xl font-semibold">System Stats</h3>
                                            <p className="text-sm text-muted-foreground">Real-time system monitoring</p>
                                        </div>
                                    </div>
                                    <div className={`transform transition-transform ${expandedSection === 'stats' ? 'rotate-180' : ''}`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                {expandedSection === 'stats' && (
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Monitor system performance, resource usage, and network statistics in real-time.
                                        </p>
                                        <Link href="/stats" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                                            View Full Stats →
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* About Section */}
                            <div className="bg-card p-6 rounded-lg border hover:border-primary transition-colors cursor-pointer"
                                onClick={() => setExpandedSection(expandedSection === 'about' ? null : 'about')}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-3xl">ℹ️</div>
                                        <div>
                                            <h3 className="text-xl font-semibold">About Me</h3>
                                            <p className="text-sm text-muted-foreground">Personal information & background</p>
                                        </div>
                                    </div>
                                    <div className={`transform transition-transform ${expandedSection === 'about' ? 'rotate-180' : ''}`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                {expandedSection === 'about' && (
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-sm text-muted-foreground mb-3">
                                            Learn about my background, skills, and experience as a Computer Engineering student.
                                        </p>
                                        <Link href="/about" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
                                            Read More →
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Projects Section */}
                            <div className="bg-card p-6 rounded-lg border hover:border-primary transition-colors cursor-pointer"
                                onClick={() => setExpandedSection(expandedSection === 'projects' ? null : 'projects')}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-3xl">🛠️</div>
                                        <div>
                                            <h3 className="text-xl font-semibold">My Projects</h3>
                                            <p className="text-sm text-muted-foreground">Portfolio of development work</p>
                                        </div>
                                    </div>
                                    <div className={`transform transition-transform ${expandedSection === 'projects' ? 'rotate-180' : ''}`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                {expandedSection === 'projects' && (
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Explore my portfolio of projects including web development, automation, and infrastructure.
                                        </p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {projects.slice(0, 4).map((project) => (
                                                <Link key={project.id} href={project.href}
                                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors">
                                                    <img src={project.image} alt={project.title}
                                                        className="w-8 h-8 rounded object-cover" />
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-medium truncate">{project.title}</div>
                                                        <div className="text-xs text-muted-foreground truncate">{project.description}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                        <Link href="/projects" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mt-3">
                                            View All Projects →
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side - Rotating Image Gallery */}
                        <div className="space-y-6">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-4"></h3>
                                <div className="relative overflow-hidden rounded-lg shadow-lg bg-card">
                                    <div className="relative h-80">
                                        {images.map((image, index) => (
                                            <img
                                                key={index}
                                                src={image.src}
                                                alt={image.alt}
                                                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    {/* Image indicators */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {images.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}
