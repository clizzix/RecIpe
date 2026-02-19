import React, { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { convertToGrams } from '../services/utils';
import IngredientCard from './IngredientCard';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const AddIngredientForm = ({ onAdd }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('gramm');
    const [loading, setLoading] = useState(false);

    const override = {
        display: 'block',
        margin: '0 auto',
        marginTop: '8px',
    };

    // Search API for products
    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);
        if (!query) {
            return;
        }
        setLoading(true);
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
            } finally {
                setLoading(false);
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
        toast.success('Zutat hinzugefügt!');
        // Reset Form
        setSelectedProduct(null);
        setSearchTerm('');
        setSuggestions([]);
    };

    return (
        <div className="add-ingredient-container rounded-md bg-base-100 shadow-md p-4">
            <h4 className="font-bold mb-4">Zutat hinzufügen:</h4>

            {/* 1. Search Input */}
            <label htmlFor="ingredient-search" className="sr-only">
                Suche Produkte
            </label>
            <input
                type="text"
                id="ingredient-search"
                name="ingredient-search"
                autoComplete="off"
                placeholder="Suche Produkte..."
                value={searchTerm}
                onChange={handleSearch}
                className="input w-full"
            />

            {/* 2. Suggestions Dropdown */}
            {loading ? (
                <ClipLoader
                    color="#36d7b7"
                    loading={loading}
                    cssOverride={override}
                    size={50}
                />
            ) : (
                suggestions.length > 0 &&
                !selectedProduct && (
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
                )
            )}

            {/* 3. Quantity and Unit Selection */}
            {selectedProduct && (
                <div style={{ marginTop: '10px' }}>
                    <p>
                        Auswahl: <strong>{selectedProduct.product_name}</strong>
                    </p>
                    <label htmlFor="ingredient-quantity" className="sr-only">
                        Menge
                    </label>
                    <input
                        type="number"
                        id="ingredient-quantity"
                        name="quantity"
                        autoComplete="off"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        style={{ width: '60px' }}
                        className="input"
                    />
                    <label htmlFor="ingredient-unit" className="sr-only">
                        Einheit
                    </label>
                    <select
                        id="ingredient-unit"
                        name="unit"
                        autoComplete="off"
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
