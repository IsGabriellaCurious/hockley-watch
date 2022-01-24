<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from "svelte";

	onMount(() => {
		window.location.href = window.location.href + "shop";
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<div class="container has-text-centered">
		Redirecting...
	</div>

</section>
