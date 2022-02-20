import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import * as cookie from "cookie"
import type { EndpointOutput } from "@sveltejs/kit";
import { getUserInfo } from "$lib/global";

export async function get({ request }): Promise<EndpointOutput> {
    const cookies = cookie.parse(request.headers.get("cookie") || '');
    
    let id;
    await jwt.verify(cookies.auth, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            id = null;
        } else {
            id = decoded.id;
        }    
    });

    if (id == null) {
        return {
            status: 302
        }
    }

    console.log("user is is " + id);
    let user = await getUserInfo(id);
    return {
        body: JSON.stringify(user),
        status: 200
    }
};