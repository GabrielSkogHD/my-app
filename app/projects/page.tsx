import Head from "next/head";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    description: string;
    category: string;
    technologies: string[];
    image: string;
    href: string;
    status: 'completed' | 'in-progress' | 'featured';
}

export default function Projects() {
    const projects: Project[] = [
        {
            id: 'webdev',
            title: 'Web Development',
            description: 'Custom e-commerce platform for Swemallow with advanced UI/UX',
            category: 'Frontend Development',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Shopify'],
            image: '/images/js.png',
            href: '/projects/WebDev',
            status: 'completed'
        },
        {
            id: 'newsfeedbot',
            title: 'AI Newsletter Automation',
            description: 'Automated news aggregation and AI-powered summarization system',
            category: 'Automation & AI',
            technologies: ['n8n', 'OpenAI API', 'RSS', 'Discord'],
            image: '/images/n8n.png',
            href: '/projects/newsfeedbot',
            status: 'completed'
        },
        {
            id: 'selfhosted',
            title: 'Self-Hosted Infrastructure',
            description: 'Complete media server and web dashboard with remote access',
            category: 'DevOps & Infrastructure',
            technologies: ['Docker', 'Next.js', 'Cloudflare', 'Radarr', 'Sonarr'],
            image: '/images/pi.jpg',
            href: '/projects/selfhosted',
            status: 'completed'
        },
        {
            id: 'clusters',
            title: 'Raspberry Pi Cluster',
            description: 'Docker Swarm cluster with distributed applications',
            category: 'DevOps & Infrastructure',
            technologies: ['Docker Swarm', 'Nextcloud', 'PostgreSQL', 'Redis'],
            image: '/images/cluster.png',
            href: '/projects/clusters',
            status: 'featured'
        },
        {
            id: '3d_printing',
            title: '3D Printing Projects',
            description: 'Functional and decorative 3D printed solutions',
            category: 'Hardware & Design',
            technologies: ['CAD', '3D Printing', 'Design'],
            image: '/images/3d.webp',
            href: '/projects/3d_printing',
            status: 'completed'
        },
        {
            id: 'java_design',
            title: 'Java Design Patterns',
            description: 'Comprehensive guide to Java streams and design patterns',
            category: 'Education & Documentation',
            technologies: ['Java', 'Design Patterns', 'Streams', 'Markdown'],
            image: '/images/java.png',
            href: '/projects/JavaDesign',
            status: 'completed'
        }
    ];

    const categories = [...new Set(projects.map(p => p.category))];

    return (
        <>
            <Head>
                <title>My Projects</title>
            </Head>
            <main className="min-h-screen bg-background p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            A collection of projects showcasing my skills in web development, automation,
                            infrastructure, and creative problem-solving.
                        </p>
                    </div>

                    {/* Projects Table */}
                    <div className="bg-card rounded-lg border overflow-hidden">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-semibold">Project Portfolio</h2>
                            <p className="text-sm text-muted-foreground mt-1">
                                Click on any project to view detailed information
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="text-left p-4 font-medium">Project</th>
                                        <th className="text-left p-4 font-medium">Category</th>
                                        <th className="text-left p-4 font-medium">Technologies</th>
                                        <th className="text-left p-4 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id} className="border-b hover:bg-muted/30 transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                    <div>
                                                        <Link
                                                            href={project.href}
                                                            className="font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer"
                                                        >
                                                            {project.title}
                                                        </Link>
                                                        <div className="text-sm text-muted-foreground max-w-xs">
                                                            {project.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    {project.category}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {project.technologies.slice(0, 3).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="inline-flex items-center px-2 py-1 rounded text-xs bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 3 && (
                                                        <span className="text-xs text-muted-foreground">
                                                            +{project.technologies.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${project.status === 'completed'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : project.status === 'featured'
                                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    }`}>
                                                    {project.status === 'completed' ? 'Completed' :
                                                        project.status === 'featured' ? 'Featured' : 'In Progress'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Project Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12">
                        <div className="bg-card p-6 rounded-lg border text-center">
                            <div className="text-2xl font-bold text-primary">{projects.length}</div>
                            <div className="text-sm text-muted-foreground">Total Projects</div>
                        </div>
                        <div className="bg-card p-6 rounded-lg border text-center">
                            <div className="text-2xl font-bold text-green-500">{projects.filter(p => p.status === 'completed').length}</div>
                            <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                        <div className="bg-card p-6 rounded-lg border text-center">
                            <div className="text-2xl font-bold text-blue-500">{categories.length}</div>
                            <div className="text-sm text-muted-foreground">Categories</div>
                        </div>
                        <div className="bg-card p-6 rounded-lg border text-center">
                            <div className="text-2xl font-bold text-purple-500">{projects.filter(p => p.status === 'featured').length}</div>
                            <div className="text-sm text-muted-foreground">Featured</div>
                        </div>
                    </div>

                    {/* Category Overview */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-6 text-center">Project Categories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category) => {
                                const categoryProjects = projects.filter(p => p.category === category);
                                return (
                                    <div key={category} className="bg-card p-6 rounded-lg border">
                                        <h3 className="font-semibold mb-3">{category}</h3>
                                        <div className="text-2xl font-bold text-primary mb-2">{categoryProjects.length}</div>
                                        <div className="text-sm text-muted-foreground">Projects</div>
                                        <div className="mt-3 space-y-1">
                                            {categoryProjects.map((project) => (
                                                <Link
                                                    key={project.id}
                                                    href={project.href}
                                                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                                                >
                                                    {project.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
