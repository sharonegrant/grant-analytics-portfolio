import { GoogleGenAI } from "@google/genai";
import { SHARON_RESUME_CONTEXT } from '../constants';

// Initialize Gemini Client
// Note: In a real production environment, this should be a backend proxy to protect the key.
// For this demo, we assume the key is in the environment variables or we fallback to simulation.
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Simulates a response if API is not available or fails.
 */
const simulateResponse = (type: 'cleaning' | 'insight' | 'chat', input: string): string => {
  if (type === 'cleaning') {
    return JSON.stringify([
      { "date": "2024-01-01", "region": "North America", "revenue": 12000, "status": "VERIFIED" },
      { "date": "2024-01-02", "region": "Unknown", "revenue": 0, "status": "FLAGGED_MISSING_DATA" }
    ], null, 2);
  } 
  
  if (type === 'insight') {
    return "Analyzed 3 key metrics. **Critical Insight:** While 'Search' acquisition is up 12%, the **Churn Risk (4.2%)** is trending negatively in the EMEA region. Recommendation: Shift $15k from the 'Awareness' budget to 'Customer Success' retention programs immediately to protect LTV.";
  }

  // Fallback chat logic
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes("experience") || lowerInput.includes("work") || lowerInput.includes("history") || lowerInput.includes("mit")) {
    return "I am currently an Executive Support Assistant at MIT Investment Management Company (MITIMCo), supporting a $30B+ portfolio. Previously, I was a Senior Real Estate Analyst at Coldwell Banker where I improved pricing accuracy by 12% using predictive models.";
  } else if (lowerInput.includes("skill") || lowerInput.includes("tech") || lowerInput.includes("python") || lowerInput.includes("sql")) {
    return "My technical stack includes Python (Pandas, NumPy, scikit-learn), SQL, Tableau, Power BI, and Gurobi for optimization. I'm also an expert in enterprise platforms like Salesforce, Workday, and Coupa.";
  } else if (lowerInput.includes("education") || lowerInput.includes("degree") || lowerInput.includes("school")) {
    return "I hold a Master of Science in Business Analytics from Suffolk University (2025) and a BS in Business Management from Northeastern University.";
  } else if (lowerInput.includes("contact") || lowerInput.includes("email")) {
    return "You can reach me at emailsharongrant@gmail.com or connect with me on LinkedIn.";
  }
  
  return "I specialize in bridging technical data pipelines with executive decision making. I've managed $100M+ in combined budgets and have strong experience with AWS and ETL processes.";
};

export const chatWithGemini = async (message: string): Promise<string> => {
  if (!ai) return new Promise(resolve => setTimeout(() => resolve(simulateResponse('chat', message)), 1000));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SHARON_RESUME_CONTEXT,
      }
    });
    return response.text || "I'm having trouble connecting to my knowledge base right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return simulateResponse('chat', message);
  }
};

export const cleanDataWithGemini = async (rawData: string): Promise<string> => {
  if (!ai) return new Promise(resolve => setTimeout(() => resolve(simulateResponse('cleaning', rawData)), 1500));

  try {
    const prompt = `
      You are a data cleaning agent. 
      Extract the following unstructured text into a strict JSON array.
      Each object must have: date (YYYY-MM-DD), region (string), revenue (number), status (string).
      If data is missing, mark status as 'FLAGGED_MISSING_DATA', otherwise 'VERIFIED'.
      Return ONLY raw JSON, no markdown formatting.
      
      Raw Text: ${rawData}
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });
    
    return response.text || "[]";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return simulateResponse('cleaning', rawData);
  }
};

export const generateInsightWithGemini = async (): Promise<string> => {
  if (!ai) return new Promise(resolve => setTimeout(() => resolve(simulateResponse('insight', '')), 1500));

  try {
    const prompt = `
      Analyze the following dashboard metrics for a business analytics portfolio:
      - Customer LTV: $2,850 (+12.5% YoY)
      - Churn Risk: 4.2% (+0.8% Alert)
      - Data Coverage: 99.8% (Stable)
      
      Provide a concise executive summary (max 40 words) identifying the critical risk and a specific recommendation. 
      Use bolding for key terms.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return simulateResponse('insight', '');
  }
};