import { getProductData } from "$lib/global";

export async function get({ params }) {
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