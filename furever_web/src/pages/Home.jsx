import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Welcome to FureverHomes</h1>

            <div className="max-w-3xl mx-auto mb-8">
                <img
                    src="https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Funny cat with tongue out"
                    className="w-full h-auto rounded-lg shadow-lg"
                />
            </div>

            <p className="text-xl text-center mb-8">
                Connecting loving families with pets in need of a forever home.
            </p>

            <div className="flex justify-center space-x-4">
                <Link to="/events" className="btn bg-blue-500 hover:bg-blue-600">
                    View Events
                </Link>
                <Link to="/shelters" className="btn bg-green-500 hover:bg-green-600">
                    Find Shelters
                </Link>
            </div>
        </div>
    );
};

export default Home;