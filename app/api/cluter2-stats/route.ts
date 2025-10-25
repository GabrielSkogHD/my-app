import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Try to fetch from cluter2 API
        const response = await fetch('http://192.168.50.50:3001/api/system-details', {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            return NextResponse.json(data);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching cluter2 stats:', error);
        return NextResponse.json({ error: 'Failed to fetch cluter2 stats' }, { status: 500 });
    }
}
