<script context="module" lang="ts">
    let loading = true;

    export const load = async ({ params, fetch }) => {
        const res = await fetch(params.id + ".json");
        const product = await res.json();

        console.log("is now " + JSON.stringify(res))

        return {
            props: {
                product,
                loading
            }
        };
    };
</script>

<script lang="ts">
    import type { Product } from "$lib/types";
    import { onDestroy, onMount } from "svelte";

    export let product: Product;
    export let loading: boolean;

    onMount(() => {
        loading = false;
    });

    onDestroy(() => {
        loading = true;
    })
</script>


<div class="pageloader is-link {loading ? "is-active" : ""}"><span class="title">Bare with!</span></div>

<container class="container box">
    <section>
        <figure class="image">
            <img src={product.coverimg} alt={product.name}/>
        </figure>
        <br>
        <h1 class="has-text-centered"><strong>{product.name}</strong></h1><br>

        {#if !product.reduced}
            <h1 class="has-text-centered">£{product.price}</h1>
        {:else}
            <h1 class="has-text-centered">£{product.reduced_price} <span class="discount"><strike>£{product.price}</strike></span></h1>
        {/if}

        <br>
        <p class="has-text-centered">{product.description}</p>
    </section>
    <section class="section">
        <nav class="level">
            <div class="level-item has-text-centered">
                <button class="button is-primary">Add to basket</button>
            </div>
            <div class="level-item has-text-centered">
                <button class="button is-link">Save for later</button>
            </div>
        </nav>
    </section>
</container>

<style>
    .image {
        max-height: 256px;
    }

    .image > img {
        height: initial;
        max-height: inherit;
        width: auto;
        margin: 0 auto;
    }

    .discount {
        color: red;
    }
</style>