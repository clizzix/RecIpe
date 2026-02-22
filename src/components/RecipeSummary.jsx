import React, { useMemo } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';

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

    const chartData = [
        {
            name: 'Fett',
            value: parseFloat(totals.fat.toFixed(1)),
            color: '#FBBD23',
        },
        {
            name: 'Carbs',
            value: parseFloat(totals.carbs.toFixed(1)),
            color: '#F87272',
        },
        {
            name: 'Protein',
            value: parseFloat(totals.protein.toFixed(1)),
            color: '#36D399',
        },
    ];

    return (
        <div className="card bg-base-100 shadow-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-center">
                Ernährungsübersicht
            </h3>

            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                {/* Visual Chart */}
                <div className="w-full h-64 md:w-1/2 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Calorie Overlay in the center of the donut */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-2xl font-black">
                            {Math.round(totals.calories)}
                        </span>
                        <span className="text-xs uppercase opacity-60">
                            kcal
                        </span>
                    </div>
                </div>

                {/* Modern DaisyUI Stats */}
                <div className="stats stats-vertical shadow bg-base-200 w-full md:w-auto">
                    <div className="stat">
                        <div className="stat-title">Zucker</div>
                        <div className="stat-value text-error text-2xl">
                            {totals.sugar.toFixed(1)}g
                        </div>
                        <div className="stat-desc">
                            von {totals.carbs.toFixed(1)}g Carbs
                        </div>
                    </div>
                    <div className="stat">
                        <div className="stat-title">Protein Anteil</div>
                        <div className="stat-value text-success text-2xl">
                            {totals.calories > 0
                                ? (
                                      ((totals.protein * 4) / totals.calories) *
                                      100
                                  ).toFixed(0)
                                : 0}
                            %
                        </div>
                        <div className="stat-desc">der Gesamtkalorien</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeSummary;
