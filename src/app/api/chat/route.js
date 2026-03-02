import { pipeline } from "@xenova/transformers";
import fs from "fs";
import path from "path";
import Groq from "groq-sdk";
import { cosineSimilarity } from "@/lib/cosineSimilarity";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});



const root = process.cwd();
const vectorsPath = path.join(root, "src", "data", "vectors.json");

const vectorDB = JSON.parse(fs.readFileSync(vectorsPath, "utf-8"));

//loading the embedding model once
const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);


export async function POST(req) {
  
  const { message } = await req.json();

  //convert question to embedding
     const output = await embedder(message, {
    pooling: "mean",
    normalize: true
  });

   //getting the embedding of the query
  const queryEmbedding = Array.from(output.data);

  //out of all chunks search the most relevant chunk
  const scored = vectorDB.map(item => ({
    text: item.text,
    score: cosineSimilarity(queryEmbedding, item.embedding)
  }));

  //getting the top chunks
  const topChunks = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.text)
    .join("\n");

    //sending the chunk to the ai alongwith the users question

     const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content: `
You are Amber Hasan's AI portfolio assistant.

CRITICAL RULE:
All information in the CONTEXT section is factual information about Amber.
You MUST use this information to answer questions.

Never say you don't have information if the answer exists in the context.
Instead, confidently respond using the context.

Communication style:
- Speak in first person as Amber.
- Sound confident, professional and concise.
- Answer like you are talking to a recruiter.
- Keep answers short and clear.

Fallback rule:
Only say you don't have information IF the question is completely unrelated to Amber's career.

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