<script context="module" lang="ts">
    import type { Product } from "$lib/types";
    import { onMount, onDestroy } from "svelte";

    let loading = true;

    export const load = async ({ params, fetch }) => {
        const resBS = await fetch("/shop/bestsellers.json");
        let bestsellers: Array<Product>;
        let clearance: Array<Product>;
        if (resBS.status == 200) {

            bestsellers = await resBS.json();

        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (C:BS ${resBS.status})`)
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
                bestsellers,
                clearance,
                loading
            }
        }
    };
</script>

<script lang="ts">
import ProductFeature from "$lib/ProductFeature.svelte";

    export let bestsellers: Array<Product>;
    export let clearance: Array<Product>;
    export let loading: boolean;

    onMount(() => {
        loading = false;
    });

    onDestroy(() => {
        loading = true;
    });
</script>

<svelte:head>
	<title>Shop</title>
</svelte:head>

<div class="pageloader is-link {loading ? "is-active" : ""}"><span class="title">Bear with!</span></div>

<container>
    <div class="content has-text-centered">
        <h1>Shop Our Watches</h1>
        <p>Discover our selection of top-of-the-line watches right at your fingertips.</p>
    </div>

    <!--Best Sellers-->
    <section class="section">
        <section class="hero is-link is-small">
            <div class="hero-body">
                <p class="title">
                    Best Selling
                </p>
                <p class="subtitle">
                    Browse our all-time best selling watches.
                </p>
            </div>
        </section>
        <br>
        <div class="tile is-ancestor">
            {#each bestsellers as bs}
                <ProductFeature product={bs}/>
            {/each}
        </div>
    </section>

    <!--Clerance-->
    <section class="section">
        <section class="hero is-danger is-small">
            <div class="hero-body">
                <p class="title">
                    Clearance
                </p>
                <p class="subtitle">
                    Check out our reduced items for even better value.
                </p>
            </div>
        </section>
        <br>
        <div class="tile is-ancestor">
            {#each clearance as cl}
                <ProductFeature product={cl}/>
            {/each}
        </div>
    </section>
</container>