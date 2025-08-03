"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
    const pathname = usePathname();

    if (pathname === "/") return null;

    return (
        <nav className="p-4 text-sm text-muted-foreground">
            <Link href="/" className="text-blue-500 hover:underline">
                ← Back to Home
            </Link>
        </nav>
    );
}
