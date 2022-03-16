import { getNewIn } from "$lib/global";
import type { Product } from "$lib/types";

export async function get({ params }) {
    
    let list:Array<Product> = await getNewIn();
    
    return {
        body: JSON.stringify(list),
        status: 200
    };
};