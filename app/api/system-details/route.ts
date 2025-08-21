// app/api/system-details/route.ts
export const runtime = 'nodejs';          // behövs om du läser /proc, fs, os, etc.
export const dynamic = 'force-dynamic';   // inga snapshots/ISR
export const revalidate = 0;              // ingen återanvändning

import { NextResponse } from 'next/server';
import { getSystemDetails } from '@/app/system'; // justera import om du saknar "@"

export async function GET() {
    const data = await getSystemDetails();
    return new NextResponse(JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'CDN-Cache-Control': 'no-store',
            'Vercel-CDN-Cache-Control': 'no-store',
        },
    });
}
