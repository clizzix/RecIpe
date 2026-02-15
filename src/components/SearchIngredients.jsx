import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdSearch } from 'react-icons/md';
import IngredientCard from './IngredientCard';

const SearchIngredients = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const fetchIngredient = async () => {
        if (!query) return;
        const baseUrl =
            import.meta.env.VITE_FOOD_FACTS_URL ||
            'https://world.openfoodfacts.org';
        const url = `${baseUrl}/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1&fields=product_name,image_url,nutriments&page_size=5`;

        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`API Error: ${res.status}`);
            const data = await res.json();
            setResults(data.products || []);
        } catch (error) {
            console.error(error);
            toast.error(`Error fetching from OFF: ${error.message}`);
        }
    };
    return (
        <div className="flex flex-col items-center gap-8 mt-8">
            <div className="flex justify-center items-center">
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Suche (Mehl, Tomate...)"
                    className="input input-bordered min-w-xl md:w-auto"
                />
                <button onClick={fetchIngredient} className="btn btn-accent">
                    <MdSearch size={24} />
                </button>
            </div>
            <ul className="flex flex-wrap justify-center items-center gap-8">
                {results.map((item, index) => (
                    <IngredientCard key={index} ingredient={item} />
                ))}
            </ul>
        </div>
    );
};

export default SearchIngredients;
