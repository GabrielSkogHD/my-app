// app/projects/JavaDesign/page.tsx

import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function JavaDesignPage() {
    const filePath = path.join(process.cwd(), 'app/projects/JavaDesign/JavaDesign.md');
    let content: string;
    let errorMessage: string | null = null;

    try {
        content = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        errorMessage = `Kunde inte ladda filen från sökvägen: ${filePath}. Kontrollera att filen finns och att sökvägen är korrekt.`;
        console.error(errorMessage, error);
        content = `# Fel \n\n ${errorMessage}`;
    }

    // Anpassade komponenter för att styla Markdown-element
    const components = {
        // Lägger till styling för rubriker
        h1: ({ ...props }) => <h1 className="text-4xl font-bold border-b-2 border-neutral-700 pb-2 mb-6" {...props} />,
        h2: ({ ...props }) => <h2 className="text-3xl font-semibold border-b border-neutral-800 pb-2 mt-10 mb-4" {...props} />,

        // Hanterar kodblock
        code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
    };

    return (
        <main className="p-4 md:p-8">
            <article className="prose prose-invert prose-lg lg:prose-xl mx-auto">
                <ReactMarkdown
                    components={components} // Använder våra anpassade komponenter
                    remarkPlugins={[remarkGfm]}
                >
                    {content}
                </ReactMarkdown>
            </article>
        </main>
    );
}
