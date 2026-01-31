
import express, { Application } from 'express';
import cors from 'cors';
import loginRoutes from './routes/auth/auth.routes';
import drinkRoutes from './routes/drinks/drink.routes';
import orderRoutes from './routes/orders/order.routes';
import imageRoutes from "./routes/restaurant/image.routes";
import restaurantRoutes from "./routes/restaurant/restaurant.routes";

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

app.use('/drinks', drinkRoutes);
app.use('/orders', orderRoutes);

app.use('/restaurant', imageRoutes);
app.use('/restaurant', restaurantRoutes);

const PORT = process.env["PORT"] || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
