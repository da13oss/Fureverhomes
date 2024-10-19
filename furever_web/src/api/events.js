// Base URL for the API
const API_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'API request failed');
    }
    return response.json();
};

// Fetch all events
export const fetchEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/events`);
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

// Fetch a single event by ID
export const fetchEvent = async (id) => {
    try {
        const response = await fetch(`${API_URL}/events/${id}`);
        return handleResponse(response);
    } catch (error) {
        console.error(`Error fetching event with id ${id}:`, error);
        throw error;
    }
};

// Create a new event
export const createEvent = async (eventData) => {
    try {
        const response = await fetch(`${API_URL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(eventData)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

// Update an existing event
export const updateEvent = async (id, eventData) => {
    try {
        const response = await fetch(`${API_URL}/events/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(eventData)
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Error updating event with id ${id}:`, error);
        throw error;
    }
};

// Delete an event
export const deleteEvent = async (id) => {
    try {
        const response = await fetch(`${API_URL}/events/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error(`Error deleting event with id ${id}:`, error);
        throw error;
    }
};