const UNIT_CONVERSIONS = {
    // Base unit is Grams
    gramm: 1,
    kg: 1000,
    oz: 28.35,
    // Volume approximations (Standard averages)
    cup: 120, // Average for dry goods like flour/sugar
    tablespoon: 15,
    teaspoon: 5,
    ml: 1, // 1ml of water = 1g (close enough for most liquids)
};

/**
 * Converts a given quantity and unit into grams.
 * @param {number} quantity - The amount (e.g., 2)
 * @param {string} unit - The unit key (e.g., 'cup')
 * @returns {number} - The weight in grams
 */
export const convertToGrams = (quantity, unit) => {
    const factor = UNIT_CONVERSIONS[unit.toLowerCase()] || 1;
    return quantity * factor;
};
