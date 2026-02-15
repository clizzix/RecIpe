import React from 'react';

const IngredientCard = ({ ingredient }) => {
    return (
        <div className="card bg-base-300 w-96 shadow-md">
            <figure>
                <img
                    src={ingredient.image_url}
                    alt={ingredient.product_name}
                    className="w-full h-96 object-cover mask"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{ingredient.product_name}</h2>
                <p>{ingredient.brands}</p>
                <div className="card-actions justify-end">
                    {ingredient.labels
                        ?.split(',')
                        .slice(0, 3)
                        .map((label, i) => (
                            <span
                                key={i}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                            >
                                {label.trim()}
                            </span>
                        ))}
                </div>
                <div className="border-t pt-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Nährwerte (pro 100g)
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="bg-blue-50 p-2 rounded">
                            <p className="text-xs text-primary font-bold">
                                {Math.round(ingredient.nutriments.energy_100g)}
                                kcal
                            </p>
                            <p className="text-[10px] text-black uppercase">
                                Energy
                            </p>
                        </div>
                        <div className="bg-orange-50 p-2 rounded">
                            <p className="text-xs text-warning font-bold">
                                {ingredient.nutriments.fat_100g}g
                            </p>
                            <p className="text-[10px] text-black uppercase">
                                Fett
                            </p>
                        </div>
                        <div className="bg-red-50 p-2 rounded">
                            <p className="text-xs text-error font-bold">
                                {ingredient.nutriments.carbohydrates_100g}g /{' '}
                                {ingredient.nutriments.sugars_100g}g
                            </p>
                            <p className="text-[10px] text-black uppercase">
                                Carbs / Zucker
                            </p>
                        </div>
                        <div className="bg-green-50 p-2 rounded">
                            <p className="text-xs text-success font-bold">
                                {ingredient.nutriments.proteins_100g}g
                            </p>
                            <p className="text-[10px] text-black uppercase">
                                Protein
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IngredientCard;
