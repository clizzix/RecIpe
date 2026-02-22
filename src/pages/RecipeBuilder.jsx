import { useEffect, useState } from 'react';
import AddIngredientForm from '../components/AddIngredientForm';
import RecipeSummary from '../components/RecipeSummary';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import { convertToGrams } from '../services/utils';

const RecipeBuilder = () => {
    const [recipeIngredients, setRecipeIngredients] = useState(
        JSON.parse(localStorage.getItem('myRecipe') || '[]'),
    );
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        document.getElementById('recipe-image-input').value = '';
    };

    const addIngredientToRecipe = (newIngredient) => {
        setRecipeIngredients([...recipeIngredients, newIngredient]);
    };

    const removeIngredient = (indexToRemove) => {
        setRecipeIngredients((prevIngredients) =>
            prevIngredients.filter((_, index) => index !== indexToRemove),
        );
        toast.error('Zutat entfernt!');
    };

    const updateIngredient = (index, updates) => {
        setRecipeIngredients((prev) =>
            prev.map((ing, i) => {
                if (i === index) {
                    const updatedIng = { ...ing, ...updates };
                    updatedIng.quantity = convertToGrams(
                        updatedIng.displayQuantity,
                        updatedIng.displayUnit,
                    );
                    return updatedIng;
                }
                return ing;
            }),
        );
    };

    const clearAllIngredients = () => {
        if (recipeIngredients.length === 0) return;

        if (
            window.confirm(
                'Bist du sicher, dass du die ganze Liste löschen möchtest=',
            )
        ) {
            setRecipeIngredients([]);
            setImagePreview(null);
            toast.info('Liste wurde geleert!', {
                position: 'bottom-right',
                autoClose: 2000,
                theme: 'dark',
            });
        }
    };

    useEffect(() => {
        localStorage.setItem('myRecipe', JSON.stringify(recipeIngredients));
    }, [recipeIngredients]);

    return (
        <div className="flex flex-col bg-base-300 max-w-5xl mx-auto p-8 gap-4 rounded-md shadow-md">
            <h1 className="font-extrabold text-3xl">Rezeptblock</h1>
            <form className="bg-base-100 p-4 flex flex-col items-center gap-4">
                <label
                    htmlFor="picture"
                    className="self-start font-bold text-lg"
                >
                    Lade ein Bild deiner Mahlzeit hoch!
                </label>
                <input
                    id="recipe-image-input"
                    name="picture"
                    type="file"
                    className="file-input file-input-bordered file-input-accent w-full"
                    onChange={handleImageChange}
                />

                {imagePreview && (
                    <div className="relative w-full max-w-md mt-2">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="rounded-lg w-full h-64 object-cover shadow-md border-4 border-accent"
                        />
                        <button
                            onClick={removeImage}
                            className="btn btn-circle btn-error btn-sm absolute -top-2 -right-2 shadow-lg"
                        >
                            x
                        </button>
                    </div>
                )}
                <input
                    id="name"
                    type="text"
                    name="name"
                    autoComplete="off"
                    placeholder="Rezeptname"
                    className="input w-full"
                />
            </form>

            <AddIngredientForm onAdd={addIngredientToRecipe} />
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl">Zutaten</h3>
                {recipeIngredients.length > 0 && (
                    <button
                        onClick={clearAllIngredients}
                        className="btn btn-outline btn-error btn-sm"
                    >
                        Liste leeren
                    </button>
                )}
            </div>
            <div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {recipeIngredients.map((ing, i) => (
                        <li
                            key={i}
                            className="flex justify-between items-center p-4 border-b border-base-100 bg-base-200 rounded-lg mb-2"
                        >
                            <div className="flex flex-col gap-1">
                                <strong className="text-lg">
                                    {ing.product_name}
                                </strong>
                                <div className="join items-center">
                                    <input
                                        type="number"
                                        className="input input-bordered input-sm w-20 join-item"
                                        value={ing.displayQuantity}
                                        onChange={(e) =>
                                            updateIngredient(i, {
                                                displayQuantity: Number(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                    />
                                    <select
                                        className="select select-bordered select-sm join-item"
                                        value={ing.displayUnit}
                                        onChange={(e) =>
                                            updateIngredient(i, {
                                                displayUnit: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="gramm">g</option>
                                        <option value="cups">Tassen</option>
                                        <option value="tablespoon">
                                            Teelöffel
                                        </option>
                                        <option value="oz">Unzen</option>
                                    </select>
                                    <span className="bg-base-100 px-3 py-1 text-xs font-semibold join-item border border-base-300">
                                        {ing.displayUnit}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => removeIngredient(i)}
                                className="btn btn-ghost btn-circle text-error"
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
            <button type="submit" className="btn btn-accent m-2">
                Submit
            </button>
        </div>
    );
};

export default RecipeBuilder;
