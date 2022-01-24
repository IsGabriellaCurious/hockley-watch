import { getProductData } from "$lib/global";
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({ params }): Promise<EndpointOutput> {
    let product = await getProductData(params.id);
    if (product == null) {
        return {
            status: 404
        };
    }
    
    return {
        body: JSON.stringify(product),
        status: 200
    };
};