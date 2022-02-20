import type { EndpointOutput } from "@sveltejs/kit";

import { createHash } from 'crypto';

export async function post({ request }): Promise<EndpointOutput> {
    let body = await request.json();

    if (!body.email || !body.password) {
        return {
            body: {
                message: "Login failed: missing username or password."
            },
            status: 401
        };
    }

    return null;
};