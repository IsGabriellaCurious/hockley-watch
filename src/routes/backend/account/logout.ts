import * as cookie from "cookie"

export async function get({ request }) {
    const headers = {
        'Set-Cookie': cookie.serialize("auth", "expired", {
            httpOnly: true,
            expires: new Date('01 01 1970 00:00:00 GMT'),
            sameSite: 'strict',
            path: '/'
        }),
        'Location': '/'
    };

    return {
        headers,
        status: 302
    }
};