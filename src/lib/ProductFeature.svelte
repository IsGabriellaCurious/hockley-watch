<script lang="ts">
    import type { Product } from "./types";

    export let product: Product;

    function redirectProduct(id: number) {
        window.location.href = window.location.href + "shop/" + id;
    }
</script>

<div class="tile is-parent product hwe-layout" on:click={() => redirectProduct(product.id)}>
    <article class="tile is-child box">
        <figure class="image">
            <img src={product.coverimage} alt={product.name} />
        </figure>
        <br>
        <p class="title">{product.address}</p>
        <!--<p class="subtitle">by {product.brand}</p>-->
        <div class="content">
            <i class="fas fa-tag"/> <strong>£{product.price / 100}</strong>
            <br><br>

            <span class="has-tooltip-arrow" data-tooltip="{product.bedrooms} bedrooms.">
                <i class="fas fa-bed"/> {product.bedrooms}
            </span>
            &nbsp;&nbsp;<span class="has-tooltip-arrow" data-tooltip="{product.bathrooms} bathrooms.">
                <i class="fas fa-bath"/> {product.bathrooms}
            </span>
            &nbsp;&nbsp;<span class="has-tooltip-arrow" data-tooltip="{product.receptions} receptions.">
                <i class="fas fa-couch"/> {product.receptions}
            </span>
            &nbsp;&nbsp;<span class="has-tooltip-arrow" data-tooltip="{product.garden ? "This property has a garden." : "This property does not have a garden."}">
                <i class="fab fa-pagelines"/> {product.garden ? "Yes" : "No"}
            </span>
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