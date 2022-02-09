import mysql, { RowDataPacket } from "mysql2/promise";
import * as dotenv from "dotenv";
import type { Product } from "./types";
dotenv.config();

// Utils
export function formatPrice(price: number): string {
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

        product.price = product.price / 100;
        
    } catch (e) {
        console.log(e);
    } finally {
        conn.end();
    }
    return product;
}

export async function getTrending(): Promise<Array<Product>> {
    let conn = await createDB();
    let list: Array<Product>;

    try {
        const result = await conn.query(`SELECT * FROM Products WHERE !sold ORDER BY clicks DESC LIMIT 3`);

        list = (result as RowDataPacket)[0]

        if (!list)
            return null;

        list.forEach((prod) => {
            prod.price = prod.price / 100;
        });
    } catch (e) {
        console.log(e);
    } finally {
        conn.end();
    }

    return list;
}

export async function getNewIn(): Promise<Array<Product>> {
    let conn = await createDB();
    let list: Array<Product>;

    try {
        const result = await conn.query(`SELECT * FROM Products WHERE !sold ORDER BY listed DESC LIMIT 3`);

        list = (result as RowDataPacket)[0]

        if (!list)
            return null;

        list.forEach((prod) => {
            prod.price = prod.price / 100;
        });
    } catch (e) {
        console.log(e);
    } finally {
        conn.end();
    }

    return list;
}