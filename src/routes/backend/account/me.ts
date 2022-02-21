import * as cookie from "cookie"
import type { EndpointOutput } from "@sveltejs/kit";
import { checkToken, getUserInfo } from "$lib/global";

export async function get({ request, url }): Promise<EndpointOutput> {
    let redirectOnFail: boolean = url.searchParams.get('redirectonfail');
    if (redirectOnFail == null)
        redirectOnFail = true;


    const cookies = cookie.parse(request.headers.get("cookie") || '');
    
    let authResult = await checkToken(cookies.auth);

    if (authResult == "notoken" || authResult == "invalid") {
        return {
            body: {
                message: authResult
            },
            status: redirectOnFail ? 302 : 401
        }
    }

    let id = parseInt(authResult);

    let user = await getUserInfo(id);
    return {
        body: JSON.stringify(user),
        status: 200
    }
};