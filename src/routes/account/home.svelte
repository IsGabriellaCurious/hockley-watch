<script context="module" lang="ts">
    import ProductFeature from "$lib/ProductFeature.svelte";
    import type { Product, UserInfo } from "$lib/types";

    export const load = async ({ fetch }) => {
        const res = await fetch("/backend/account/me");
        let myInfo: UserInfo;
        let savedProperties: Array<Product> = [];

        if (res.status == 200) {

            myInfo = await res.json();

            myInfo.saved.forEach(async (n) => {
                let r = await fetch("/backend/shop/" + n + ".json");
                let p = await r.json();
                savedProperties.push(p)
            });

        } else if (res.status == 302) {
            return {
                status: 302,
                redirect: '/account/login'
            }
        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (${res.status})`)
            };
        }

        return {
            props: {
                myInfo,
                savedProperties,
            }
        }
    };
</script>

<script lang="ts">
    export let myInfo: UserInfo;
    export let savedProperties: Array<Product>;

    function logout() {
        window.location.href = "/backend/account/logout";
    }
</script>

<svelte:head>
	<title>Account Home | Surya Real Estate</title>
</svelte:head>

<container class="container box hwe-layout">
    <section class="content has-text-centered">
        <h1>Welcome back, {myInfo.firstname}.</h1>
    </section>

    <div class="divider">Saved Properties</div>
    <section class="section">
        <div class="columns is-multiline">
            {#each savedProperties as p}
                <ProductFeature product={p} />
            {/each}
            </div>
    </section>

    <button class="button is-warning" on:click={logout}>Logout</button>
</container>