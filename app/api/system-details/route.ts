import { NextResponse } from "next/server";
import { getSystemDetails } from "../../system";

export async function GET() {
    const systemDetails = await getSystemDetails();
    return NextResponse.json(systemDetails);
}
