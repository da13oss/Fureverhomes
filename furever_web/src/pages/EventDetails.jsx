import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchEvent, deleteEvent } from '../api/events';

const EventDetails = () => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        loadEvent();
    }, [id]);

    const loadEvent = async () => {
        try {
            const data = await fetchEvent(id);
            setEvent(data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching event:', err);
            setError('Failed to load event. Please try again.');
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await deleteEvent(id);
                navigate('/events');
            } catch (err) {
                console.error('Error deleting event:', err);
                setError('Failed to delete event. Please try again.');
            }
        }
    };

    // Function to handle edit button click
    const handleEdit = () => {
        // Navigate to the edit page with the event ID
        navigate(`/events/${id}/edit`);
    };

    if (loading) return <div className="text-center mt-8">Loading event...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
    if (!event) return <div className="text-center mt-8">Event not found</div>;

    // Check if the current user is the creator of the event
    const isCreator = user && event.createdBy && user._id === event.createdBy._id;

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
                <p className="text-gray-600 mb-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-600 mb-4">Location: {event.location}</p>
                <p className="text-gray-800 mb-6">{event.description}</p>

                {isCreator && (
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            onClick={handleEdit}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventDetails;