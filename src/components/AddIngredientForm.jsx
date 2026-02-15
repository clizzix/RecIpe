import React, { useState } from 'react';

const AddIngredientForm = ({ onAdd }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('gram');

    // Search API for products
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query.length > 2) {
            const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&fields=product_name,nutriments,image_front_small_url,code&json=1&page_size=5`;

            try {
                const res = await fetch(url, {
                    headers: { 'User-Agent': 'MyRecipeApp/1.0' },
                });
                const data = await res.json();
                setSuggestions(data.products || []);
            } catch (err) {
                console.error('Search error:', err);
            }
        }
    };

    const handleAddItem = () => {
        if (!selectedProduct) return;

        // Use our conversion helper (from previous step) to get the weight
        const weightInGrams = convertToGrams(quantity, unit);

        onAdd({
            ...selectedProduct,
            quantity: weightInGrams, // We store everything in grams for the math
            displayQuantity: quantity,
            displayUnit: unit,
        });

        // Reset Form
        setSelectedProduct(null);
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <div
            className="add-ingredient-container"
            style={{ border: '1px solid #ccc', padding: '1rem' }}
        >
            <h4>Add Ingredient</h4>

            {/* 1. Search Input */}
            <input
                type="text"
                placeholder="Search product (e.g. Oats)"
                value={searchTerm}
                onChange={handleSearch}
            />

            {/* 2. Suggestions Dropdown */}
            {suggestions.length > 0 && !selectedProduct && (
                <ul className="suggestions">
                    {suggestions.map((p) => (
                        <li
                            key={p.code}
                            onClick={() => setSelectedProduct(p)}
                            style={{ cursor: 'pointer' }}
                        >
                            {p.product_name}
                        </li>
                    ))}
                </ul>
            )}

            {/* 3. Quantity and Unit Selection */}
            {selectedProduct && (
                <div style={{ marginTop: '10px' }}>
                    <p>
                        Selected:{' '}
                        <strong>{selectedProduct.product_name}</strong>
                    </p>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        style={{ width: '60px' }}
                    />
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="gram">Grams (g)</option>
                        <option value="cup">Cups</option>
                        <option value="tablespoon">Tbsp</option>
                        <option value="oz">Ounces (oz)</option>
                    </select>
                    <button onClick={handleAddItem}>Add to Recipe</button>
                </div>
            )}
        </div>
    );
};

export default AddIngredientForm;
