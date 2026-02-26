import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import { MdDelete, MdRestaurantMenu, MdAdd } from 'react-icons/md';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
        const savedRecipe = JSON.parse(
            localStorage.getItem('myRecipe') || '[]',
        );
        const savedHistory = JSON.parse(
            localStorage.getItem('recipeHistory') || '[]',
        );
        setUserData(savedUser);
        setIngredients(savedRecipe);
        setHistory(savedHistory);
    }, []);

    const recipeKcal = useMemo(() => {
        return ingredients.reduce((acc, item) => {
            const kcal = item.nutriments?.['energy-kcal_100g'] || 0;
            return acc + (kcal / 100) * (item.quantity || 0);
        }, 0);
    }, [ingredients]);

    const dailyGoal = userData?.calories ? parseInt(userData.calories) : 0;
    const percentage = dailyGoal > 0 ? (recipeKcal / dailyGoal) * 100 : 0;
    const isOverLimit = percentage > 100;

    const deleteFromHistory = (id) => {
        const updated = history.filter((r) => r.id !== id);
        setHistory(updated);
        localStorage.setItem('recipeHistory', JSON.stringify(updated));
    };
    if (!userData) {
        return (
            <div className="hero min-h-[60vh] bg-base-200 rounded-box">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Willkommen!</h1>
                        <p className="py-6">
                            Erstelle zuerst dein Profil, um dein tägliches
                            Kalorienziel zu tracken.
                        </p>
                        <Link
                            title="User"
                            to="/user"
                            className="btn btn-primary"
                        >
                            Profil erstellen
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black">
                        Hallo, {userData.name}! 👋
                    </h1>
                    <p className="text-gray-500">
                        Hier ist dein aktueller Status.
                    </p>
                </div>
                <div className="badge badge-accent badge-outline p-4 font-bold">
                    {userData.weight} kg
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kalorien-Fortschritt */}
                <div className="card bg-base-100 shadow-xl border border-base-300">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title mb-4">Tagesziel-Check</h2>

                        {/* Radial Progress (DaisyUI) */}
                        <div
                            className={`radial-progress ${isOverLimit ? 'text-error' : 'text-primary'}`}
                            style={{
                                '--value': Math.min(percentage, 100),
                                '--size': '12rem',
                                '--thickness': '1rem',
                            }}
                            role="progressbar"
                        >
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold">
                                    {Math.round(recipeKcal)}
                                </span>
                                <span className="text-xs">
                                    von {dailyGoal} kcal
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <p className="text-sm font-medium">
                                {isOverLimit
                                    ? '⚠️ Du überschreitest dein Ziel!'
                                    : `Du hast noch ${Math.round(dailyGoal - recipeKcal)} kcal übrig.`}
                            </p>
                            <progress
                                className={`progress w-56 ${isOverLimit ? 'progress-error' : 'progress-primary'}`}
                                value={Math.min(percentage, 100)}
                                max="100"
                            ></progress>
                        </div>
                    </div>
                </div>

                {/* Schnell-Info Statistiken */}
                <div className="flex flex-col gap-6">
                    <div className="stats shadow bg-primary text-primary-content">
                        <div className="stat">
                            <div className="stat-title text-primary-content opacity-70">
                                Im Builder:
                            </div>
                            <div className="stat-value text-3xl">
                                {ingredients.length} Zutaten
                            </div>
                            <div className="stat-actions">
                                <Link
                                    to="/recipebuilder"
                                    className="btn btn-sm"
                                >
                                    Weiter kochen
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="card bg-base-100 shadow-xl border border-base-300">
                        <div className="card-body">
                            <h2 className="card-title text-sm uppercase opacity-50">
                                Tagesbudget
                            </h2>
                            <p>
                                <strong>Ziel:</strong> {dailyGoal} kcal / Tag
                            </p>
                            <p>
                                <strong>E-Mail:</strong> {userData.email}
                            </p>
                            <div className="card-actions justify-end mt-4">
                                <Link
                                    to="/user"
                                    className="btn btn-ghost btn-xs underline"
                                >
                                    Ziel ändern
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="space-y-6">
                <div className="flex flex-col justify-between items-center border-b pb-4 border-base-300">
                    <h2 className="text-3xl font-black flex items-center gap-2">
                        <MdRestaurantMenu />
                        Deine Sammlung
                    </h2>
                    <span className="badge badge-ghost font-mono">
                        {history.length} Rezepte
                    </span>

                    {history.length === 0 ? (
                        <div className="text-center py-10 bg-base-200 rounded-xl border-2 border-dashed border-base-300">
                            <p className="opacity-50 italic">
                                Deine Sammlung ist noch leer. Speichere Rezepte
                                im Builder!
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {history.map((recipe) => (
                                <div
                                    key={recipe.id}
                                    className="card bg-base-100 shadow-xl image-full group"
                                >
                                    <figure>
                                        <img
                                            src={
                                                recipe.image ||
                                                'https://via.placeholder.com/400x300?text=Lecker'
                                            }
                                            alt={recipe.name}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                        />
                                    </figure>
                                    <div className="card-body justify-between">
                                        <div className="flex justify-between items-start">
                                            <h2 className="card-title text-white drop-shadow-lg">
                                                {recipe.name}
                                            </h2>
                                            <button
                                                onClick={() =>
                                                    deleteFromHistory(recipe.id)
                                                }
                                                className="btn btn-circle btn-xs btn-error shadow-lg"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-secondary font-bold shadow-md">
                                                {recipe.ingredients.length}{' '}
                                                Zutaten
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
