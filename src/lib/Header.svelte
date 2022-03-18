<script lang="ts">
	import { afterUpdate, beforeUpdate, onMount, tick } from "svelte";
	import type { UserInfo } from "./types";

	let userinfo: UserInfo;

	export let adminMode = false;

	onMount(async () => {
		const req = await fetch('/backend/account/me?redirectonfail=false');

		if (req.status == 200) {
			userinfo = await req.json() as UserInfo;
		} else {
			userinfo = null;
		}

		adminMode = window.location.href.includes("admin");
	});
</script>

<header>
	<nav class="navbar {adminMode ? "is-danger" : "is-link"}">
		<div class="navbar-brand">
			<a class="navbar-item" href="{adminMode ? "/admin/home" : "/"}">{adminMode ? "Surya Administration" : "Surya Real Estate"}</a>
		</div>

		<div class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item" href="/">Home</a>
				<a class="navbar-item" href="/shop">Properties</a>
				<a class="navbar-item" href="/about">About Us</a>
				<a class="navbar-item" href="/contact">Contact</a>
				{#if userinfo != null && userinfo.admin}
					<a class="navbar-item" href="/admin/home">Admin</a>
				{/if}
				<a class="navbar-item" href="/account/home">
					<button class="button {adminMode ? "is-black" : "is-primary"}">
						<i class="fa-solid fa-user-large" />&nbsp;{!userinfo ? "Sign In" : userinfo.firstname + "'s Account"}
					</button>
				</a>
			</div>
		</div>
	</nav>
</header>

