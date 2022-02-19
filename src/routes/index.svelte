<script context="module" lang="ts">
    import type { Product } from "$lib/types";
    import { onMount, onDestroy } from "svelte";

    let loading = true;

    export const load = async ({ params, fetch }) => {
        const resBS = await fetch("/backend/shop/popular.json");
        let popular: Array<Product>;
        let newin: Array<Product>;
        if (resBS.status == 200) {

            popular = await resBS.json();

        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (C:PL ${resBS.status})`)
            };
        }

        const resNI = await fetch("/backend/shop/newin.json");
        if (resNI.status == 200) {

            newin = await resNI.json();

        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (C:NI ${resNI.status})`)
            };
        }

        return {
            props: {
                popular,
                newin,
                loading
            }
        }
    };
</script>

<script lang="ts">
    import ProductFeature from "$lib/ProductFeature.svelte";

    export let popular: Array<Product>;
    export let newin: Array<Product>;

</script>

<svelte:head>
	<title>Home | Surya Real Estate</title>
</svelte:head>

<container class="hwe-layout">
    <div class="content has-text-centered">
        <h1>Welcome.</h1>
        <p>Are you ready to find your next home? You're at the right place. Here at Surya, we pride ourselves in our quality listings that are sure to be absoltely perfect for you and your family.</p>
    </div>

    <!--New Houses-->
    <section class="section">
        <section class="hero is-danger is-small">
            <div class="hero-body">
                <p class="title">
                    Just in
                </p>
                <p class="subtitle">
                    See our newest listings, check them out before they go!
                </p>
            </div>
        </section>
        <br>
        <div class="columns">
            {#each newin as p}
                <ProductFeature product={p} clickPrefix="shop/"/>
            {/each}
        </div>
    </section>

	<!--Popular-->
	<section class="section">
		<section class="hero is-link is-small">
			<div class="hero-body">
				<p class="title">
					Most popular
				</p>
				<p class="subtitle">
					Browse our trending properties.
				</p>
			</div>
		</section>
		<br>
		<div class="columns">
			{#each popular as p}
				<ProductFeature product={p} clickPrefix="shop/"/>
			{/each}
		</div>
	</section>
</container>