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
    import { generatePropertyName } from "$lib/browserfuncs";

    import type { Product } from "$lib/types";
    import * as bToast from "bulma-toast";
    import { onMount } from "svelte";

    export let product: Product;

    export let propertyName: string = "loaing";

    onMount(() => {
        propertyName = generatePropertyName(product);
    })

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
	<title>{propertyName} | Surya Real Estate</title>
</svelte:head>

<container class="container box hwe-layout">
    <section class="has-text-centered">
        <figure class="image">
            <img src={product.coverimage} alt={product.address}/>
        </figure>
        <br>
        <h1><strong>{propertyName}</strong></h1>
        {product.address}<br><br>

        <i class="fas fa-tag"/> £{product.price} {product.rent ? "/month" : ""}

        <div class="divider">At a Glance</div>
        <i class="fas fa-bed"/> Bedrooms: {product.bedrooms}<br>
        <i class="fas fa-bath"/> Bathrooms: {product.bathrooms}<br>
        <i class="fas fa-couch"/> Receptions: {product.receptions}<br>
        <i class="fab fa-pagelines"/> Garden: {product.garden ? "Yes" : "No"}
        {#if product.rent}
            <br><i class="fa-solid fa-cat"/> Pets: {product.pets ? "Yes" : "No"}
        {/if}

        <div class="divider">Description</div>
        <p>{product.description}</p>
        
        {#if product.rent}
            <br>
            <div class="divider">Pet Info</div>
            <p>{product.pets ? product.pets_info : "Pets are not allowed at this property."}</p>
        {/if}
    </section>

    <section class="section">
        <div class="buttons is-centered">
            <button class="button is-primary" on:click={onBasketClick} disabled={product.sold}>Enquire</button>
            <button class="button is-link">Save for later</button>
        </div>
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