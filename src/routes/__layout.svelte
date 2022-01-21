<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import 'bulma/css/bulma.min.css';
	import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css'
</script>

<Header />

<main>
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
