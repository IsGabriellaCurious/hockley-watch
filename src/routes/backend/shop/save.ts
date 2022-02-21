import * as cookie from "cookie"
import { checkToken, getUserInfo, userUpdateSaved } from "$lib/global";
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

    let userinfo = await getUserInfo(id);

    if (userinfo.saved == null)
        userinfo.saved = JSON.parse("[]");
    
    if (userinfo.saved.includes(body.id)) {
        console.log("nah");
    } else {
        userinfo.saved.push(body.id);
    }

    let updated = await userUpdateSaved(userinfo);

    return {
        status: updated ? 200 : 400
    };
};