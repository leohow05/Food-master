import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialize Gemini client to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required for search features.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API Endpoint: Search Real-world Recipes on the Internet (Google Search Grounding)
app.post("/api/search-recipes", async (req, res) => {
  try {
    const { recipeTitle } = req.body;
    if (!recipeTitle) {
      return res.status(400).json({ error: "recipeTitle is required" });
    }

    const ai = getGeminiClient();
    const prompt = `Find 4-5 real-world cooking recipes, video tutorials, or cooking blogs on the internet for "${recipeTitle}". 
For each recipe, describe what makes it special in 1 sentence. Make sure to provide authentic sources.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const summary = response.text || "No summary generated.";
    
    // Extract grounding sources
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .map((chunk: any) => {
        if (chunk.web) {
          return {
            title: chunk.web.title || "Grounded Resource",
            url: chunk.web.uri || "",
          };
        }
        return null;
      })
      .filter((source) => source !== null && source.url);

    // Filter duplicates
    const uniqueSources: { title: string; url: string }[] = [];
    const seenUrls = new Set<string>();
    for (const src of sources) {
      if (src && !seenUrls.has(src.url)) {
        seenUrls.add(src.url);
        uniqueSources.push(src);
      }
    }

    res.json({
      summary,
      sources: uniqueSources,
    });
  } catch (error: any) {
    console.error("Gemini Search Grounding Error:", error);
    res.status(500).json({
      error: error.message || "Failed to fetch real-world recipes.",
    });
  }
});

// 2. Vite Integration for development / static server for production
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Error setting up Vite middleware:", err);
});
