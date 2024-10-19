import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createEvent } from '../api/events';

const NewEvent = () => {
    // State variables for form fields
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    // State variables for errors and server error
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    // Validate form fields
    const validateForm = () => {
        const newErrors = {};
        // Check if name is at least 3 characters
        if (name.trim().length < 3) newErrors.name = "Event name must be at least 3 characters";
        // Check if date is set
        if (!date) newErrors.date = "Date is required";
        // Check if location is at least 3 characters
        if (location.trim().length < 3) newErrors.location = "Location must be at least 3 characters";
        // Check if description is at least 40 characters
        if (description.trim().length < 40) newErrors.description = "Description must be at least 40 characters";

        // Validate date is not in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) newErrors.date = "Date cannot be in the past";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError('');

        if (validateForm()) {
            try {
                const newEvent = await createEvent({ name, date, location, description });
                console.log('Event created successfully:', newEvent);
                navigate(`/events/${newEvent._id}`);
            } catch (err) {
                console.error('Error creating event:', err);
                setServerError(err.message || 'Failed to create event. Please try again.');
            }
        }
    };

    // Redirect to login if user is not authenticated
    if (!user) {
        navigate('/login');
        return null;
    }

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
            {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-1">Event Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`w-full px-3 py-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="date" className="block mb-1">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className={`w-full px-3 py-2 border rounded ${errors.date ? 'border-red-500' : ''}`}
                    />
                    {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                <div>
                    <label htmlFor="location" className="block mb-1">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className={`w-full px-3 py-2 border rounded ${errors.location ? 'border-red-500' : ''}`}
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                </div>
                <div>
                    <label htmlFor="description" className="block mb-1">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full px-3 py-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
                        rows="4"
                    ></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default NewEvent;