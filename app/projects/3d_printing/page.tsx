"use client";

import { useState } from "react";

export default function ThreeDPrinting() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const projects = [
        {
            title: "Victorian Townhouse",
            description: "Detailed architectural model printing and assembly",
            images: [
                { src: "/images/vic1.jpg", alt: "Victorian townhouse model - front view" },
                { src: "/images/vic2.JPG", alt: "Victorian townhouse model - assembly process" }
            ]
        },
        {
            title: "Functional Projects",
            description: "Keyboard assembly and SKADIS pegboard accessories",
            images: [
                { src: "/images/split.JPG", alt: "Split keyboard assembly project" },
                { src: "/images/skadis_lamp.PNG", alt: "SKADIS pegboard lamp attachment" }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-background p-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-6">
                        3D Printing for Functional and Decorative Purposes
                    </h1>
                </div>

                <div className="max-w-4xl mx-auto mb-12">
                    <p className="text-muted-foreground text-lg leading-relaxed text-left mb-4">
                        Exploring the intersection of <strong>art and engineering</strong> through 3D printing, creating both functional solutions and decorative pieces that demonstrate precision, creativity, and technical skill.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed text-left">
                        From intricate architectural models to practical keyboard components and organizational accessories, each project showcases different aspects of <strong>design thinking, material science, and manufacturing processes</strong>.
                    </p>
                </div>

                {projects.map((project, projectIndex) => (
                    <div key={projectIndex} className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                            <p className="text-muted-foreground">{project.description}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {project.images.map((image, imageIndex) => (
                                <div key={imageIndex} className="group cursor-pointer" onClick={() => setSelectedImage(image.src)}>
                                    <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-white bg-opacity-90 rounded-full p-3">
                                                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Technical Skills Demonstrated</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">Design & Modeling</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• CAD software proficiency</li>
                                <li>• Architectural modeling</li>
                                <li>• Functional design principles</li>
                            </ul>
                        </div>
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">Manufacturing</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• 3D printing optimization</li>
                                <li>• Material selection</li>
                                <li>• Post-processing techniques</li>
                            </ul>
                        </div>
                        <div className="bg-card p-6 rounded-lg border">
                            <h3 className="font-semibold mb-3">Problem Solving</h3>
                            <ul className="text-sm text-muted-foreground space-y-2">
                                <li>• Iterative design process</li>
                                <li>• Assembly optimization</li>
                                <li>• Quality control</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <img
                            src={selectedImage}
                            alt="Full size view"
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
