import React, { useState } from 'react';
import AddIngredientForm from '../components/AddIngredientForm';
import RecipeSummary from '../components/RecipeSummary';

const RecipeBuilder = () => {
    const [recipeIngredients, setRecipeIngredients] = useState([]);

    const addIngredientToRecipe = (newIngredient) => {
        setRecipeIngredients([...recipeIngredients, newIngredient]);
    };

    const removeIngredient = (indexToRemove) => {
        // We filter the array: keep everything EXCEPT the item at this index
        setRecipeIngredients((prevIngredients) =>
            prevIngredients.filter((_, index) => index !== indexToRemove),
        );
    };

    return (
        <div className="App">
            <h1>My Recipe Builder</h1>

            <AddIngredientForm onAdd={addIngredientToRecipe} />
            <div className="recipe-content">
                <h3>Ingredients List</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {recipeIngredients.map((ing, i) => (
                        <li
                            key={i}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px',
                                borderBottom: '1px solid #eee',
                            }}
                        >
                            <div>
                                <strong>{ing.product_name}</strong>
                                <span
                                    style={{
                                        marginLeft: '10px',
                                        color: '#666',
                                    }}
                                >
                                    {ing.displayQuantity} {ing.displayUnit}
                                </span>
                            </div>

                            <button
                                onClick={() => removeIngredient(i)}
                                style={{
                                    backgroundColor: '#ff4d4d',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '5px 10px',
                                    cursor: 'pointer',
                                }}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>

                {recipeIngredients.length === 0 && (
                    <p>No ingredients added yet. Start searching above!</p>
                )}
            </div>

            <RecipeSummary ingredients={recipeIngredients} />
        </div>
    );
};

export default RecipeBuilder;
