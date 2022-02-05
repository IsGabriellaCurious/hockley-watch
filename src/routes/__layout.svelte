<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import 'bulma/css/bulma.min.css';
	import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css'
	import 'animate.css/animate.min.css';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>