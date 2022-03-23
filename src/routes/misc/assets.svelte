<script context="module" lang="ts">
    import type { Product } from "$lib/types";

    export const load = async ({ fetch }) => {

        const res = await fetch("/backend/shop/listings.json?priceFilter=id&showSold=true");
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
        };
    };
</script>

<script lang="ts">
    import AdminAssetEntry from "$lib/admin/AdminAssetEntry.svelte";

    export let prodList: Array<Product>;
</script>

<svelte:head>
	<title>Property Assests | Surya Administration</title>
</svelte:head>

<container class="container box hwe-layout">
    <section class="content has-text-centered">
        <h1>Property Assets.</h1>
        <p>Take a look at the generated asset table from all our properties.</p>
    </section>

    <table class="table is-striped">
        <thead>
            <th>Page</th>
            <th>Asset</th>
            <!--<th>Description</th>-->
            <th>Source</th>
        </thead>
        <tbody>
            {#each prodList as p}
                <AdminAssetEntry product={p} />
            {/each}
            <tr>
                <th>About Us</th>
                <td><img src="https://www.investinukcentral.com/wp-content/uploads/2019/11/solihull-town-centre-1-aspect-ratio-8x3.jpg" alt="Touchwood Shopping Centre." /></td>
                <td>https://www.investinukcentral.com/wp-content/uploads/2019/11/solihull-town-centre-1-aspect-ratio-8x3.jpg</td>
            </tr>
        </tbody>
    </table>
</container>