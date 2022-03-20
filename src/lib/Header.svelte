<script lang="ts">
	import { afterUpdate, beforeUpdate, onMount, tick } from "svelte";
	import type { UserInfo } from "./types";

	let userinfo: UserInfo;

	export let adminMode = false;
	export let devEnv = false;

	let mobileMenuActive = false;

	onMount(async () => {
		const req = await fetch('/backend/account/me?redirectonfail=false');

		if (req.status == 200) {
			userinfo = await req.json() as UserInfo;
		} else {
			userinfo = null;
		}

		adminMode = window.location.href.includes("admin");
		devEnv = window.location.hostname == "localhost";
	});
</script>

<header>
	{#if devEnv}
		<div class="notification is-danger is-light has-text-centered" style="border-radius: 0; margin: 0;">
			<i class="fa-solid fa-triangle-exclamation fa-fw" />&nbsp;You are viewing a development build. All content is subject to change. 
		</div>
	{/if}
	<nav class="navbar {adminMode ? "is-danger" : "is-link"}">
		<div class="navbar-brand">
			<a class="navbar-item" href="{adminMode ? "/admin/home" : "/"}">{adminMode ? "Surya Administration" : "Surya Real Estate"}</a>
		
			<a role="button" class="navbar-burger {mobileMenuActive ? "is-active" : ""}" aria-label="menu" aria-expanded="false" on:click={() => {mobileMenuActive = !mobileMenuActive;}}>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</a>
		</div>
		
		<div class="navbar-menu {mobileMenuActive ? "is-active" : ""}">
			<div class="navbar-end">
				<a class="navbar-item" href="/" on:click={() => {mobileMenuActive = false;}}>Home</a>
				<a class="navbar-item" href="/shop" on:click={() => {mobileMenuActive = false;}}>Properties</a>
				<a class="navbar-item" href="/about" on:click={() => {mobileMenuActive = false;}}>About Us</a>
				<a class="navbar-item" href="/contact" on:click={() => {mobileMenuActive = false;}}>Contact</a>
				{#if userinfo != null && userinfo.admin}
					<a class="navbar-item" href="/admin/home" on:click={() => {mobileMenuActive = false;}}>Admin</a>
				{/if}
				<a class="navbar-item" href="/account/home">
					<button class="button {adminMode ? "is-black" : "is-primary"}" on:click={() => {mobileMenuActive = false;}}>
						<i class="fa-solid fa-user-large" />&nbsp;{!userinfo ? "Sign In" : userinfo.firstname + "'s Account"}
					</button>
				</a>
			</div>
		</div>
	</nav>
</header>

