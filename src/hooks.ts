import * as cookie from "cookie";
import type { Handle } from '@sveltejs/kit';
import type { AuthResult, UserInfo } from '$lib/types';
import { checkToken } from "$lib/global";

export const handle: Handle = async ({ event, resolve }) => {
	try {
		if (event.url.pathname.startsWith("/admin/")) {
			const cookies = cookie.parse(event.request.headers.get('cookie') || '');
    
			let authResult = await checkToken(cookies.auth) as AuthResult;
		
			if (authResult.result == "notoken" || authResult.result == "invalid") {
				return new Response(authResult.result);
			}

			if (!authResult.admin) {
				return new Response("403");
			}
		}
	} catch (e) {
		console.log(e);
		return new Response("500 " + e);
	}

	const response = await resolve(event);

	return response;
};
