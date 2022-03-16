import { getTrending } from "$lib/global";
import type { Product } from "$lib/types";

export async function get({ params }) {
    
    let list:Array<Product> = await getTrending();

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