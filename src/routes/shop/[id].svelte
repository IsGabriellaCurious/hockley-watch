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

    function back() {
        history.back();
    }

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

<container class="container box hwe-layout">
    <button class="button is-link is-inverted" on:click={back}>Go Back</button>
    <section class="has-text-centered">
        <figure class="image">
            <img src={product.coverimage} alt={product.address}/>
        </figure>
        <br>
        <h1><strong>{product.address}</strong></h1>

        <i class="fas fa-tag"/> £{product.price / 100}

        <div class="divider">At a Glance</div>
        <i class="fas fa-bed"/> Bedrooms: {product.bedrooms}<br>
        <i class="fas fa-bath"/> Bathrooms: {product.bathrooms}<br>
        <i class="fas fa-couch"/> Receptions: {product.receptions}<br>
        <i class="fab fa-pagelines"/> Garden: {product.garden ? "Yes" : "No"}

        <div class="divider">Description</div>
        <p>{product.description}</p>
    </section>
    <section class="section">
        <nav class="level">
            <div class="level-item">
                <button class="button is-primary" on:click={onBasketClick} disabled={product.sold}>Enquire</button>
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