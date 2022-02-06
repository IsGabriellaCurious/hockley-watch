<script lang="ts">
	import Header from '$lib/header/Header.svelte';
	import 'bulma/css/bulma.min.css';
	import 'bulma-extensions/bulma-pageloader/dist/css/bulma-pageloader.min.css'
	import "@creativebulma/bulma-divider/dist/bulma-divider.css";
	import 'animate.css/animate.min.css';
	import '../app.css';
</script>

<head>
	<script src="https://kit.fontawesome.com/c30c43e242.js" crossorigin="anonymous"></script>
</head>

<Header />

<main>
	<slot />
</main>