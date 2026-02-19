import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { MdSearch } from 'react-icons/md';
import IngredientCard from './IngredientCard';
import { ClipLoader } from 'react-spinners';

const SearchIngredients = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const override = {
        display: 'block',
        margin: '0 auto',
    };

    const fetchIngredient = async () => {
        if (!query) return;
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col items-center gap-8 mt-8">
            <div className="flex justify-center items-center">
                <label htmlFor="search-ingredients" className="sr-only">
                    Suche Zutaten
                </label>
                <input
                    id="search-ingredients"
                    name="search"
                    autoComplete="off"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Suche (Mehl, Tomate...)"
                    className="input input-bordered min-w-xl md:w-auto"
                />
                <button onClick={fetchIngredient} className="btn btn-accent">
                    <MdSearch size={24} />
                </button>
            </div>
            {loading ? (
                <ClipLoader
                    color="#36d7b7"
                    loading={loading}
                    cssOverride={override}
                    size={50}
                />
            ) : (
                <ul className="flex flex-wrap justify-center items-center gap-8">
                    {results.map((item, index) => (
                        <IngredientCard key={index} ingredient={item} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchIngredients;
