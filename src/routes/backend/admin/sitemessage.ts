import { getSiteMessage } from "$lib/global";

export async function get({ request }) {
    let msg = await getSiteMessage();

    return {
        body: JSON.stringify(msg)
    };
};