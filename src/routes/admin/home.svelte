<script lang="ts">

    function sendToPage(loc: string) {
        window.location.href = loc;
    }

</script>

<svelte:head>
	<title>Home | Surya Administration</title>
</svelte:head>

<container class="container box hwe-layout">
    <section class="content has-text-centered">
        <h1>Surya Administration.</h1>
        <p>Welcome to the administration pannel. Please pick an option below.</p>
    </section>

    <div class="buttons is-centered">
        <button class="button is-danger" on:click={() => { sendToPage("/admin/property/manage") }}>Property Management</button>
        <button class="button is-danger" disabled>User Management</button>
        <button class="button is-black" on:click={() => { sendToPage("/") }}>Leave</button>
    </div>
</container>