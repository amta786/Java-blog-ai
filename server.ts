import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini AI
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

// API Health
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "JavaCodePoint Server" });
});

// AI Chat & Explanation Endpoint
app.post("/api/ai/explain", async (req, res) => {
  try {
    const { prompt, code, type } = req.body;
    const ai = getAiClient();

    if (!ai) {
      // Fallback response if API key is not configured or in fallback mode
      let fallbackText = "";
      if (type === "explain") {
        fallbackText = `### Code Explanation\nThis Java code snippet demonstrates structural programming principles.\n- **Entry Point**: Execution starts in \`main(String[] args)\`.\n- **Logic Flow**: It processes the input variables, applies conditional branch checks or loops, and outputs the result using \`System.out.println()\`.\n- **Optimization Tip**: Ensure space complexity is minimized and edge cases (like null checks or empty arrays) are handled properly.`;
      } else if (type === "debug") {
        fallbackText = `### Debug & Fix Analysis\n- **Syntax / Logic Check**: Ensure all variable declarations match their data types.\n- **Common Catch**: Check for NullPointerException, ArrayIndexOutOfBoundsException, or unclosed resource streams.\n- **Suggested Fix**: Wrap dynamic operations in a try-catch block and print clear diagnostic logs.`;
      } else {
        fallbackText = `### AI Assistant Response\nHere is a clean Java implementation snippet based on your query:\n\`\`\`java\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("JavaCodePoint AI Assistant response for: " + "${prompt.replace(/"/g, '\\"').slice(0, 40)}");\n    }\n}\n\`\`\`\nFor further customization, add your GEMINI_API_KEY in the Secrets settings!`;
      }
      return res.json({ text: fallbackText });
    }

    let fullPrompt = "";
    if (type === "explain") {
      fullPrompt = `You are a Java and Web Development expert at JavaCodePoint. Explain the following code clearly for developers with step-by-step points, time complexity, and best practices:\n\n\`\`\`\n${code}\n\`\`\``;
    } else if (type === "debug") {
      fullPrompt = `You are an expert Java compiler and debugger. Analyze the following code for errors or potential bugs, explain the root cause, and provide the corrected code block:\n\n\`\`\`\n${code}\n\`\`\``;
    } else {
      fullPrompt = `You are JavaCodePoint's AI Coding Assistant. Help the developer with this query:\n\n${prompt}\n\n${code ? `Context code:\n\`\`\`\n${code}\n\`\`\`` : ''}`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
    });

    const text = response.text || "No response generated.";
    return res.json({ text });
  } catch (err: any) {
    console.error("AI Generation Error:", err);
    res.status(500).json({ error: "Failed to generate AI response: " + err?.message });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JavaCodePoint server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
