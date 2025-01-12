import express from 'express';
import bodyParser from 'body-parser';
import partyRoutes from './routes/parties.js';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());  // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/parties', partyRoutes);

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'));

const connectionString = process.env.MONGODB_URI;

const start = async() => {
    try{
        await mongoose.connect(connectionString);
        app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
    } catch(e){
        console.log(e.message)
    }

}

start();  // inWzvpe2AuKrRWOz 00A8KMcqZiETuPAe