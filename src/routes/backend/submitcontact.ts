import type { EndpointOutput } from "@sveltejs/kit";

export async function post({ request }): Promise<EndpointOutput> {
    let body = await request.json();

    console.log(body.email);
    console.log(body.message)

    return {
        body: {
            "message": "Your contact request has been submitted successfully. Thanks for your feedback."
        },
        status: 200
    }
};