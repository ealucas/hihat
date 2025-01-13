import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import Party from '../models/Party';
import partyRoutes from '../routes/parties';
import { Types } from 'mongoose'; // Import Mongoose Types for ObjectId
import { log, error } from 'console';


describe('Party API', () => {
  let server;

  // Helper function to create a party with a unique _id
  const createParty = async (partyName, date, startTime, genres, location, isFree = true, show = false) => {
    return await Party.create({
      _id: new Types.ObjectId(),  // Ensure a unique ObjectId
      partyName,
      djs: [`DJ ${partyName.split(' ')[2]}`],  // Dynamic DJ name based on party name
      date,
      startTime,
      genres,
      location,
      isFree,
      show
    });
  };

  // Establish MongoDB connection before tests run
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create an Express server instance
    const app = express();
    app.use(express.json());
    app.use('/parties', partyRoutes); // Use your routes directly
    server = app.listen(5000); // Start the server on port 5000
  });

  // Clean up and disconnect MongoDB after tests
  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    server.close(); // Close the server to stop it from hanging
  });

  // 1. Test: Fetch all parties
  it('should return all parties', async () => {
    await createParty('Test Party 1', '2024-12-01', '20:00', ['pop'], 'Test Venue 1');

    const res = await request(server).get('/parties');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('partyName', 'Test Party 1');
  });

  // 2. Test: Fetch a party by ID
  it('should return a party by ID', async () => {
    const newParty = await createParty('Test Party 2', '2024-12-02', '22:00', ['rock'], 'Test Venue 2');
    
    error("party_ID");
    error(newParty._id); // Log the _id for debugging

    expect(newParty.partyName).toBe('Test Party 2');
    const res = await request(server).get(`/parties/${newParty._id}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('partyName', 'Test Party 2');
    expect(res.body).toHaveProperty('_id', newParty._id.toString());  // Check for the unique _id
  });

  // 3. Test: Create a new party
it('should create a new party', async () => {
    const newPartyData = {
      _id: new Types.ObjectId(), // You can manually set _id for testing, just not in the schema
      partyName: 'Test Party 3',
      djs: ['DJ 3'],
      date: '2024-12-03',
      startTime: '21:00',
      genres: ['jazz'],
      location: 'Test Venue 3',
      isFree: true,
      show: false
    };
  
    const res = await request(server)
      .post('/parties')
      .send(newPartyData);
  
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Test Party 3 has been added to the database');
    expect(res.body.party).toHaveProperty('partyName', 'Test Party 3');
  });

  // 4. Test: Update an existing party location
  it('should update an existing party location', async () => {
    const newParty = await createParty('Test Party 4', '2024-12-04', '23:00', ['electro'], 'Test Venue 4');

    const updatedData = {
      partyName: 'Updated Test Party 4',
      location: 'Updated Test Venue 4',
    };

    const res = await request(server)
      .patch(`/parties/${newParty._id}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', `Party with ID ${newParty._id} has been updated`);
    expect(res.body.party).toHaveProperty('partyName', 'Updated Test Party 4');
    expect(res.body.party).toHaveProperty('location', 'Updated Test Venue 4');
  });

  // 5. Test: Update an existing party name
  it('should update an existing party name', async () => {
    const newParty = await createParty('Test Party 5', '2024-12-05', '19:00', ['pop'], 'Test Venue 5');

    const updatedData = {
      partyName: 'Updated Test Party 5',
    };

    const res = await request(server)
      .patch(`/parties/${newParty._id}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', `Party with ID ${newParty._id} has been updated`);
    expect(res.body.party).toHaveProperty('partyName', 'Updated Test Party 5');
  });
});
    
