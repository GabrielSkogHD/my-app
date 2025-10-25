import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Try to fetch from pi4 API
        const response = await fetch('http://192.168.50.49:3001/api/system-details', {
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
        console.error('Error fetching pi4 stats:', error);
        return NextResponse.json({ error: 'Failed to fetch pi4 stats' }, { status: 500 });
    }
}
