<script context="module" lang="ts">
    import type { Product } from "$lib/types";
    import { onMount, onDestroy } from "svelte";

    let loading = true;

    /*export const load = async ({ params, fetch }) => {
        const resBS = await fetch("/shop/popular.json");
        let popular: Array<Product>;
        let clearance: Array<Product>;
        if (resBS.status == 200) {

            popular = await resBS.json();

        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (C:PL ${resBS.status})`)
            };
        }

        const resCL = await fetch("/shop/clearance.json");
        if (resCL.status == 200) {

            clearance = await resCL.json();

        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (C:CL ${resCL.status})`)
            };
        }

        return {
            props: {
                popular,
                clearance,
                loading
            }
        }
    };*/
</script>

<script lang="ts">
import ProductFeature from "$lib/ProductFeature.svelte";

    export let popular: Array<Product>;
    export let clearance: Array<Product>;

</script>

<svelte:head>
	<title>Properties | Surya Real Estate</title>
</svelte:head>

<container class="hwe-layout">
    Soon
</container>