<script context="module" lang="ts">
    let loading = true;

    export const load = async ({ params, fetch }) => {
        const res = await fetch("/backend/shop/" + params.id + ".json");
        if (res.status == 200) {

            const product = await res.json();

            return {
                props: {
                    product,
                    loading
                }
            };
        } else {
            return {
                status: res.status,
                error: new Error('This product does not exist. Please check the URL and try again.')
            };
        }

    };
</script>

<script lang="ts">
    import { generatePropertyName } from "$lib/browserfuncs";

    import type { Product } from "$lib/types";
    import { onMount } from "svelte";

    export let product: Product;

    export let propertyName: string = "loaing";

    onMount(() => {
        propertyName = generatePropertyName(product);
    })

    function back() {
        history.back();
    }
</script>

<svelte:head>
	<title>Property Edit | Surya Administration</title>
</svelte:head>

<container class="container box hwe-layout">
    <section class="content has-text-centered">
        <h1>Editing property {product.id}.</h1>
        <p>Remember to save your changes. All edits are pushed instantly to the live website.</p>
    </section>
</container>