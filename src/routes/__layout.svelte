<script lang="ts">
	import Header from '$lib/Header.svelte';
	import 'bulma/css/bulma.min.css';
	import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css'
	import "@creativebulma/bulma-divider/dist/bulma-divider.min.css";
	import "@creativebulma/bulma-tooltip/dist/bulma-tooltip.min.css";
	import "@creativebulma/bulma-badge/dist/bulma-badge.min.css";
	import "bulma-list/css/bulma-list.css";
	import 'animate.css/animate.min.css';
	import '../app.css';
	import { onDestroy, onMount } from 'svelte';

	let loading = true;
	
	onMount(() => {
		loading = false;
	});
	
	onDestroy(() => {
		loading = true;
	});
</script>

<head>
	<script src="https://kit.fontawesome.com/c30c43e242.js" crossorigin="anonymous"></script>
</head>

<div class="pageloader is-link {loading ? "is-active" : ""}"><span class="title">Taking the bins out...</span></div>

<Header />
<br>
<main>
	<slot />
</main>
<br>
<footer class="footer">
	<div class="content has-text-centered">
		<p>
			Copyright © Surya Real Estate 2022<br>
			<a href="/">home</a> <a href="/shop">properties</a> <a href="/about">about</a> <a href="/contact">contact</a>
		</p>
	</div>
</footer>