export const runtime = "nodejs";
import fs from "fs";
import path from "path";
import Groq from "groq-sdk";

// Load portfolio knowledge base
const root = process.cwd();
const dataPath = path.join(root, "src", "data", "portfolio-data.json");
const portfolioData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

function getGroqClient() {
  if (!process.env.GROQ_API_KEY) {
    return null;
  }

  return new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}


// rewriting the query
async function rewriteQuery(groq, userMessage) {
  try {
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
  } catch {
    return userMessage;
  }
}

function getTopContextChunks(searchQuery) {
  const queryTerms = searchQuery
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(term => term.length > 2);

  const scored = portfolioData.map(item => {
    const text = item.text.toLowerCase();
    const score = queryTerms.reduce((sum, term) => {
      if (!text.includes(term)) return sum;
      const count = text.split(term).length - 1;
      return sum + count;
    }, 0);

    return {
      text: item.text,
      score,
    };
  });

  const topByScore = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.text)
    .join("\n");

  if (topByScore.trim()) {
    return topByScore;
  }

  return portfolioData.slice(0, 3).map(item => item.text).join("\n");
}


export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || !message.trim()) {
      return Response.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { error: "Chat service is not configured" },
        { status: 500 }
      );
    }

    const groq = getGroqClient();
    if (!groq) {
      return Response.json(
        { error: "Chat service is not configured" },
        { status: 500 }
      );
    }

    //  rewrite the query and then retrieve the top matching chunks
    const searchQuery = await rewriteQuery(groq, message);
    const topChunks = getTopContextChunks(searchQuery || message);

    //  ask the question to the llm with the context
    try {
      const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: `
You are Amber Hasan's AI portfolio assistant.

Speak in first person as Amber.

If the question is unrelated to Amber, striclty say i can't help you with that.
You MUST ONLY answer questions about:
- my projects
- my skills
- my experience
- my education
- my achievements

If the question is unrelated to my portfolio,
reply exactly with:

"I can only answer questions about Amber Hasan's portfolio"

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
    } catch {
      const fallback = topChunks.split("\n").filter(Boolean).slice(0, 2).join(" ");
      return Response.json({
        reply: fallback || "I can answer questions about Amber's skills, projects, and achievements."
      });
    }
  } catch (error) {
    console.error("/api/chat error:", error);
    return Response.json(
      { error: "Failed to generate chat response" },
      { status: 500 }
    );
  }
}
