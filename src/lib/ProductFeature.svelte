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
        <p class="title">{product.name}</p>
        <!--<p class="subtitle">by {product.brand}</p>-->
        <div class="content">
            £{product.price}
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