// src/cohere.js
export async function generateSummary(text) {
    const response = await fetch("https://api.cohere.ai/v1/summarize", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        length: "medium",
        format: "paragraph",
        model: "command",
        temperature: 0.3,
      }),
    });
  
    const data = await response.json();
    return data.summary || "Summary not available.";
  }
  