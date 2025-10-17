"use client";
import { useState } from "react";

export default function CardPage() {
    const [card, setCard] = useState("");
    const [status, setStatus] = useState("");

    const draw = async () => {
        const res = await fetch("/api/cards");
        const data = await res.json();
        if (data.card) {
            setCard(data.card);
            setStatus("");
        } else {
            setStatus(data.message);
        }
    };

    const reset = async () => {
        await fetch("/api/cards", { method: "POST" });
        setCard("");
        setStatus("Deck reset");
    };

    return (
        <div className="p-4 min-h-screen flex flex-col items-center justify-center bg-background">
            <h1 className="text-3xl font-bold mb-6 text-foreground"> Daily Card Draw</h1>
            <div className="flex gap-4 mb-6">
                <button
                    onClick={draw}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow"
                >
                    Draw Card
                </button>
                <button
                    onClick={reset}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow"
                >
                    Reset Deck
                </button>
            </div>
            <div className="text-2xl text-center">
                {card && <p>You drew: <strong>{card}</strong></p>}
                {status && <p>{status}</p>}
            </div>
        </div>
    );
}
