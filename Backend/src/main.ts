
import express, { Application } from 'express';
import cors from 'cors';
import loginRoutes from './routes/auth/login.routes';
import drinkRoutes from './routes/drinks/drink.routes';
import orderRoutes from './routes/orders/order.routes';
import getRoutes from './routes/get/get.routes';

const app: Application = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
}));
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('API running');
});


app.use('/auth', loginRoutes);
app.use('/get', getRoutes);
app.use('/data', drinkRoutes);
app.use('/data', orderRoutes);

const PORT = process.env["PORT"] || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
