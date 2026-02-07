
import { GoogleGenAI, Type } from "@google/genai";
import { MaterialType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const verifyRecyclingImage = async (base64Image: string) => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `
    Analiza esta imagen de material para reciclar. 
    1. Identifica el material predominante entre: PET, PAPEL, CARTÓN, ALUMINIO, VIDRIO.
    2. Estima el peso aproximado en kilogramos basándote en la cantidad visible.
    3. Devuelve un objeto JSON con las propiedades: material (string), pesoEstimado (number), confianza (number de 0 a 1).
  `;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          material: { type: Type.STRING },
          pesoEstimado: { type: Type.NUMBER },
          confianza: { type: Type.NUMBER }
        },
        required: ['material', 'pesoEstimado', 'confianza']
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    return null;
  }
};

export const findNearbyEcoPlaces = async (lat: number, lng: number, query: string) => {
  const model = 'gemini-2.5-flash';
  
  const response = await ai.models.generateContent({
    model,
    contents: `Busca centros de reciclaje, negocios de economía circular y espacios sostenibles cerca de estas coordenadas: ${lat}, ${lng}. Consulta específica: ${query}`,
    config: {
      tools: [{ googleMaps: {} }],
      toolConfig: {
        retrievalConfig: {
          latLng: { latitude: lat, longitude: lng }
        }
      }
    }
  });

  // Extract URLs and basic info from grounding
  const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  return {
    text: response.text,
    places: chunks
  };
};
