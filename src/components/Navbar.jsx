import React from 'react';
import { Link } from 'react-router';
import { MdReceipt, MdPerson } from 'react-icons/md';

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link to="/" className="text-accent font-bold text-2xl">
                        RecIpe
                    </Link>
                </div>
                <div className="flex gap-2 items-center">
                    <Link
                        to="/recipebuilder"
                        className="text-accent btn btn-outline"
                    >
                        <MdReceipt size={36} />
                    </Link>
                    <Link to="/user" className="text-accent btn btn-outline">
                        <MdPerson size={36} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
