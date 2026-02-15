import React from 'react';
import { Link, Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Navbar />
            <div className="p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
