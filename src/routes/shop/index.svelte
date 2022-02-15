<script context="module" lang="ts">
    import type { Product } from "$lib/types";

    let loading = true;

    export const load = async ({ params, fetch }) => {
        const res = await fetch("/shop/listings.json");
        let prodList: Array<Product>;
        if (res.status == 200) {

            prodList = await res.json();

            //console.log(prodList);

        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (${res.status})`)
            };
        }

        return {
            props: {
                prodList,
                loading
            }
        }
    };
</script>

<script lang="ts">
    import ProductFeature from "$lib/ProductFeature.svelte";

    export let prodList: Array<Product>;

</script>

<svelte:head>
	<title>Properties | Surya Real Estate</title>
</svelte:head>

<container class="hwe-layout">
    <div class="content has-text-centered">
        <h1>Browse our homes.</h1>
        <p>Browse our quality listings, use the filters to find the perfect home for you.</p>
    </div>
    <section class="section">
        <div class="columns is-multiline">
            {#each prodList as p}
                <ProductFeature product={p}/>
            {/each}
        </div>
    </section>
</container>