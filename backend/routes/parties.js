import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import Party from '../models/Party.js';

const router = express.Router();

// GET all parties
router.get('/', async (req, res) => {
    try {
        const parties = await Party.find();
        res.json(parties);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching parties', details: err.message });
    }
});

// GET a party by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foundParty = await Party.findById(id);

        if (!foundParty) {
            return res.status(404).json({ error: 'Party not found' });
        }

        res.json(foundParty);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching party', details: err.message });
    }
});

// POST a new party
router.post('/', async (req, res) => {
    const { partyName, djs, date, startTime, genres, location, isFree } = req.body;

    // Validate required fields
    if (!partyName || !date || !startTime || !location) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const newParty = new Party({
        partyName,
        djs: djs || [],
        date,
        startTime,
        genres: genres || [],
        location,
        isFree: isFree !== undefined ? isFree : true,
        show: false,
    });

    try {
        await newParty.save();
        res.status(201).json({ message: `${newParty.partyName} has been added to the database`, party: newParty });
    } catch (err) {
        res.status(500).json({ error: 'Error adding party', details: err.message });
    }
});

// DELETE a party by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedParty = await Party.findByIdAndDelete(id);

        if (!deletedParty) {
            return res.status(404).json({ error: 'Party not found' });
        }

        res.json({ message: `Party with ID ${id} deleted successfully`, party: deletedParty });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting party', details: err.message });
    }
});

// PATCH a party by ID
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedParty = await Party.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!updatedParty) {
            return res.status(404).json({ error: 'Party not found' });
        }

        res.json({ message: `Party with ID ${id} has been updated`, party: updatedParty });
    } catch (err) {
        res.status(500).json({ error: 'Error updating party', details: err.message });
    }
});

export default router;
