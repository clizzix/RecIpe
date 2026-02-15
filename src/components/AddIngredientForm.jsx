import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { convertToGrams } from '../services/utils';
import IngredientCard from './IngredientCard';

const AddIngredientForm = ({ onAdd }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('gramm');

    // Search API for products
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query.length > 2) {
            const baseUrl =
                import.meta.env.VITE_FOOD_FACTS_URL ||
                'https://world.openfoodfacts.org';
            const url = `${baseUrl}/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&fields=product_name,nutriments,image_front_small_url,code&json=1&page_size=5`;

            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`API Error: ${res.status}`);
                const data = await res.json();
                setSuggestions(data.products || []);
            } catch (err) {
                console.error('Search error:', err);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleAddItem = () => {
        if (!selectedProduct) return;

        // Use the conversion helper to get the weight
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
        <div className="add-ingredient-container rounded-md bg-base-100 shadow-md p-4">
            <h4 className="font-bold mb-4">Zutat hinzufügen:</h4>

            {/* 1. Search Input */}
            <input
                type="text"
                placeholder="Suche Produkte..."
                value={searchTerm}
                onChange={handleSearch}
                className="input w-full"
            />

            {/* 2. Suggestions Dropdown */}
            {suggestions.length > 0 && !selectedProduct && (
                <ul className="suggestions pt-4">
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
                        Auswahl: <strong>{selectedProduct.product_name}</strong>
                    </p>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        style={{ width: '60px' }}
                        className="input"
                    />
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="input text-end w-1/8"
                    >
                        <option value="gram">Gramm (g)</option>
                        <option value="cup">Tassen</option>
                        <option value="tablespoon">Teelöffel</option>
                        <option value="oz">Unzen (oz)</option>
                    </select>
                    <button className="btn btn-primary" onClick={handleAddItem}>
                        <MdAdd />
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddIngredientForm;
