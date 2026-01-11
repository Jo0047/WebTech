import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

// GET all items
router.get('/', async (_req: Request, res: Response) => {
    const result = await pool.query('SELECT * FROM "User"');
    res.json(result.rows);
});

router.post('/', async (req: Request, res: Response) => {
    const { email, name, address_id } = req.body;

    if (!email || !name || !address_id) {
        return res.status(400).json({ error: 'email, name, and address_id are required' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO "User" (email, name, address_id) VALUES ($1, $2, $3) RETURNING *',
            [email, name, address_id]
        );
        return res.status(201).json(result.rows[0]); // <-- add return
    } catch (err: any) {
        console.error(err);

        if (err.code === '23505') {
            return res.status(409).json({ error: 'User with this email already exists' }); // <-- return
        } else if (err.code === '23503') {
            return res.status(400).json({ error: 'Invalid address_id (foreign key constraint)' }); // <-- return
        } else {
            return res.status(500).json({ error: 'Database error' }); // <-- return
        }
    }
});


export default router;
