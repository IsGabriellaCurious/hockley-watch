import mysql, { RowDataPacket } from "mysql2/promise";
import * as dotenv from "dotenv";
import type { Product } from "./types";
dotenv.config();

// Utils
function formatPrice(price: number): string {
    let output = `£${price.toFixed(2)}`
    console.log(output);
    return output;
}

// Database
export async function createDB() {
    return await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME
    });
}

export async function getProductData(id: number): Promise<Product> {
    let conn = await createDB();
    let product: Product;
    
    try {
        const result = await conn.query(`SELECT * FROM Products WHERE id=?`, id);
        
        product = (result as RowDataPacket)[0][0] as Product;
        
        if (!product) {
            
            return null;
        }
        
    } catch (e) {
        console.log(e);
    } finally {
        conn.end();
    }
    return product;
}

export async function getTopFour(): Promise<Array<Product>> {
    let conn = await createDB();
    let list: Array<Product>;

    try {
        const result = await conn.query(`SELECT * FROM Products WHERE stock > 0 ORDER BY purchace_count DESC LIMIT 4`);

        list = (result as RowDataPacket)[0]

        if (!list)
            return null;
    } catch (e) {
        console.log(e);
    } finally {
        conn.end();
    }

    return list;
}

export async function getRandomClearance(): Promise<Array<Product>> {
    let conn = await createDB();
    let list: Array<Product>;

    try {
        const result = await conn.query(`SELECT * FROM Products WHERE reduced = 1 ORDER BY RAND() DESC LIMIT 4`);

        list = (result as RowDataPacket)[0]

        if (!list)
            return null;
    } catch (e) {
        console.log(e);
    } finally {
        conn.end();
    }

    return list;
}