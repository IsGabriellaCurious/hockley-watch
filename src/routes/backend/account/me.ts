import * as cookie from "cookie"
import type { EndpointOutput } from "@sveltejs/kit";
import { checkToken, getUserInfo } from "$lib/global";
import type { AuthResult } from "$lib/types";

export async function get({ request, url }): Promise<EndpointOutput> {
    let redirectOnFail: boolean = url.searchParams.get('redirectonfail');
    if (redirectOnFail == null)
        redirectOnFail = true;


    const cookies = cookie.parse(request.headers.get("cookie") || '');
    
    let authResult = await checkToken(cookies.auth) as AuthResult;

    if (authResult.result == "notoken" || authResult.result == "invalid") {
        return {
            body: {
                message: authResult.result
            },
            status: redirectOnFail ? 302 : 401
        }
    }

    let user = await getUserInfo(authResult.id);
    return {
        body: JSON.stringify(user),
        status: 200
    }
};