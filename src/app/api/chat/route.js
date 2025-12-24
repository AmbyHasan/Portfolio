import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    // 🔹 Read resume.md
    const resumePath = path.join(
      process.cwd(),
      "src",
      "data",
      "resume.md"
    );

    const resumeText = fs.readFileSync(resumePath, "utf-8");

    // 🔹 Groq Chat Completion
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content: `
You are Amber Hasan's portfolio assistant.

Rules:
- Answer ONLY using the resume content below.
- If the answer is not present in the resume  , then answer the question by youself only if the question is relevant otherwise say,
"Sorry , i do not have any idea about that."
  
- Be concise, professional, and friendly.

Resume:
${resumeText}
          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return new Response(
      JSON.stringify({
        reply: completion.choices[0].message.content,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Chat API error:", error);

    return new Response(
      JSON.stringify({ error: "Failed to generate response" }),
      { status: 500 }
    );
  }
}
