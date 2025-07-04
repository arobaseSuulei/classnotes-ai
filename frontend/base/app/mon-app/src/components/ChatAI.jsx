import React, { useState } from "react";

export default function ChatAI({ onClose }) {
    const [messages, setMessages] = useState([
        { from: "ai", text: "Bonjour ! Comment puis-je vous aider ?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: "user", text: input }]);
        const userMessage = input;
        setInput("");
        try {
            const res = await fetch("http://localhost:8080/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage })
            });
            const data = await res.json();
            if (data.response) {
                setMessages(msgs => [...msgs, { from: "ai", text: data.response }]);
            } else {
                setMessages(msgs => [...msgs, { from: "ai", text: "Erreur de l'IA : " + (data.error || "Réponse vide") }]);
            }
        } catch (e) {
            setMessages(msgs => [...msgs, { from: "ai", text: "Erreur de connexion au serveur." }]);
        }
    };

    return (
        <div className="fixed bottom-20 right-8 w-80 bg-white shadow-lg rounded-lg flex flex-col z-50 border border-gray-300">
            <div className="flex justify-between items-center p-3 border-b">
                <span className="font-bold">Chat avec l'AI</span>
                <button onClick={onClose} className="text-gray-500 hover:text-red-500">✕</button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto" style={{ maxHeight: 300 }}>
                {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-2 text-sm ${msg.from === "ai" ? "text-left" : "text-right"}`}>
                        <span className={msg.from === "ai" ? "bg-gray-200 text-gray-800 px-2 py-1 rounded" : "bg-blue-500 text-white px-2 py-1 rounded"}>
                            {msg.text}
                        </span>
                    </div>
                ))}
            </div>
            <div className="p-3 border-t flex gap-2">
                <input
                    className="flex-1 border rounded px-2 py-1 text-sm"
                    type="text"
                    placeholder="Votre message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend} className="bg-blue-500 text-white px-3 py-1 rounded">Envoyer</button>
            </div>
        </div>
    );
} 