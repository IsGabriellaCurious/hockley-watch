import { getProductData, getTopFour } from "$lib/global";
import type { Product, ProductList } from "$lib/types";
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({ params }): Promise<EndpointOutput> {
    
    let list:Array<Product> = await getTopFour();

    if (!list) {
        return {
            status: 500
        };
    }
    
    return {
        body: JSON.stringify(list),
        status: 200
    };
};