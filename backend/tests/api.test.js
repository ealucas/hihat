import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import partiesRouter from '../routes/parties'; 
const app = express();
app.use(bodyParser.json());
app.use('/parties', partiesRouter);
let parties = [
    {
        partyName: 'FIESTA DEL AMOR',
        djs: ['DJ Loco', 'DJ Maru'],
        date: '2024-08-10',
        startTime: '20:00',
        genres: ['salsa', 'reggaeton'],
        location: 'El Cielo Lounge',
        isFree: true,
        id: "ayayaya",
    },
];

describe('Parties API', () => {
    // Test DELETE /parties/:id for non-existent party
    it('should return 404 for deleting a non-existing party by ID', async () => {
        const response = await request(app).delete('/parties/non-existing-id');
        expect(response.status).toBe(404);
        expect(response.text).toBe('party not found');
    });

    // Test DELETE /parties/:id for an invalid ID format
    it('should return 404 for deleting a party with an invalid ID format', async () => {
        const response = await request(app).delete('/parties/invalid-id-format');
        expect(response.status).toBe(404);
    });

    // Test DELETE /parties/:id when trying to delete a party with no ID provided
    it('should return 404 for deleting a party without an ID', async () => {
        const response = await request(app).delete('/parties/');
        expect(response.status).toBe(404);
    });

    // Test DELETE /parties/:id when trying to delete a party that is already deleted
    it('should return 404 for deleting an already deleted party', async () => {
        const partyId = "ayayaya";
        // First, delete the party
        await request(app).delete(`/parties/${partyId}`);
        
        // Then, try to delete it again
        const response = await request(app).delete(`/parties/${partyId}`);
        expect(response.status).toBe(404);
        expect(response.text).toBe('party not found');
    });

    // Test DELETE /parties/:id with an unknown ID
    it('should return 404 for deleting a party with an unknown ID', async () => {
        const response = await request(app).delete('/parties/unknown-id');
        expect(response.status).toBe(404);
        expect(response.text).toBe('party not found');
    });
    
    it('should return 400 for missing required fields in POST (missing partyName)', async () => {
        const incompleteParty = {
            date: '2024-12-25',
            startTime: '22:00',
            genres: ['pop'],
            location: 'Test Venue',
            isFree: false,
        };

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should return 400 for missing required fields in POST (missing date)', async () => {
        const incompleteParty = {
            partyName: 'Incomplete Party',
            startTime: '22:00',
            genres: ['pop'],
            location: 'Test Venue',
            isFree: false,
        };

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should return 400 for missing required fields in POST (missing startTime)', async () => {
        const incompleteParty = {
            partyName: 'Incomplete Party',
            date: '2024-12-25',
            genres: ['pop'],
            location: 'Test Venue',
            isFree: false,
        };

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });


    it('should return 400 for missing required fields in POST (missing location)', async () => {
        const incompleteParty = {
            partyName: 'Incomplete Party',
            date: '2024-12-25',
            startTime: '22:00',
            genres: ['pop'],
            isFree: false,
        };

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });


    it('should return 400 for missing required fields in POST (missing all required fields)', async () => {
        const incompleteParty = {};

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should return 400 for missing required fields in POST (missing partyName and location)', async () => {
        const incompleteParty = {
            date: '2024-12-25',
            startTime: '22:00',
            genres: ['pop'],
            isFree: false,
        };

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should return 400 for missing required fields in POST (missing partyName and date)', async () => {
        const incompleteParty = {
            startTime: '22:00',
            genres: ['pop'],
            location: 'Test Venue',
            isFree: false,
        };

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should return 400 for missing required fields in POST (missing startTime and genres)', async () => {
        const incompleteParty = {
            partyName: 'Incomplete Party',
            date: '2024-12-25',
            location: 'Test Venue',
            isFree: false,
        };

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should return 400 for missing required fields in POST (missing startTime and location)', async () => {
        const incompleteParty = {
            partyName: 'Incomplete Party',
            date: '2024-12-25',
            genres: ['pop'],
            isFree: false,
        };

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should return 400 for missing required fields in POST (missing date and location)', async () => {
        const incompleteParty = {
            partyName: 'Incomplete Party',
            startTime: '22:00',
            genres: ['pop'],
            isFree: false,
        };

        const response = await request(app)
            .post('/parties')
            .send(incompleteParty);

        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });
});