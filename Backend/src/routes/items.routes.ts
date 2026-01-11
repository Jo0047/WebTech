import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

// GET all items
router.get('/', async (_req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM items');
    res.json(result.rows);
});

// POST item
router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;
    const result = await pool.query(
        'INSERT INTO items (name) VALUES ($1) RETURNING *',
        [name]
    );
    res.status(201).json(result.rows[0]);
});

export default router;
