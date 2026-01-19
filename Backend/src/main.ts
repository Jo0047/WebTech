
import express, { Application } from 'express';
import cors from 'cors';
import loginRoutes from './routes/auth/login.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API running');
});



app.use('/auth', loginRoutes);

const PORT = process.env["PORT"] || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
