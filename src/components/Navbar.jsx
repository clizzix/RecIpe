import React from 'react';
import { Link } from 'react-router';
import { MdReceipt, MdPerson } from 'react-icons/md';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-300 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="text-accent font-bold text-2xl">
                        RecIpe
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <Link
                        to="/recipebuilder"
                        className="text-black btn btn-accent"
                    >
                        <MdReceipt size={24} />
                    </Link>
                    <Link to="/user" className="text-black btn btn-accent">
                        <MdPerson size={24} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
