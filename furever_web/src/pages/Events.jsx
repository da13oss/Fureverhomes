import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchEvents } from '../api/events';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {
        try {
            const data = await fetchEvents();
            setEvents(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching events:', err);
            setError('Failed to load events. Please try again.');
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-8">Loading events...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Events</h1>
            <Link to="/events/new" className="btn mb-6 inline-block">Create New Event</Link>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <div key={event._id} className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                        <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                        <p className="text-gray-600 mb-4">Location: {event.location}</p>
                        <div className="flex justify-between items-center">
                            {/* Update the Link to use the correct path */}
                            <Link to={`/events/${event._id}`} className="text-blue-500 hover:text-blue-600">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;