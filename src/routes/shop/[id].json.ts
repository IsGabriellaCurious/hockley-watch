import { createDB } from "$lib/global";
import type { Product } from "$lib/types";
import type { EndpointOutput } from "@sveltejs/kit";
import type { OkPacket, RowDataPacket } from "mysql2";

export async function get({ params }): Promise<EndpointOutput> {
    return new Promise((async resolve => {
        const queryString = `SELECT * FROM Products WHERE id=?`;
        let product: Product = null;
    
        let conn = await createDB();

        try {
            const result = await conn.query(queryString, params.id);

            product = (result as RowDataPacket)[0][0] as Product;

            if (!product) {
                resolve({ status: 404 });
                return;
            }
           
        } catch (e) {
            console.log(e);
        } finally {
            conn.end();
        }
        resolve({
            body: JSON.stringify(product),
            status: 200
        });
    }));
};