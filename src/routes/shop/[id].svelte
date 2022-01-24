<script context="module" lang="ts">
    let loading = true;

    export const load = async ({ params, fetch }) => {
        const res = await fetch(params.id + ".json");
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
    import type { Product } from "$lib/types";
    import { onDestroy, onMount } from "svelte";
    import * as bToast from "bulma-toast";

    export let product: Product;
    export let loading: boolean;

    onMount(() => {
        loading = false;
    });

    onDestroy(() => {
        loading = true;
    });

    function onBasketClick() {
        bToast.toast({
            message: `${product.name} has been added to your basket!`,
            type: 'is-success',
            dismissible: true,
            animate: { in: 'fadeInDown', out: 'fadeOutRight' },
            duration: 5000
        });
    }
</script>

<svelte:head>
	<title>{product.name}</title>
</svelte:head>

<div class="pageloader is-link {loading ? "is-active" : ""}"><span class="title">Bear with!</span></div>

<container class="container box has-text-centered">
    <section>
        <figure class="image">
            <img src={product.coverimg} alt={product.name}/>
        </figure>
        <br>
        <h1><strong>{product.name}</strong> by {product.brand}</h1>

        {#if product.stock <= 10 && product.stock > 0}
            <p class="stockAlert">ONLY {product.stock} REMAINING!</p> 
        {:else if product.stock <= 0}
            <p class="stockAlert">OUT OF STOCK</p> 
        {/if}

        {#if !product.reduced}
            <h1>£{product.price}</h1>
        {:else}
            <h1><span class="discount">£{product.price}</span> £{product.reduced_price}</h1>
        {/if}

        <br>
        <p>{product.description}</p>
    </section>
    <section class="section">
        <nav class="level">
            <div class="level-item">
                <button class="button is-primary" on:click={onBasketClick} disabled={product.stock <= 0}>Add to basket</button>
            </div>
            <div class="level-item">
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
</style>