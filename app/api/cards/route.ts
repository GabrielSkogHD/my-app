import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const deck = suits.flatMap(suit => ranks.map(rank => `${rank}${suit}`));

const filePath = path.join(process.cwd(), "card_state.json");

function loadDrawn(): string[] {
    try {
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, "utf8").trim();
            if (raw === "") return [];
            return JSON.parse(raw);
        }
    } catch (err) {
        console.error("❌ Failed to read or parse card_state.json:", err);
    }
    return [];
}

function saveDrawn(cards: string[]) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(cards));
    } catch (err) {
        console.error("❌ Failed to save drawn cards:", err);
    }
}

export async function GET() {
    const drawn = loadDrawn();
    const remaining = deck.filter(card => !drawn.includes(card));

    if (remaining.length === 0) {
        return NextResponse.json({ message: "All cards have been drawn." });
    }

    const card = remaining[Math.floor(Math.random() * remaining.length)];
    drawn.push(card);
    saveDrawn(drawn);

    return NextResponse.json({ card });
}

export async function POST() {
    saveDrawn([]);
    return NextResponse.json({ message: "Deck has been reset." });
}
