import express from 'express';
import Event from '../models/Event.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
    try {
        // Fetch events and sort by date (ascending order)
        const events = await Event.find().sort({ date: 1 }).populate('createdBy', 'username');
        res.json(events);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ message: 'Error fetching events', error: err.message });
    }
});

// Get a single event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('createdBy', 'username');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: 'Error fetching event', error: err.message });
    }
});

// Create a new event
router.post('/', verifyToken, async (req, res) => {
    try {
        const { name, date, location, description } = req.body;

        // Validate input
        if (!name || !date || !location || !description) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const event = new Event({
            name,
            date,
            location,
            description,
            createdBy: req.user.userId // Make sure this matches the property set in the verifyToken middleware
        });

        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(400).json({ message: 'Error creating event', error: err.message });
    }
});

// Update an event
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user has permission to edit the event
        if (event.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'You do not have permission to edit this event' });
        }

        const { name, date, location, description } = req.body;

        // Update event fields
        if (name) event.name = name;
        if (date) event.date = date;
        if (location) event.location = location;
        if (description) event.description = description;

        const updatedEvent = await event.save();
        res.json(updatedEvent);
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(400).json({ message: 'Error updating event', error: err.message });
    }
});

// Delete an event
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if the user has permission to delete the event
        if (event.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'You do not have permission to delete this event' });
        }

        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Error deleting event', error: err.message });
    }
});

export default router;