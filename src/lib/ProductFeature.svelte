<script lang="ts">
    import { beforeUpdate } from "svelte";

    import { generatePropertyName } from "$lib/browserfuncs";
    import type { Product } from "$lib/types";

    export let product: Product;
    export let clickPrefix: string = "/"

    export let propertyName: string = "loading";

    beforeUpdate(() => {
        propertyName = generatePropertyName(product, false);
    });

    function redirectProduct(id: number) {
        window.location.href = window.location.href + clickPrefix + id;
    }
</script>

<div class="column is-one-third product hwe-layout" on:click={() => redirectProduct(product.id)}>
    <article class="tile is-child box">
        <figure class="image">
            {#if product.new}
                <span title="Badge top right" class="badge">NEW PROPERTY</span>
            {/if}
            <img src={product.coverimage} alt={propertyName} />
        </figure>
        <br>
        <p class="title">{propertyName}</p>
        <p class="subtitle">{product.address}</p>
        <div class="content">
            <i class="fa-solid fa-tag"/> <strong>£{product.price}</strong> {product.rent ? "/month" : ""}
            <br><br>

            <span class="has-tooltip-arrow" data-tooltip="{product.bedrooms} bedrooms.">
                <i class="fa-solid fa-bed"/> {product.bedrooms}
            </span>
            &nbsp;&nbsp;<span class="has-tooltip-arrow" data-tooltip="{product.bathrooms} bathrooms.">
                <i class="fa-solid fa-bath"/> {product.bathrooms}
            </span>
            &nbsp;&nbsp;<span class="has-tooltip-arrow" data-tooltip="{product.receptions} receptions.">
                <i class="fa-solid fa-couch"/> {product.receptions}
            </span>
            &nbsp;&nbsp;<span class="has-tooltip-arrow" data-tooltip="{product.garden ? "This property has a garden." : "This property does not have a garden."}">
                <i class="fa-brands fa-pagelines"/> {product.garden ? "Yes" : "No"}
            </span>

            {#if product.rent}
                <br><span class="has-tooltip-arrow" data-tooltip="{product.pets ? "This property allows pets: " + product.pets_info : "This property does not allow pets."}">
                    <i class="fa-solid fa-cat"/> {product.pets ? "Yes" : "No"}
                </span>
            {/if}
        </div>
    </article>
</div>

<style>
    div.product {
        transition: 0.1s transform ease-out;
        cursor: pointer;
    }

    div.product:hover {
        transform: scale(1.05);
    }

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