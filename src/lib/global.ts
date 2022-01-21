import mysql from "mysql2/promise";
import * as dotenv from "dotenv";
dotenv.config();


export async function createDB() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    });
}