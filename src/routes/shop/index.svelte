<script context="module" lang="ts">
    import type { Product } from "$lib/types";

    let loading = true;

    export const load = async ({ params, fetch }) => {
        const res = await fetch("/shop/listings.json");
        let prodList: Array<Product>;
        var arrays: Array<Array<Product>> = [];
        if (res.status == 200) {

            prodList = await res.json();

            /*for (let i = 0; i < prodList.length; i += 4) {
                arrays.push(prodList.slice(i, i + 4));
            }*/

        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (${res.status})`)
            };
        }

        return {
            props: {
                prodList,
                arrays,
                loading
            }
        }
    };
</script>

<script lang="ts">
    import ProductFeature from "$lib/ProductFeature.svelte";

    let prodList: Array<Product>;
    var arrays: Array<Array<Product>>;

</script>

<svelte:head>
	<title>Properties | Surya Real Estate</title>
</svelte:head>

<container class="hwe-layout">
    <section class="section">
            <div class="tile is-ancestor">
            {#each prodList as p}
                <ProductFeature product={p}/>
            {/each}
        </div>
    </section>
</container>