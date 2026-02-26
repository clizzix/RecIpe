import React, { useState } from 'react';
import { sleep } from '../services/utils';
import { validate } from '../services/utils';
import { toast } from 'react-toastify';

const User = () => {
    const [formData, setFormData] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved
            ? JSON.parse(saved)
            : {
                  name: '',
                  age: '',
                  email: '',
                  calories: '',
                  weight: '',
              };
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            await sleep(2000);
            console.log('Submitted:', formData);
            toast.success('Formular erfolgreich übermittelt!');
            localStorage.setItem('user', JSON.stringify(formData));
        } else {
            toast.error('Bitte korrigiere die Fehler im Formular');
        }
        setLoading(false);
    };

    return (
        <div className="flex min-w-screen justify-center items-center">
            <form
                className="flex flex-col gap-4 mx-auto min-w-3xl bg-base-300 p-8 rounded-md shadow-sm"
                onSubmit={handleSubmit}
            >
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="name" className="font-bold">
                        Name:
                    </label>
                    <input
                        className={`input w-full ${errors.name ? 'input.error' : ''}`}
                        type="text"
                        name="name"
                        placeholder="e.g. John Doe"
                        disabled={loading}
                        onChange={handleChange}
                        value={formData.name}
                    />
                    {errors.name && (
                        <span className="text-error text-sm">
                            {errors.name}
                        </span>
                    )}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="age" className="font-bold">
                        Alter:
                    </label>
                    <input
                        className={`input w-full ${errors.age ? 'input.error' : ''}`}
                        type="number"
                        name="age"
                        placeholder="e.g. 32"
                        min="1"
                        max="99"
                        disabled={loading}
                        onChange={handleChange}
                        value={formData.age}
                    />
                    {errors.age && (
                        <span className="text-error text-sm">{errors.age}</span>
                    )}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="email" className="font-bold">
                        E-Mail:
                    </label>
                    <input
                        className={`input w-full ${errors.email ? 'input.error' : ''}`}
                        type="email"
                        name="email"
                        placeholder="mail@site.com"
                        disabled={loading}
                        onChange={handleChange}
                        value={formData.email}
                    />
                    {errors.email && (
                        <span className="text-error text-sm">
                            {errors.email}
                        </span>
                    )}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="calories" className="font-bold">
                        Kalorien (kcal):
                    </label>
                    <input
                        className={`input w-full ${errors.calories ? 'input.error' : ''}`}
                        name="calories"
                        placeholder="Daily Calories"
                        disabled={loading}
                        onChange={handleChange}
                        value={formData.calories}
                    />
                    {errors.calories && (
                        <span className="text-error text-sm">
                            {errors.calories}
                        </span>
                    )}
                </div>
                <div className="w-full flex flex-col gap-2">
                    <label htmlFor="weight" className="font-bold">
                        Gewicht (kg):
                    </label>
                    <input
                        className={`input w-full ${errors.weight ? 'input.error' : ''}`}
                        type="number"
                        name="weight"
                        placeholder="e.g. 89kg"
                        disabled={loading}
                        onChange={handleChange}
                        value={formData.weight}
                    />
                    {errors.weight && (
                        <span className="text-error text-sm">
                            {errors.weight}
                        </span>
                    )}
                </div>
                <button type="submit" className="btn btn-accent self-end">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default User;
