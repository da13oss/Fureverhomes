import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchEvent, updateEvent } from '../api/events';

const EventEdit = () => {
    // State variables for form fields
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    // State variables for loading, errors, and server error
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState('');

    // New state to store the entire event object
    const [event, setEvent] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Fetch event data on component mount
    useEffect(() => {
        const loadEvent = async () => {
            try {
                const data = await fetchEvent(id);
                setEvent(data); // Store the entire event object
                setName(data.name);
                setDate(data.date.split('T')[0]); // Format date for input
                setLocation(data.location);
                setDescription(data.description);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching event:', err);
                setServerError('Failed to load event. Please try again.');
                setLoading(false);
            }
        };

        loadEvent();
    }, [id]);

    // Check if user is authorized to edit this event
    useEffect(() => {
        // Only check authorization when both user and event data are available
        if (!loading && user && event) {
            // Compare user ID with event creator ID
            if (user._id !== event.createdBy._id) {
                navigate(`/events/${id}`);
            }
        }
    }, [loading, user, event, id, navigate]);

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
                await updateEvent(id, { name, date, location, description });
                navigate(`/events/${id}`);
            } catch (err) {
                console.error('Error updating event:', err);
                setServerError('Failed to update event. Please try again.');
            }
        }
    };

    if (loading) return <div className="text-center mt-8">Loading event...</div>;
    if (serverError) return <div className="text-center mt-8 text-red-500">{serverError}</div>;

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-6">Edit Event</h1>
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
                    Update Event
                </button>
            </form>
        </div>
    );
};

export default EventEdit;