import * as cookie from "cookie"
import { checkToken } from "$lib/global";
import type { EndpointOutput } from "@sveltejs/kit";

export async function post({ request }): Promise<EndpointOutput> {
    let body = await request.json();

    if (!body.id) {
        return {
            status: 400
        }
    }

    const cookies = cookie.parse(request.headers.get("cookie") || '');
    
    let authResult = await checkToken(cookies.auth);

    if (authResult == "notoken" || authResult == "invalid") {
        return {
            status: 401
        }
    }

    let id = parseInt(authResult);
    console.log(id + " " + body.id);
    return {
        status: 200
    };
};