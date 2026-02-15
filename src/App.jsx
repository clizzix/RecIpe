import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/Navbar';
import SearchIngredients from './components/SearchIngredients';

const App = () => {
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Navbar />
            <SearchIngredients />
        </div>
    );
};

export default App;
