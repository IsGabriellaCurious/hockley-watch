import * as cookie from "cookie"
import { checkToken, createProductData, updateProductData } from "$lib/global";
import type { EndpointOutput } from "@sveltejs/kit";
import type { AuthResult, Product } from "$lib/types";

export async function post({ request }): Promise<EndpointOutput> {
    let prod = await request.json() as Product;

    if (!prod) {
        return {
            status: 400
        }
    }

    const cookies = cookie.parse(request.headers.get("cookie") || '');
    
    let authResult = await checkToken(cookies.auth) as AuthResult;

    if (authResult.result == "notoken" || authResult.result == "invalid" || !authResult.admin) {
        console.log(authResult.result);
        return {
            status: 401
        };
    }

    let updated = await createProductData(prod);

    return {
        status: updated ? 200 : 400,
        body: JSON.stringify({
            id: 0
        })
    };
};