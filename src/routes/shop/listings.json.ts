import { getAll } from "$lib/global";
import type { Product } from "$lib/types";
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({ url }): Promise<EndpointOutput> {

    let type = url.searchParams.get('type');
    let priceFilter = url.searchParams.get('priceFilter');

    let list:Array<Product> = await getAll(type, priceFilter);
    
    return {
        body: JSON.stringify(list),
        status: 200
    };
};