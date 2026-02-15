import React, { useMemo } from 'react';

const RecipeSummary = ({ ingredients }) => {
    // We use useMemo to calculate all totals in one pass for efficiency
    const totals = useMemo(() => {
        return ingredients.reduce(
            (acc, item) => {
                const weight = item.quantity || 0;
                const nuts = item.nutriments || {};

                // Helper to calculate (nutrient per 100g / 100) * weight
                const calc = (val) => ((val || 0) / 100) * weight;

                return {
                    calories: acc.calories + calc(nuts['energy-kcal_100g']),
                    fat: acc.fat + calc(nuts['fat_100g']),
                    carbs: acc.carbs + calc(nuts['carbohydrates_100g']),
                    sugar: acc.sugar + calc(nuts['sugars_100g']),
                    protein: acc.protein + calc(nuts['proteins_100g']),
                };
            },
            { calories: 0, fat: 0, carbs: 0, sugar: 0, protein: 0 },
        );
    }, [ingredients]);

    return (
        <div className="p-4">
            <h3 className="pb-2 font-bold">Gesamte Nährwerte</h3>

            <div className="grid grid-cols-2 gap-2">
                <p className="bg-primary p-4 shadow-md rounded-md">
                    <strong>Kalorien:</strong> {Math.round(totals.calories)}{' '}
                    kcal
                </p>
                <p className="bg-warning p-4 shadow-md rounded-md">
                    <strong>Fett:</strong> {totals.fat.toFixed(1)}g
                </p>
                <p className="bg-error p-4 shadow-md rounded-md">
                    <strong>Carbs / Zucker:</strong> {totals.carbs.toFixed(1)}g
                    /{totals.sugar.toFixed(1)}g
                </p>
                <p className="bg-success p-4 shadow-md rounded-md">
                    <strong>Protein:</strong> {totals.protein.toFixed(1)}g
                </p>
            </div>
        </div>
    );
};

export default RecipeSummary;
