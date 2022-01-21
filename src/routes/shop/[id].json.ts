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

            const row = (<RowDataPacket> result)[0][0];
            product = (result as RowDataPacket)[0][0] as Product;
            /*product = {
                id: row?.id,
                name: row?.name,
                brand: row?.brand,
                description: row?.description,
                coverimg: row?.coverimg,
                price: row?.price,
                reduced: row?.reduced,
                reduced_price: row?.reduced_price
            };*/

            if (!product) {
                resolve({ status: 404 });
                return;
            }
           
        } catch (e) {
            console.log("AAAAAAAAAAA " + e);
        } finally {
            conn.end();
        }
        console.log("double check " + JSON.stringify(product))
        resolve({
            body: JSON.stringify(product)
        });
    }));
};