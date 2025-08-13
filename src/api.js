import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.`

const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    
    // Check if API key is available
    if (!import.meta.env.VITE_HF_ACCESS_TOKEN) {
        console.error("Hugging Face API key is missing")
        return "Sorry, API key is not configured. Please check your environment variables."
    }
    
    try {
        console.log("Attempting to generate recipe with ingredients:", ingredientsString)
        
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        
        console.log("API response received:", response)
        
        if (response && response.choices && response.choices[0] && response.choices[0].message) {
            return response.choices[0].message.content
        } else {
            console.error("Invalid response format:", response)
            return "Sorry, received an invalid response from the API."
        }
    } catch (err) {
        console.error("Error generating recipe:", err)
        console.error("Error details:", {
            message: err.message,
            status: err.status,
            statusText: err.statusText
        })
        
        if (err.message.includes("401")) {
            return "Sorry, API key is invalid or expired. Please check your Hugging Face token."
        } else if (err.message.includes("429")) {
            return "Sorry, too many requests. Please try again later."
        } else if (err.message.includes("500")) {
            return "Sorry, the AI service is currently unavailable. Please try again later."
        } else {
            return `Sorry, something went wrong: ${err.message}`
        }
    }
}
