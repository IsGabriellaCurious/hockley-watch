import { getAll } from "$lib/global";
import type { Product } from "$lib/types";
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({ url }): Promise<EndpointOutput> {

    let type = url.searchParams.get('type');
    let priceFilter = url.searchParams.get('priceFilter');
    let showSold = url.searchParams.get('showSold')

    let list:Array<Product> = await getAll(type, priceFilter, showSold);
    
    return {
        body: JSON.stringify(list),
        status: 200
    };
};