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
                    sugar: acc.sugar + calc(nuts['sugars_100g']),
                    protein: acc.protein + calc(nuts['proteins_100g']),
                };
            },
            { calories: 0, fat: 0, sugar: 0, protein: 0 },
        );
    }, [ingredients]);

    return (
        <div
            style={{
                padding: '20px',
                border: '1px solid #ddd',
                borderRadius: '8px',
            }}
        >
            <h3>Gesamte Nährwerte</h3>
            <hr />
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                }}
            >
                <p>
                    <strong>Kalorien:</strong> {Math.round(totals.calories)}{' '}
                    kcal
                </p>
                <p>
                    <strong>Fett:</strong> {totals.fat.toFixed(1)}g
                </p>
                <p>
                    <strong>Zucker:</strong> {totals.sugar.toFixed(1)}g
                </p>
                <p>
                    <strong>Protein:</strong> {totals.protein.toFixed(1)}g
                </p>
            </div>
        </div>
    );
};

export default RecipeSummary;
