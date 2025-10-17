"use client";

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function JavaDesignPage() {
    const [content, setContent] = useState<string>('');
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>('');

    useEffect(() => {
        // Fetch the markdown content
        fetch('/JavaDesign.md')
            .then(response => response.text())
            .then(text => {
                setContent(text);
                // Extract headings for TOC
                const headingRegex = /^(#{1,6})\s+(.+)$/gm;
                const extractedHeadings: Heading[] = [];
                let match;

                while ((match = headingRegex.exec(text)) !== null) {
                    const level = match[1].length;
                    const text = match[2].trim();
                    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                    extractedHeadings.push({ id, text, level });
                }
                setHeadings(extractedHeadings);
            })
            .catch(error => {
                console.error('Error loading markdown:', error);
                setContent('# Error\n\nCould not load the markdown file.');
            });
    }, []);

    // Custom components for styling Markdown elements
    const components = {
        h1: ({ children, ...props }: any) => {
            const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            return <h1 id={id} className="text-2xl font-bold border-b-2 border-neutral-700 pb-2 mb-4 scroll-mt-20" {...props}>{children}</h1>;
        },
        h2: ({ children, ...props }: any) => {
            const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            return <h2 id={id} className="text-xl font-semibold border-b border-neutral-800 pb-1 mt-8 mb-3 scroll-mt-20" {...props}>{children}</h2>;
        },
        h3: ({ children, ...props }: any) => {
            const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
            return <h3 id={id} className="text-lg font-medium mt-6 mb-2 scroll-mt-20" {...props}>{children}</h3>;
        },

        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    className="text-sm"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className="bg-neutral-800 px-1 py-0.5 rounded text-sm" {...props}>
                    {children}
                </code>
            );
        },
    };

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveHeading(id);
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto p-4 md:p-8">
                <div className="flex gap-8">
                    {/* Table of Contents */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-8">
                            <h2 className="text-lg font-semibold mb-4 text-foreground">Table of Contents</h2>
                            <nav className="space-y-1">
                                {headings.map((heading) => (
                                    <button
                                        key={heading.id}
                                        onClick={() => scrollToHeading(heading.id)}
                                        className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${activeHeading === heading.id
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                            } ${heading.level === 1 ? 'font-medium' :
                                                heading.level === 2 ? 'ml-2' :
                                                    heading.level === 3 ? 'ml-4 text-xs' : 'ml-6 text-xs'
                                            }`}
                                    >
                                        {heading.text}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <article className="flex-1 min-w-0">
                        <div className="prose prose-invert prose-sm max-w-none">
                            <div className="mb-8 p-4 bg-card rounded-lg border">
                                <h1 className="text-2xl font-bold mb-2">Java Design Patterns & Concepts</h1>
                                <p className="text-muted-foreground text-sm">
                                    A comprehensive guide covering Java streams, decorator patterns, and other essential design concepts.
                                    Use the table of contents to navigate through different sections.
                                </p>
                            </div>

                            <ReactMarkdown
                                components={components}
                                remarkPlugins={[remarkGfm]}
                            >
                                {content}
                            </ReactMarkdown>
                        </div>
                    </article>
                </div>
            </div>
        </main>
    );
}
