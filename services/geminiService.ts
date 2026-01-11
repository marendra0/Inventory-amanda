
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

// The API key must be obtained exclusively from the environment variable process.env.API_KEY.

export const analyzeProductImage = async (base64Image: string) => {
  // Use process.env.API_KEY directly when initializing the GoogleGenAI client instance.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: base64Image,
    },
  };

  const promptPart = {
    text: "Analyze this product image and provide: name, category, estimated price, and a short description. Return as JSON."
  };

  const response = await ai.models.generateContent({
    // Use gemini-3-flash-preview for vision tasks as per guidelines.
    model: 'gemini-3-flash-preview',
    contents: { parts: [imagePart, promptPart] },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          category: { type: Type.STRING },
          estimatedPrice: { type: Type.NUMBER },
          description: { type: Type.STRING },
        },
        required: ["name", "category", "estimatedPrice", "description"]
      }
    }
  });

  // Extract text content by accessing the .text property (not a method).
  return JSON.parse(response.text || '{}');
};

export const getInventoryInsights = async (products: Product[]) => {
  // Use process.env.API_KEY directly when initializing the GoogleGenAI client instance.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const productSummary = products.map(p => 
    `${p.name} (${p.category}): Qty ${p.quantity}, MinStock ${p.minStock}, Price $${p.price}`
  ).join('\n');

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Acting as an expert inventory manager, analyze this inventory data and provide 3 key insights or recommendations for optimization:
    
    ${productSummary}
    
    Provide your response in a clear, concise bullet-point format.`,
  });

  // Extract text content by accessing the .text property (not a method).
  return response.text;
};
