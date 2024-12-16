import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let parties = [
    {
        partyName: 'FIESTA DEL AMOR',
        djs: ['DJ Loco', 'DJ Maru'],
        date: '2024-08-10',
        startTime: '20:00',
        genres: ['salsa', 'reggaeton'],
        location: 'El Cielo Lounge',
        isFree: true,
        id: uuidv4(),
    },
    {
        partyName: 'Electro Vibes',
        djs: ['DJ Zeno', 'DJ Kira', 'DJ Nebula'],
        date: '2024-08-14',
        startTime: '22:00',
        genres: ['electro', 'house'],
        location: 'The Pulse Club',
        isFree: false,
        id: uuidv4(),
    },
    {
        partyName: 'Cosmic Rave',
        djs: ['DJ Starfire', 'DJ Orion', 'DJ Luna'],
        date: '2024-08-20',
        startTime: '23:30',
        genres: ['trance', 'techno'],
        location: 'Neon District',
        isFree: true,
        id: uuidv4(),
    },
    {
        partyName: 'Tropical Beats',
        djs: ['DJ Tropic', 'DJ Rita', 'DJ Sandy'],
        date: '2024-09-05',
        startTime: '19:00',
        genres: ['dancehall', 'afrobeats'],
        location: 'Beachside Paradise',
        isFree: false,
        id: uuidv4(),
    },
    {
        partyName: 'Future Sound',
        djs: ['DJ Byte', 'DJ Vortex', 'DJ Nova'],
        date: '2024-09-12',
        startTime: '00:00',
        genres: ['dubstep', 'drum & bass'],
        location: 'Infinity Arena',
        isFree: true,
        id: uuidv4(),
    },
    {
        partyName: 'Funky Vibes',
        djs: ['DJ Brix', 'DJ Jazz Hands'],
        date: '2024-09-18',
        startTime: '21:00',
        genres: ['funk', 'soul'],
        location: 'The Groove Spot',
        isFree: false,
        id: uuidv4(),
    }
];


// GET all parties
router.get('/', (req, res) => {
    res.send(parties);
});

// GET a party by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundParty = parties.find((party) => party.id === id);

    if (!foundParty) {
        return res.status(404).send('party not found');
    }

    res.send(foundParty);
});

// POST a new party
router.post('/', (req, res) => {
    const party = req.body;

    // Validate required fields
    if (!party.partyName || !party.date || !party.startTime || !party.location) {
        return res.status(400).send('Missing required fields');
    }

    const newparty = { ...party, id: uuidv4() };
    parties.push(newparty);

    res.send(`${newparty.partyName} has been added to the database`);
});

// DELETE a party by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const partyExists = parties.some((party) => party.id === id);
    if (!partyExists) {
        return res.status(404).send('party not found');
    }

    parties = parties.filter((party) => party.id !== id);
    res.send(`party with ID ${id} deleted successfully from the database`);
});

// PATCH a party by ID
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { partyName, djs, date, startTime, genres, location, isFree } = req.body;

    const party = parties.find((party) => party.id === id);

    if (!party) {
        return res.status(404).send('party not found');
    }

    // Update only fields that are provided
    if (partyName) party.partyName = partyName;
    if (djs) party.djs = djs;
    if (date) party.date = date;
    if (startTime) party.startTime = startTime;
    if (genres) party.genres = genres;
    if (location) party.location = location;
    if (isFree !== undefined) party.isFree = isFree;

    res.send(`party with ID ${id} has been updated`);
});

export default router;