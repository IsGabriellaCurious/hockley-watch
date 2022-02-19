import type { EndpointOutput } from "@sveltejs/kit";

export async function post({ request }): Promise<EndpointOutput> {
    console.log(request.body);

    return {
        body: {
            "message": "Your contact request has been submitted successfully. Thanks for your feedback.",
            "status": 200
        },
        status: 200
    }
};