import { getProductData, getRandomClearance } from "$lib/global";
import type { Product, ProductList } from "$lib/types";
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({ params }): Promise<EndpointOutput> {
    
    let list:Array<Product> = await getRandomClearance();
    
    return {
        body: JSON.stringify(list),
        status: 200
    };
};