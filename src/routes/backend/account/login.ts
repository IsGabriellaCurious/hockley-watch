import type { EndpointOutput } from "@sveltejs/kit";

export async function post({ request }): Promise<EndpointOutput> {
    let body = await request.json();

    return null;
};