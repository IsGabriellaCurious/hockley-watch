import { getNewIn } from "$lib/global";
import type { Product } from "$lib/types";
import type { EndpointOutput } from "@sveltejs/kit";

export async function get({ params }): Promise<EndpointOutput> {
    
    let list:Array<Product> = await getNewIn();
    
    return {
        body: JSON.stringify(list),
        status: 200
    };
};