<script context="module" lang="ts">
    let loading = true;

    export function load({ error, status}) {
        return {
            props: {
                title: `Error ${status}`,
                message: error.message,
                loading
            }
        };
    }
</script>

<script lang="ts">
import { onMount } from "svelte";


    export let title;
    export let message;

    let backLoading = false;
    function onBackClick() {
        backLoading = true;
        history.back();
    }

</script>

<svelte:head>
	<title>{title} | Surya Real Estate</title>
</svelte:head>

<container class="container box has-text-centered">
    <h1><strong>{title}</strong></h1><br>
    <p>{message}</p><br>
    <button class="button is-primary {backLoading ? "is-loading" : ""}" on:click={onBackClick}>
        Go Back
    </button>
</container>