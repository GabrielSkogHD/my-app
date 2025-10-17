"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
    const pathname = usePathname();

    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean); // t.ex. ["projects", "webdev"]

    return (
        <nav className="p-4 text-lg text-muted-foreground font-medium">
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
            {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const label = decodeURIComponent(segment).replace(/-/g, " ");

                return (
                    <span key={href}>
                        {" / "}
                        <Link href={href} className="text-blue-600 hover:underline capitalize">
                            {label}
                        </Link>
                    </span>
                );
            })}
        </nav>
    );
}
