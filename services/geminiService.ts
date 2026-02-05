import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let ai: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

const getAI = () => {
  if (!ai) {
    // Safety check for environment variables - using import.meta.env for Vite
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    
    if (!apiKey) {
      console.error("API Key is missing. Make sure VITE_GEMINI_API_KEY is set in your environment.");
    }
    
    ai = new GoogleGenAI({ apiKey: apiKey || 'MISSING_KEY' });
  }
  return ai;
};

export const initializeChat = (): void => {
  const client = getAI();
  try {
    chatSession = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  } catch (e) {
    console.error("Failed to initialize chat:", e);
  }
};

export const sendMessageToGemini = async (
  message: string, 
  onStream: (text: string) => void
): Promise<string> => {
  if (!chatSession) {
    initializeChat();
  }
  
  if (!chatSession) {
    return "Error: Chat session could not be initialized. Please check your API configuration.";
  }

  try {
    const resultStream = await chatSession.sendMessageStream({ message });
    
    let fullText = '';
    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse; 
      if (c.text) {
        fullText += c.text;
        onStream(fullText);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with the AI mentor. Please check your API key or connection.";
  }
};

export const generateTopicContent = async (topicTitle: string): Promise<string> => {
  const client = getAI();
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a detailed, interactive tutorial module for the topic: "${topicTitle}". 
      Include:
      1. Introduction & Intuition (Use analogies)
      2. Core Concepts
      3. Code Implementation (Python & C++)
      4. Time/Space Complexity Analysis
      5. Common Interview Questions (with hints)
      
      Format strictly in Markdown.`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    return response.text || "No content generated.";
  } catch (error) {
    console.error("Content Generation Error:", error);
    return `### Connection Error
    
Failed to load the lesson content for **${topicTitle}**.

**Possible reasons:**
1. API Key is missing or invalid.
2. Network connection issues.
3. The AI service is temporarily unavailable.

Please try refreshing the page or checking your configuration.`;
  }
};

export const analyzeCode = async (code: string): Promise<string> => {
  const client = getAI();
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze and "run" the following code conceptually. 
      If it's a complete snippet, predict the output. 
      If it has errors, point them out. 
      If it's an algorithm, explain the time/space complexity briefly.
      
      Code:
      \`\`\`
      ${code}
      \`\`\`
      
      Output format:
      **Output:** [Predicted Output]
      **Analysis:** [Brief Explanation]
      `,
    });
    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Code Analysis Error:", error);
    return "Failed to analyze code.";
  }
};