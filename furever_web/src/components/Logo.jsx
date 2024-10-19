import React from 'react';
import { Home } from 'lucide-react';

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-blue-500">FureverHomes</span>
        </div>
    );
};

export default Logo;