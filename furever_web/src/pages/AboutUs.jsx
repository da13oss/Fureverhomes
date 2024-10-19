import React from 'react';

const AboutUs = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">About FureverHomes</h1>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                <img
                    src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="Cute puppy"
                    className="w-full md:w-1/2 rounded-lg shadow-md"
                />
                <div className="space-y-4">
                    <p>
                        FureverHomes is dedicated to connecting loving families with adorable pets in need of a home. Our mission is to reduce the number of animals in shelters and provide them with caring, permanent homes.
                    </p>
                    <p>
                        Founded in 2020, we've successfully placed over 1,000 pets in loving homes across the country. Our team of passionate animal lovers works tirelessly to ensure each adoption is a perfect match.
                    </p>
                    <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
                    <ul className="list-none space-y-2">
                        <li><strong>Address:</strong> 123 Paw Street, Petville, CA 90210</li>
                        <li><strong>Phone:</strong> (555) 123-4567</li>
                        <li><strong>Email:</strong> info@fureverhomes.com</li>
                        <li><strong>Hours:</strong> Monday - Friday: 9am - 5pm, Saturday: 10am - 4pm, Sunday: Closed</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;