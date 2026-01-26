import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });  // MUST be first

import { Pool } from 'pg';

console.log('DB_HOST:', process.env['DB_HOST']);      // Debug
console.log('DB_USER:', process.env['DB_USER']);      // Debug
console.log('DB_PASSWORD:', process.env['DB_PASSWORD']);  // Debug
console.log('DB_NAME:', process.env['DB_NAME']);      // Debug

export const pool = new Pool({
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT']),
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
});

