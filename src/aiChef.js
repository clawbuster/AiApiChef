import Anthropic from "@anthropic-ai/sdk"
import { InferenceClient } from '@huggingface/inference';



const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`


// for claude api:
// const anthropic = new Anthropic({
//     apiKey: process.env.ANTHROPIC_API_KEY,

//     dangerouslyAllowBrowser: true,
// })

// export async function getRecipeFromChefClaude(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")

//     const msg = await anthropic.messages.create({
//         model: "claude-3-haiku-20240307",
//         max_tokens: 1024,
//         system: SYSTEM_PROMPT,
//         messages: [
//             { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//         ],
//     });
//     return msg.content[0].text
// }

const hf = new InferenceClient(import.meta.env.VITE_HF_API_KEY)

export async function getRecipeFromMistral(ingredientsArr) {
    const apiKey = import.meta.env.VITE_HF_API_KEY;
    
    console.log("API Key in function:", apiKey);
    console.log("API Key length:", apiKey?.length);
    
    const hf = new InferenceClient(apiKey);
    
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mistral-7B-Instruct-v0.2",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error("Full error:", err)
        console.error("Error message:", err.message)
    }
}

export async function getRecipeFromClaudeFree(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

  console.log("API Key in function:", apiKey);
  console.log("API Key length:", apiKey?.length);

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "Recipe Assistant App"
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-haiku",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe!` }
      ]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("OpenRouter API Error:", data);
    throw new Error(`OpenRouter API error (${response.status}): ${data.error?.message || "Unknown error"}`);
  }

  if (!data.choices || !data.choices.length) {
    console.error("Unexpected response:", data);
    return "Sorry, something went wrong generating your recipe.";
  }

  return data.choices[0].message.content;
}


