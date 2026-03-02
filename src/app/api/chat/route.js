import fs from "fs";
import path from "path";
import Groq from "groq-sdk";
import { cosineSimilarity } from "@/lib/cosineSimilarity";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Load vector database
const root = process.cwd();
const vectorsPath = path.join(root, "src", "data", "vectors.json");
const vectorDB = JSON.parse(fs.readFileSync(vectorsPath, "utf-8"));


// 🔥 1️⃣ Query Rewriter (VERY IMPORTANT for retrieval)
async function rewriteQuery(userMessage) {
  const res = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `
Convert the user's question into a short search query 
for retrieving portfolio information.

Return ONLY keywords.

Example:
"What projects has Amber built?"
→ Amber Hasan projects portfolio full stack development
`
      },
      { role: "user", content: userMessage }
    ]
  });

  return res.choices[0].message.content;
}


// 🔥 2️⃣ Get embedding from Groq
async function getEmbedding(text) {
  const res = await fetch("https://api.groq.com/openai/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  const data = await res.json();
  return data.data[0].embedding;
}


export async function POST(req) {
  const { message } = await req.json();

  //  Rewrite query → then embed
  const searchQuery = await rewriteQuery(message);
  const queryEmbedding = await getEmbedding(searchQuery);

  //  Vector similarity search
  const scored = vectorDB.map(item => ({
    text: item.text,
    score: cosineSimilarity(queryEmbedding, item.embedding)
  }));

  const topChunks = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.text)
    .join("\n");

  //  Ask LLM with retrieved context
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
You are Amber Hasan's AI portfolio assistant.

Speak in first person as Amber.
Be confident, concise and recruiter-friendly.
Only answer using the provided context.

If the question is unrelated to Amber, politely say so.

CONTEXT:
${topChunks}
`
      },
      { role: "user", content: message }
    ]
  });

  return Response.json({
    reply: completion.choices[0].message.content
  });
}