import React, { useEffect, useState } from 'react';
import AddIngredientForm from '../components/AddIngredientForm';
import RecipeSummary from '../components/RecipeSummary';
import { MdDelete } from 'react-icons/md';

const RecipeBuilder = () => {
    const [recipeIngredients, setRecipeIngredients] = useState(
        JSON.parse(localStorage.getItem('myRecipe') || '[]'),
    );

    const addIngredientToRecipe = (newIngredient) => {
        setRecipeIngredients([...recipeIngredients, newIngredient]);
    };

    const removeIngredient = (indexToRemove) => {
        // We filter the array: keep everything EXCEPT the item at this index
        setRecipeIngredients((prevIngredients) =>
            prevIngredients.filter((_, index) => index !== indexToRemove),
        );
    };

    useEffect(() => {
        localStorage.setItem('myRecipe', JSON.stringify(recipeIngredients));
    }, [recipeIngredients]);

    return (
        <div className="flex flex-col bg-base-300 max-w-5xl mx-auto p-8 gap-4 rounded-md shadow-md">
            <h1 className="font-extrabold text-3xl">Rezeptblock</h1>
            <form className="bg-base-100 p-4 flex flex-col items-center gap-4">
                <label htmlFor="picture" className="self-start font-bold">
                    Lade ein Bild deiner Mahlzeit hoch!
                </label>
                <input
                    name="picture"
                    type="file"
                    className="file-input file-input-accent w-full"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Rezeptname"
                    className="input w-full"
                />
            </form>

            <AddIngredientForm onAdd={addIngredientToRecipe} />
            <div className="recipe-content min-w-3xl p-8 justify-center">
                <h3 className="font-bold">Zutaten</h3>
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
                                className="btn btn-error text-white"
                            >
                                <MdDelete size={24} />
                            </button>
                        </li>
                    ))}
                </ul>

                {recipeIngredients.length === 0 && (
                    <p>
                        Keine Zutaten hinzugefügt! Wähle oben deine Nahrung
                        aus...
                    </p>
                )}
            </div>

            <RecipeSummary ingredients={recipeIngredients} />
        </div>
    );
};

export default RecipeBuilder;
