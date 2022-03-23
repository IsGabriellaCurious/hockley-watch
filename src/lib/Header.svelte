<script lang="ts">
	import { onMount } from "svelte";
	import type { SiteMessage, UserInfo } from "./types";

	let userinfo: UserInfo;

	export let adminMode = false;
	export let devEnv = false;

	export let showMsg: boolean = false;
	export let msg_text: string = "";
	export let msg_type: string = "";
	export let msg_prefix: string = "";

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

		const res = await fetch("/backend/admin/sitemessage");

		let data: SiteMessage = await res.json() as SiteMessage;
		
		if (data.sitemessage_type == 0) {
			showMsg = false;
		} else {
			msg_text = data.sitemessage_text;
			showMsg = true;

			switch(data.sitemessage_type) {
				case 1:
					msg_type = "is-primary";
					msg_prefix = "";
					break;
				case 2:
					msg_type = "is-primary";
					msg_prefix = "fa-circle-info";
					break;
				case 3:
					msg_type = "is-warning";
					msg_prefix = "fa-triangle-exclamation";
					break;
				case 4:
					msg_type = "is-danger";
					msg_prefix = "fa-circle-exclamation";
					break;
				default:
					showMsg = false;
					break;
			}
		}
	});
</script>

<header>
	{#if devEnv}
		<div class="notification is-danger is-light has-text-centered" style="border-radius: 0; margin: 0;">
			<i class="fa-solid fa-circle-exclamation fa-fw" />&nbsp;You are viewing a development build. All content is subject to change. 
		</div>
	{/if}
	{#if showMsg}
		<div class="notification {msg_type} is-light has-text-centered" style="border-radius: 0; margin: 0;">
			<i class="{msg_prefix != "" ? "fa-solid fa-fw " + msg_prefix : ""}" />&nbsp;{msg_text}
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

