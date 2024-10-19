import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const Navbar = () => {
    // State to manage mobile menu visibility
    const [isOpen, setIsOpen] = useState(false);
    // Use the useAuth hook to get authentication state and logout function
    const { isAuthenticated, logout } = useAuth();

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle logout
    const handleLogout = () => {
        logout();
        // Optionally, you can add navigation to home page here
    };

    // Define nav items based on authentication state
    const navItems = [
        { to: "/", text: "Home" },
        { to: "/about", text: "About Us" },
        { to: "/events", text: "Events" },
        { to: "/shelters", text: "Shelters" },
        { to: "/location", text: "Location" },
        ...(isAuthenticated
            ? [
                { to: "/settings", text: "Settings" },
                { onClick: handleLogout, text: "Logout" }
            ]
            : [
                { to: "/login", text: "Login" },
                { to: "/register", text: "Register" }
            ]
        )
    ];

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and brand name */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center">
                            <Logo />
                        </Link>
                    </div>

                    {/* Desktop navigation menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navItems.map((item, index) => (
                            item.to ? (
                                <Link key={index} to={item.to} className="text-blue-500 hover:text-blue-600">
                                    {item.text}
                                </Link>
                            ) : (
                                <button key={index} onClick={item.onClick} className="text-blue-500 hover:text-blue-600">
                                    {item.text}
                                </button>
                            )
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-blue-500 hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile navigation menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item, index) => (
                            item.to ? (
                                <Link
                                    key={index}
                                    to={item.to}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                                    onClick={toggleMenu} // Close menu when item is clicked
                                >
                                    {item.text}
                                </Link>
                            ) : (
                                <button
                                    key={index}
                                    onClick={() => { item.onClick(); toggleMenu(); }} // Close menu when item is clicked
                                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-500 hover:text-blue-600 hover:bg-blue-100"
                                >
                                    {item.text}
                                </button>
                            )
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
