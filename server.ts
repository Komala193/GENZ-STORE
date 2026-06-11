import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Express application
const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI on the server side
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. AI Assistant will operate in fallback mode.");
}

// Product list injected for context so the model recommends real products from the catalog
const STORE_PRODUCTS = [
  { id: "genz-varsity-01", name: "Hyper-Aesthetic Retro Varsity Jacket", price: 3499, category: "fashion", collections: ["Campus Life", "Weekend Vibes", "Street Style"], story: "Vintage retro layout and 3D patches." },
  { id: "genz-anc-phones", name: "Cyber-Sleek ANC Wireless Headphones", price: 6499, category: "gadgets", collections: ["Work Smart", "Creator Studio", "Gaming Universe"], story: "Active cancellation with beautiful matte finishes." },
  { id: "genz-cargos-02", name: "Techwear Modular Cargo Pant", price: 2499, category: "fashion", collections: ["Street Style", "Festival Fashion", "Travel Ready"], story: "Utility straps, nylon-tech water proof." },
  { id: "genz-pixel-art", name: "Pixel-Art Bluetooth Smart Display", price: 3999, category: "smart-living", collections: ["Smart Living", "Creator Studio", "Gaming Universe"], story: "Retro pixel art panel, desk visualizer." },
  { id: "genz-mech-keycap", name: "Aura-Glow Pastel Mechanical Keyboard", price: 4999, category: "gadgets", collections: ["Gaming Universe", "Creator Studio", "Work Smart"], story: "Prelubed lavender switches, acoustic marble tone." },
  { id: "genz-sunglasses-03", name: "Futuristic Cyberpunk Rimless Sunglasses", price: 1299, category: "accessories", collections: ["Street Style", "Festival Fashion", "Weekend Vibes"], story: "UV400 iridescent wraparound sunglasses." },
  { id: "genz-tech-bag", name: "Streamlined Hex-Shield Crossbody Bag", price: 1899, category: "accessories", collections: ["Street Style", "Travel Ready", "Campus Life"], story: "Carbon EVA paneling, USB charging ports." },
  { id: "genz-hydration-04", name: "Aesthetic Thermo Hydration Flask", price: 1499, category: "accessories", collections: ["Fitness Mode", "Campus Life", "Travel Ready"], story: "Vacuum steel, keeps iced chill for 36 hours." },
  { id: "genz-cam-06", name: "Retro Digital Vlog Camera & Camcorder", price: 5499, category: "gadgets", collections: ["Creator Studio", "Weekend Vibes", "Festival Fashion"], story: "4K photo sensor with Y2K retro textures." },
  { id: "genz-active-band", name: "Aura Smart Bio-Tracking Active Watch", price: 4499, category: "gadgets", collections: ["Fitness Mode", "Smart Living", "Work Smart"], story: "Stress monitor, bio-metrics tracking bezel." },
  { id: "genz-ambient-glow", name: "Intelligent Aura Neon Tube Lamp", price: 2299, category: "smart-living", collections: ["Smart Living", "Gaming Universe", "Creator Studio"], story: "Voice control reactive neon tube layout." },
  { id: "genz-cozy-hoodie", name: "Double-Weight Oversized Lofi Hoodie", price: 2299, category: "fashion", collections: ["Campus Life", "Street Style", "Weekend Vibes"], story: "480GSM premium organic cotton, drawstring-free." }
];

// AI Assistant endpoint
app.post("/api/ai/assistant", async (req, res) => {
  const { prompt, chatHistory = [] } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided in client body." });
  }

  // Fallback if client or api keys are missing
  if (!aiClient) {
    const staticFallbacks: Record<string, string> = {
      default: "Hey there! I'm your GENZ Assistant. Since your Gemini API key key is not currently linked in the secrets yet, here is a quick tip: Try combining our **Double-Weight Heavyweight Oversized Lofi Hoodie** with the **Rimless Cyberpunk Sunglasses** for high-energy streetwear aesthetics, or get the **ANC Headphones** for heavy focus! Drop your feedback here anytime.",
      college: "Aesthetic campus outfit incoming! Try pairing our **Double-Weight Oversized Lofi Hoodie** (Oatmeal colorway) with the **Techwear Modular Cargo Pants** and your favorite retro sneakers. Complete the look with the **Aesthetic Thermo Hydration Flask** on your desk. Absolute classic!",
      gaming: "Neon gaming desk vibe check! Get the **Aura-Glow Pastel Mechanical Keyboard** (the linear sound is pristine) and position the reactive **Intelligent Aura Neon Tube Lamp** in your corner. Track the frames and sync visually with our **Pixel-Art Bluetooth Smart Display**! This setup absolute slays.",
      travel: "For the ultimate stealth travel vibe: Grab the geometric **Streamlined Hex-Shield Crossbody Bag** (keeps chargers and tablet locked down), wear our comfortable **Techwear Cargo Pants**, block ambient engine hums with **Cyber-Sleek ANC Wireless Headphones**, and sip pristine cold water from our **Thermo Hydration Flask**.",
      gadgets: "Smart living and content-creator hacks: Mount the **Retro Digital Camcorder** on your desktop to record lo-fi desk updates, keep notifications pinned to the **Pixel-Art Bluetooth Smart Display**, and bio-track your active burnout rates using **Aura Smart Bio-Tracking Watch**."
    };

    let matchedFallback = staticFallbacks.default;
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes("college") || lowerPrompt.includes("outfit") || lowerPrompt.includes("campus") || lowerPrompt.includes("school")) {
      matchedFallback = staticFallbacks.college;
    } else if (lowerPrompt.includes("game") || lowerPrompt.includes("gaming") || lowerPrompt.includes("setup")) {
      matchedFallback = staticFallbacks.gaming;
    } else if (lowerPrompt.includes("travel") || lowerPrompt.includes("trip") || lowerPrompt.includes("essential")) {
      matchedFallback = staticFallbacks.travel;
    } else if (lowerPrompt.includes("gadget") || lowerPrompt.includes("smart") || lowerPrompt.includes("creator")) {
      matchedFallback = staticFallbacks.gadgets;
    }

    return res.json({
      text: matchedFallback,
      recommendedProductIds: getProductIdsFromText(matchedFallback)
    });
  }

  try {
    const sysInstruction = `You are the GENZ Fashion Store AI Personal Stylist. Your goals are to recommend stunning streetwear combinations, productivity arrays, travel bags, and gaming room aesthetics.
You speak in a friendly, enthusiastic, highly stylish tone, peppered with tasteful modern slang (e.g. aesthetic, slay, drip, main character vibes, low-key, hype, rent-free, absolute classic) but always remaining premium and polite.
Do not overwhelm with emojis, use about 2-3 maximum.
CRITICAL: You MUST ONLY recommend actual products that exist in our store inventory catalog. Refer to them exact by name and highlight how they integrate into user's lifestyle.

Our Store Inventory:
${JSON.stringify(STORE_PRODUCTS, null, 2)}

Provide actionable outfit setups or tech/lifestyle packages with prices. Mention item IDs when discussing, separating them clearly in bold letters. Keep your response around 120-180 words.`;

    const chatSession = aiClient.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: sysInstruction,
        temperature: 0.85,
      },
    });

    // Populate existing history if present
    if (chatHistory && chatHistory.length > 0) {
      // Direct integration or simple chat loop
    }

    const response = await chatSession.sendMessage({ message: prompt });
    const outputText = response.text || "I'm sliding in empty handed! Let's check matching collection cards below.";
    
    // Automatically extract product ID references from the generated text
    const recommendedProductIds = getProductIdsFromText(outputText);

    return res.json({
      text: outputText,
      recommendedProductIds
    });

  } catch (error: any) {
    console.error("Gemini API Error in helper route:", error);
    res.status(500).json({ error: error.message || "Something went south in the generative styling loop." });
  }
});

// Helper function to scan text for product IDs to bundle products alongside the response
function getProductIdsFromText(text: string): string[] {
  const possibleIds = [
    "genz-varsity-01",
    "genz-anc-phones",
    "genz-cargos-02",
    "genz-pixel-art",
    "genz-mech-keycap",
    "genz-sunglasses-03",
    "genz-tech-bag",
    "genz-hydration-04",
    "genz-cam-06",
    "genz-active-band",
    "genz-ambient-glow",
    "genz-cozy-hoodie"
  ];
  const matched: string[] = [];
  const lowerText = text.toLowerCase();
  for (const id of possibleIds) {
    // Check if ID matches directly or if parts of the name match
    if (lowerText.includes(id.toLowerCase())) {
      matched.push(id);
    } else {
      // support text-based fuzzy name mentions
      if (id === "genz-varsity-01" && (lowerText.includes("varsity") || lowerText.includes("jacket"))) matched.push(id);
      if (id === "genz-anc-phones" && (lowerText.includes("headphone") || lowerText.includes("headphones") || lowerText.includes("anc"))) matched.push(id);
      if (id === "genz-cargos-02" && (lowerText.includes("cargo") || lowerText.includes("cargos") || lowerText.includes("pants"))) matched.push(id);
      if (id === "genz-pixel-art" && (lowerText.includes("pixel") || lowerText.includes("pixel-art") || lowerText.includes("smart display"))) matched.push(id);
      if (id === "genz-mech-keycap" && (lowerText.includes("keyboard") || lowerText.includes("keycap") || lowerText.includes("keyboards"))) matched.push(id);
      if (id === "genz-sunglasses-03" && (lowerText.includes("sunglass") || lowerText.includes("sunglasses") || lowerText.includes("cyberpunk sunglasses"))) matched.push(id);
      if (id === "genz-tech-bag" && (lowerText.includes("sling") || lowerText.includes("crossbody") || lowerText.includes("hex-shield"))) matched.push(id);
      if (id === "genz-hydration-04" && (lowerText.includes("flask") || lowerText.includes("bottle") || lowerText.includes("hydration"))) matched.push(id);
      if (id === "genz-cam-06" && (lowerText.includes("camera") || lowerText.includes("camcorder") || lowerText.includes("vlog"))) matched.push(id);
      if (id === "genz-active-band" && (lowerText.includes("watch") || lowerText.includes("smart watch") || lowerText.includes("bio-tracking"))) matched.push(id);
      if (id === "genz-ambient-glow" && (lowerText.includes("neon") || lowerText.includes("lamp") || lowerText.includes("neon tube"))) matched.push(id);
      if (id === "genz-cozy-hoodie" && (lowerText.includes("hoodie") || lowerText.includes("lofi hoodie") || lowerText.includes("pullover"))) matched.push(id);
    }
  }
  // Deduplicate array
  const uniqueMatched = Array.from(new Set(matched));
  // If matched of size is empty, provide a couple of awesome recommendations
  if (uniqueMatched.length === 0) {
    return ["genz-cozy-hoodie", "genz-anc-phones"];
  }
  return uniqueMatched;
}

// Integrated Dev and Production Middleware setup for Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite developer server mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app._router.get("*all", (req: express.Request, res: express.Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GENZ Fashion Store Full-Stack server running on port ${PORT}`);
  });
}

startServer();
