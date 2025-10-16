import {neon} from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

const {PGHOST,PGDATABASE,PGPASSWORD,PGUSER} = process.env;
const {DATABASE_URL} = process.env;
console.log(PGHOST,PGDATABASE,PGPASSWORD,PGUSER)

export const sql =neon(
    `${DATABASE_URL}`
)