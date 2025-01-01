import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
let parties = [
    {
        partyName: 'DW-6900',
        djs: ['Abimael', 'Zimri'],
        date: '2024-12-05',
        startTime: '19:00',
        genres: ['salsa', 'reggaeton'],
        location: 'Whiterun',
        isFree: true,
        id: "ayayaya",
        show: false,
    },
    {
        partyName: 'GA-2100',
        djs: ['Hezrom', 'Gadiel', 'Uziel'],
        date: '2024-12-06',
        startTime: '22:00',
        genres: ['electro', 'house'],
        location: 'Solitude',
        isFree: false,
        id: uuidv4(),
        show: false,
    },
    {
        partyName: 'DW-5600',
        djs: ['Hosea', 'Tobiah', 'Baruch'],
        date: '2024-12-06',
        startTime: '23:30',
        genres: ['trance', 'techno'],
        location: 'Riften',
        isFree: true,
        id: uuidv4(),
        show: false,
    },
    {
        partyName: 'GA-700',
        djs: ['Benaiah', 'Neriah', 'Eliakim'],
        date: '2024-12-06',
        startTime: '20:00',
        genres: ['house'],
        location: 'Markarth',
        isFree: false,
        id: uuidv4(),
        show: false,
    },
    {
        partyName: 'GBA-800',
        djs: ['Jotham', 'Jedidiah', 'Ezekias', 'Obadiah', 'Zelophehad'],
        date: '2024-12-07',
        startTime: '20:00',
        genres: ['house'],
        location: 'Windhelm',
        isFree: false,
        id: uuidv4(),
        show: false,
    },
    {
        partyName: 'GA-100',
        djs: ['Nathanael', 'Elihu'],
        date: '2024-12-07',
        startTime: '18:00',
        genres: ['brega'],
        location: 'Falkreath',
        isFree: false,
        id: uuidv4(),
        show: false,
    },
    {
        partyName: 'GBD-H1000',
        djs: ['Zadok', 'Balthazar', 'Nicanor', 'Phinehas'],
        date: '2024-12-07',
        startTime: '18:00',
        genres: ['grime'],
        location: 'Markarth',
        isFree: false,
        id: uuidv4(),
        show: false,
    },
    {
        partyName: 'GA-110',
        djs: [
            "Amos", "Zadok", "Abigail", "Asher", "Eliseus", 
            "Tertuliano", "Esaú", "Jabez", "Sheshbazzar", "Zerubbabel", 
            "Ephrath", "Chuza", "Elisabete", "Pelegrina", 
            "Atalia", "Dina", "Thaddaeus", "Sarai"
          ],
        date: '2024-12-07',
        startTime: '22:00',
        genres: ['EBM'],
        location: 'Dawnstar',
        isFree: false,
        id: uuidv4(),
        show: false,
    },
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