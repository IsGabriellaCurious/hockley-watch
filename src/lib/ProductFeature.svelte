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
            <!--<i class="fas fa-bed"/> Bedrooms: {product.bedrooms}<br>
            <i class="fas fa-bath"/> Bathrooms: {product.bathrooms}<br>
            <i class="fas fa-couch"/> Receptions: {product.receptions}<br>
            <i class="fab fa-pagelines"/> Garden: {product.garden ? "Yes" : "No"}-->

            <i class="fas fa-bed"/> {product.bedrooms}
            <i class="fas fa-bath"/> {product.bathrooms}
            <i class="fas fa-couch"/> {product.receptions}
            <i class="fab fa-pagelines"/> {product.garden ? "Yes" : "No"}
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