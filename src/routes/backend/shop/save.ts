import * as cookie from "cookie"
import { checkToken, getUserInfo, userUpdateSaved } from "$lib/global";
import type { AuthResult } from "$lib/types";

export async function post({ request }) {
    let body = await request.json();

    if (!body.id) {
        return {
            status: 400
        }
    }

    const cookies = cookie.parse(request.headers.get("cookie") || '');
    
    let authResult = await checkToken(cookies.auth) as AuthResult;

    if (authResult.result == "notoken" || authResult.result == "invalid") {
        return {
            status: 401
        }
    }

    let userinfo = await getUserInfo(authResult.id);

    if (userinfo.saved == null)
        userinfo.saved = JSON.parse("[]");
    
    let newSave = !userinfo.saved.includes(body.id);
    if (!newSave) {
        userinfo.saved.forEach((element,index) => {
            if (element == body.id) userinfo.saved.splice(index, 1);
        });
    } else {
        userinfo.saved.push(body.id);
    }

    let updated = await userUpdateSaved(userinfo);

    userinfo = await getUserInfo(authResult.id);

    return {
        status: updated ? 200 : 400,
        body: JSON.stringify({
            saved: userinfo.saved,
            message: newSave ? "This property has been added to your saved-for-later." : "This property has been removed from your saved-for-later."
        })
    };
};