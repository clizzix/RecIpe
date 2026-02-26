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
    const [recipeName, setRecipeName] = useState(
        localStorage.getItem('recipeName') || '',
    );
    const [imagePreview, setImagePreview] = useState(
        localStorage.getItem('recipeImage') || null,
    );

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImagePreview(null);
        localStorage.removeItem('recipeImage');
        if (document.getElementById('recipe-image-input')) {
            document.getElementById('recipe-image-input').value = '';
        }
    };

    const addIngredientToRecipe = (newIngredient) => {
        setRecipeIngredients([...recipeIngredients, newIngredient]);
    };

    const removeIngredient = (indexToRemove) => {
        setRecipeIngredients((prevIngredients) =>
            prevIngredients.filter((_, i) => i !== indexToRemove),
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

    const clearAll = () => {
        if (!window.confirm('Alles löschen?')) return;
        setRecipeIngredients([]);
        setRecipeName('');
        removeImage();
        toast.info('Alles geleert!');
    };

    useEffect(() => {
        localStorage.setItem('myRecipe', JSON.stringify(recipeIngredients));
        localStorage.setItem('recipeName', recipeName);
        if (imagePreview) localStorage.setItem('recipeImage', imagePreview);
    }, [recipeIngredients, recipeName, imagePreview]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!recipeName || recipeIngredients.length === 0) {
            return toast.warning('Bitte Namen angeben und Zutaten hinzufügen!');
        }
        const finalRecipe = {
            id: Date.now(),
            name: recipeName,
            image: imagePreview,
            ingredients: recipeIngredients,
            createdAt: new Date().toISOString(),
        };

        console.log('Rezept bereit zum Speichern:', finalRecipe);

        const history = JSON.parse(
            localStorage.getItem('recipeHistory') || '[]',
        );
        localStorage.setItem(
            'recipeHistory',
            JSON.stringify([finalRecipe, ...history]),
        );
        toast.success(`"${recipeName}" wurde im Rezeptblock gespeichert!`);
    };

    return (
        <div className="flex flex-col bg-base-300 max-w-5xl mx-auto p-8 gap-4 rounded-md shadow-md">
            <div className="flex justify-between items-center">
                <h1 className="font-extrabold text-3xl">Rezeptblock</h1>
                <button
                    onClick={clearAll}
                    className="btn btn-ghost btn-sm text-error"
                >
                    Neustart
                </button>
            </div>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="bg-base-100 p-6 rounded-xl shadow-sm flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Wie heißt dein Gericht?"
                        className="input input-bordered input-lg w-full font-bold"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                    />
                    <div className="flex flex-col items-center gap-4">
                        {!imagePreview ? (
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold">
                                        Foto hinzufügen
                                    </span>
                                </label>
                                <input
                                    id="recipe-image-input"
                                    type="file"
                                    accept="image/*"
                                    className="file-input file-input-bordered file-input-accent w-full"
                                    onChange={handleImageChange}
                                />
                            </div>
                        ) : (
                            <div className="relative group">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="rounded-lg w-full max-h-80 object-cover shadow-lg border-4 border-accent"
                                />
                                <button
                                    onClick={removeImage}
                                    className="btn btn-circle btn-error btn-sm absolute -top-2 -right-2"
                                >
                                    x
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <AddIngredientForm onAdd={addIngredientToRecipe} />
                <div className="bg-base-100 p-6 rounded-xl shadow-sm">
                    <h3 className="font-bold text-xl mb-4">Deine Zutaten</h3>
                    <ul className="space-y-3">
                        {recipeIngredients.map((ing, i) => (
                            <li
                                key={i}
                                className="flex justify-between items-center p-3 bg-base-200 rounded-lg"
                            >
                                <div>
                                    <p className="font-bold">
                                        {ing.product_name}
                                    </p>
                                    <div className="join mt-1">
                                        <input
                                            type="number"
                                            className="input input-bordered input-xs w-16 join-item"
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
                                            className="select select-bordered select-xs join-item"
                                            value={ing.displayUnit}
                                            onChange={(e) =>
                                                updateIngredient(i, {
                                                    displayUnit: e.target.value,
                                                })
                                            }
                                        >
                                            <option value="gram">g</option>
                                            <option value="cup">Tassen</option>
                                            <option value="tablespoon">
                                                EL
                                            </option>
                                            <option value="oz">oz</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeIngredient(i)}
                                    className="btn btn-ghost btn-circle text-error"
                                >
                                    <MdDelete size={20} />
                                </button>
                            </li>
                        ))}
                    </ul>
                    {recipeIngredients.length === 0 && (
                        <p className="text-center opacity-50 my-4">
                            Noch keine Zutaten...
                        </p>
                    )}
                </div>
                <RecipeSummary ingredients={recipeIngredients} />
                <button
                    type="submit"
                    className="btn btn-accent btn-lg shadow-lg"
                >
                    Rezept Speichern
                </button>
            </form>
        </div>
    );
};

export default RecipeBuilder;
