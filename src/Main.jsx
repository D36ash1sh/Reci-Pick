import React from "react"
import { getRecipeFromMistral } from "./api"
import ReactMarkdown from "react-markdown"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState("")

    const ingredientsListItems = ingredients.map((ingredient) => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        if (newIngredient && !ingredients.includes(newIngredient)) {
            setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
        }
    }

    async function handleGetRecipe() {
        setLoading(true)
        setRecipe("")
        setError("")
        try {
            const result = await getRecipeFromMistral(ingredients)
            if (result.includes("Sorry, something went wrong")) {
                setError("Unable to generate recipe. Please check your internet connection and try again.")
            } else {
                setRecipe(result)
            }
        } catch (err) {
            setError("Failed to generate recipe. Please try again later.")
        }
        setLoading(false)
    }

    return (
        <main>
            <form action={addIngredient} className="add-form">
                <input
                    type="text"
                    placeholder="E.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && (
                <section>
                    <h2>Ingredients on hand:</h2>
                    <ul className="ingredients-list" aria-live="polite">
                        {ingredientsListItems}
                    </ul>

                    {ingredients.length > 4 && (
                        <div className="get-recipe-container">
                            <div>
                                <h3>Ready for a recipe?</h3>
                                <p>Generate a recipe from your list of ingredients.</p>
                            </div>
                            <button onClick={handleGetRecipe} disabled={loading}>
                                {loading ? "Generating..." : "Get a recipe"}
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="recipe-output error">
                            <h3>Error</h3>
                            <p>{error}</p>
                        </div>
                    )}

                    {recipe && (
                        <div className="recipe-output">
                            <h3>Your Recipe</h3>
                            <ReactMarkdown>{recipe}</ReactMarkdown>
                        </div>
                    )}
                </section>
            )}
        </main>
    )
}
