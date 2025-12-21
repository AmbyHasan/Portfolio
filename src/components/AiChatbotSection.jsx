"use client";
import { useState } from "react";

import React from 'react'

const AiChatbotSection = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function sendMessage() {
  if (!input.trim()) return;

  const userMessage = input;
  setInput("");

  setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await res.json();

  setMessages((prev) => [
    ...prev,
    { role: "assistant", text: data.reply },
  ]);
}
  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full
        bg-linear-to-r from-purple-500 to-pink-500
        shadow-[0_0_25px_rgba(168,85,247,0.7)]
        text-white text-xl z-50"
      >
        🤖
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-[420px]
        bg-[#0b0d12] border border-gray-700 rounded-xl
        shadow-[0_0_40px_rgba(168,85,247,0.3)]
        flex flex-col z-50">

          <div className="p-4 border-b border-gray-700 text-purple-400 font-semibold">
            Ask about Amber
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  m.role === "user"
                    ? "bg-purple-500 text-white ml-auto"
                    : "bg-gray-800 text-gray-200"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-700 flex items-center gap-2">
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Ask about projects, skills..."
    className="flex-1 bg-[#111] border border-gray-700
    rounded-lg px-3 py-2 text-gray-200 placeholder-gray-500
    focus:outline-none focus:border-purple-400"
    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  />

  <button
    onClick={sendMessage}
    disabled={!input.trim()}
    className="
      p-2 rounded-lg
      bg-purple-600 hover:bg-purple-700
      disabled:bg-gray-700 disabled:cursor-not-allowed
      transition-all
      hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]
    "
    aria-label="Send message"
    title="Send"
  >
    {/* Send Icon */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14M12 5l7 7-7 7"
      />
    </svg>
  </button>
</div>
        </div>
      )}
    </>
  );
}

export default AiChatbotSection;

