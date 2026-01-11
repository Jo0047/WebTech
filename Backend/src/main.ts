
import express, { Application } from 'express';
import cors from 'cors';
import itemRoutes from './routes/items.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API running');
});

app.use('/api/items', itemRoutes);

const PORT = process.env["PORT"] || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
