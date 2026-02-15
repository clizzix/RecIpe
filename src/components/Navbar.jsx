import React from 'react';
import { Link } from 'react-router';
import { MdReceipt, MdPerson, MdHome } from 'react-icons/md';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-300 shadow-sm justify-center gap-2">
                <Link
                    to="/"
                    className="text-black btn btn-accent font-bold text-2xl hover:translate-y-0.5"
                >
                    <MdHome size={24} />
                </Link>
                <Link
                    to="/recipebuilder"
                    className="text-black btn btn-accent hover:translate-y-0.5"
                >
                    <MdReceipt size={24} />
                </Link>
                <Link
                    to="/user"
                    className="text-black btn btn-accent hover:translate-y-0.5"
                >
                    <MdPerson size={24} />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
