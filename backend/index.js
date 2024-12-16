import express from 'express';
import bodyParser from 'body-parser';
import partyRoutes from './routes/parties.js';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());  // Enable CORS
app.use(express.json()); // Middleware to parse JSON bodies

app.use('/parties', partyRoutes);

app.get('/', (req, res) => res.send('HELLO FROM HOMEPAGE'));

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));