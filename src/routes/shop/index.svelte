<script context="module" lang="ts">
    import type { Product } from "$lib/types";

    export const load = async ({ params, fetch }) => {
        const res = await fetch("/backend/shop/listings.json");
        let prodList: Array<Product>;
        if (res.status == 200) {

            prodList = await res.json();

        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (${res.status})`)
            };
        }

        return {
            props: {
                prodList
            }
        }
    };
</script>

<script lang="ts">
    import ProductFeature from "$lib/ProductFeature.svelte";

    export let prodList: Array<Product>;

    let activeClass = "is-link is-active";
    let type: number = null;
    let priceFilter: string = null;

    async function update() {
        const res = await fetch("/backend/shop/listings.json?type=" + type + "&priceFilter=" + priceFilter);
        prodList = await res.json();
    }
    
    function typeUpdate(_type: number) {
        type = _type;
        update();
    }

    function priceFilterUpdate(_priceFilter: string) {
        priceFilter = _priceFilter;
        update();
    }

</script>

<svelte:head>
	<title>Properties | Surya Real Estate</title>
</svelte:head>

<container class="hwe-layout">
    <div class="content has-text-centered">
        <h1>Browse our homes.</h1>
        <p>Browse our quality listings, use the filters to find the perfect home for you.</p>
    </div>
    <nav class="level">
        <div class="buttons has-addons level-item">
            <button class="button {type == null ? activeClass : ""}" on:click={() => typeUpdate(null)}>All</button>
            <button class="button {type == 0 ? activeClass : ""}" on:click={() => typeUpdate(0)}>House</button>
            <button class="button {type == 1 ? activeClass : ""}" on:click={() => typeUpdate(1)}>Flat</button>
            <button class="button {type == 2 ? activeClass : ""}" on:click={() => typeUpdate(2)}>Apartment</button>
        </div>
        <div class="buttons has-addons is-right level-item">
            <button class="button {priceFilter == null ? activeClass : ""}" on:click={() => priceFilterUpdate(null)}>Newest</button>
            <button class="button {priceFilter == "high" ? activeClass : ""}" on:click={() => priceFilterUpdate("high")}>High-to-low</button>
            <button class="button {priceFilter == "low" ? activeClass : ""}" on:click={() => priceFilterUpdate("low")}>Low-to-high</button>
        </div>
    </nav>
    <section class="section box">
        <div class="columns is-multiline">
            {#each prodList as p}
                <ProductFeature product={p}/>
            {/each}
        </div>
    </section>
</container>