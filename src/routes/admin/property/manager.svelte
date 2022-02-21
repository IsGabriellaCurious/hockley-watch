<script context="module" lang="ts">
    import type { Product } from "$lib/types";

    export const load = async ({ params, fetch }) => {
        const res = await fetch("/backend/shop/listings.json?priceFilter=id");
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
    import AdminPropertyEntry from "$lib/admin/AdminPropertyEntry.svelte";

    export let prodList;
</script>

<svelte:head>
	<title>Property Management | Surya Administration</title>
</svelte:head>

<container class="container box hwe-layout">
    <section class="content has-text-centered">
        <h1>Property Management.</h1>
        <p>Manage the properties shown on the live website.</p>
    </section>

    <table class="table is-striped">
        <thead>
            <th>Id</th>
            <th>Address</th>
            <th>Type</th>
            <th>Rent</th>
            <th>Price</th>
            <th>Listed</th>
            <th>Sold</th>
            <th><abbr title="Newly Built">NB</abbr></th>
            <th><abbr title="Bedrooms">BD</abbr></th>
            <th><abbr title="Bathrooms">BA</abbr></th>
            <th><abbr title="Receptions">RE</abbr></th>
            <th><abbr title="Pets">PT</abbr></th>
        </thead>
        <tbody>
            {#each prodList as p}
                <AdminPropertyEntry product={p}/>
            {/each}
        </tbody>
    </table>

    <div class="buttons is-right">
        <button class="button is-success is-light">New Property</button>
    </div>
</container>