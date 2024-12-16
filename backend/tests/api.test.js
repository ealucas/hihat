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
        id: 'ayayaya',
    },
];

describe('Parties API', () => {
    beforeEach(() => {
        parties = [
            {
                partyName: 'FIESTA DEL AMOR',
                djs: ['DJ Loco', 'DJ Maru'],
                date: '2024-08-10',
                startTime: '20:00',
                genres: ['salsa', 'reggaeton'],
                location: 'El Cielo Lounge',
                isFree: true,
                id: 'ayayaya',
            },
        ];
    });

    it('should fetch all parties', async () => {
        const response = await request(app).get('/parties');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); 
    });

    it('should fetch a party by ID', async () => {
        const response = await request(app).get('/parties/ayayaya');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', 'ayayaya');
    });

    it('should return 404 for non-existing party by ID', async () => {
        const response = await request(app).get('/parties/non-existing-id');
        expect(response.status).toBe(404);
        expect(response.text).toBe('party not found');
    });

    it('should create a new party', async () => {
        const newParty = {
            partyName: 'Test Party',
            djs: ['DJ Test'],
            date: '2024-12-20',
            startTime: '21:00',
            genres: ['pop'],
            location: 'Test Venue',
            isFree: false,
        };

        const response = await request(app).post('/parties').send(newParty);
        expect(response.status).toBe(200);
        expect(response.text).toContain('Test Party has been added to the database');
    });

    it('should return 400 for missing required fields in POST', async () => {
        const incompleteParty = {
            partyName: 'Incomplete Party',
            date: '2024-12-25',
            startTime: '22:00',
        };

        const response = await request(app).post('/parties').send(incompleteParty);
        expect(response.status).toBe(400);
        expect(response.text).toBe('Missing required fields');
    });

    it('should delete a party by ID', async () => {
        const response = await request(app).delete('/parties/ayayaya');
        expect(response.status).toBe(200);
        expect(response.text).toBe('party with ID ayayaya deleted successfully from the database');
    });

    it('should return 404 for deleting non-existing party by ID', async () => {
        const response = await request(app).delete('/parties/non-existing-id');
        expect(response.status).toBe(404);
        expect(response.text).toBe('party not found');
    });

    it('should update a party by ID', async () => {
        const updatedParty =  {
            partyName: 'FIESTA DEL AMOR Updated',
            djs: ['DJ Loco', 'DJ Maru'],
            date: '2024-08-15',
            startTime: '21:00',
            genres: ['salsa'],
            location: 'El Cielo Lounge',
            isFree: false,
            id: 'ayayaya',
        };

        const response = await request(app).patch('/parties/ayayaya').send(updatedParty);
        expect(response.status).toBe(200);
        expect(response.text).toBe('party with ID ayayaya has been updated');
    });

    it('should return 404 for updating non-existing party by ID', async () => {
        const response = await request(app).patch('/parties/non-existing-id').send({ partyName: 'Non-existing Party' });
        expect(response.status).toBe(404);
        expect(response.text).toBe('party not found');
    });

    it('should return 405 for unsupported HTTP methods', async () => {
        const response = await request(app).put('/parties');
        expect(response.status).toBe(405);
    });

    it('should return empty array when no parties exist', async () => {
        parties = [];
        const response = await request(app).get('/parties');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(0);
    });

    it('should handle invalid date formats in POST', async () => {
        const invalidDateParty = {
            partyName: 'Invalid Date Party',
            djs: ['DJ Test'],
            date: 'invalid-date',
            startTime: '21:00',
            genres: ['pop'],
            location: 'Test Venue',
            isFree: false,
        };

        const response = await request(app).post('/parties').send(invalidDateParty);
        expect(response.status).toBe(400);
        expect(response.text).toBe('Invalid date format');
    });

    it('should handle duplicate party creation', async () => {
        const duplicateParty = parties[0];

        const response = await request(app).post('/parties').send(duplicateParty);
        expect(response.status).toBe(409);
        expect(response.text).toBe('Party already exists');
    });

    it('should handle invalid JSON body in request', async () => {
        const response = await request(app)
            .post('/parties')
            .send('{ invalid json }')
            .set('Content-Type', 'application/json');
        expect(response.status).toBe(400);
        expect(response.text).toBe('Invalid JSON format');
    });
});
