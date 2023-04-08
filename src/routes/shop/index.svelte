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
    <nav class="columns">
        <div class="column">
            <div class="buttons has-addons is-pulled-left">
                <button class="button {type == null ? activeClass : ""}" on:click={() => typeUpdate(null)}>
                    <span class="icon is-small">
                        <i class="fa-solid fa-list" />
                    </span>
                    <span>All</span>
                </button>
                <button class="button {type == 0 ? activeClass : ""}" on:click={() => typeUpdate(0)}>
                    <span class="icon is-small">
                        <i class="fa-solid fa-house-chimney" />
                    </span>
                    <span>House</span>
                </button>
                <button class="button {type == 1 ? activeClass : ""}" on:click={() => typeUpdate(1)}>
                    <span class="icon is-small">
                        <i class="fa-solid fa-building" />
                    </span>
                    <span>Flat</span>
                </button>
                <button class="button {type == 2 ? activeClass : ""}" on:click={() => typeUpdate(2)}>
                    <span class="icon is-small">
                        <i class="fa-solid fa-hotel" />
                    </span>
                    <span>Apartment</span>
                </button>
            </div>
        </div>
        <div class="column">
            <div class="buttons has-addons is-pulled-right">
                <button class="button {priceFilter == null ? activeClass : ""}" on:click={() => priceFilterUpdate(null)}>
                    <span class="icon is-small">
                        <i class="fa-solid fa-sort" />
                    </span>
                    <span>Newest</span>
                </button>
                <button class="button {priceFilter == "high" ? activeClass : ""}" on:click={() => priceFilterUpdate("high")}>
                    <span class="icon is-small">
                        <i class="fa-solid fa-arrow-up-wide-short" />
                    </span>
                    <span>High-to-low</span>
                </button>
                <button class="button {priceFilter == "low" ? activeClass : ""}" on:click={() => priceFilterUpdate("low")}>
                    <span class="icon is-small">
                        <i class="fa-solid fa-arrow-down-short-wide" />
                    </span>
                    <span>Low-to-high</span>
                </button>
            </div>
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
