<script lang="ts">
    import type { Product } from "./types";

    export let product: Product;

    function redirectProduct(id: number) {
        window.location.href = window.location.href + "/" + id;
    }
</script>

<div class="tile is-parent product" on:click={() => redirectProduct(product.id)}>
    <article class="tile is-child box">
        <figure class="image">
            <img src={product.coverimg} alt={product.name} />
        </figure>
        <br>
        <p class="title">{product.name}</p>
        <p class="subtitle">by {product.brand}</p>
        <div class="content">
            {#if !product.reduced}
                £{product.price}
            {:else}
                <span class="discount">£{product.price}</span> £{product.reduced_price}
            {/if}
            {#if product.stock <= 10}
                <p class="stockAlert">ONLY {product.stock} REMAINING!</p>
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