<script lang="ts">
	import { onMount } from "svelte";
	import type { UserInfo } from "./types";

	let userinfo: UserInfo;

	onMount(async () => {
		const req = await fetch('/backend/account/me?redirectonfail=false');

		if (req.status == 200) {
			userinfo = await req.json() as UserInfo;
		} else {
			userinfo = null;
		}
	});
</script>

<header>
	<nav class="navbar is-link">
		<div class="navbar-brand">
			<a class="navbar-item" href="/">Surya Real Estate</a>
		</div>

		<div class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item" href="/">Home</a>
				<a class="navbar-item" href="/shop">Properties</a>
				<a class="navbar-item" href="/about">About Us</a>
				<a class="navbar-item" href="/contact">Contact</a>
				<a class="navbar-item" href="/account/home">
					<button class="button is-primary">
						{!userinfo ? "Sign in" : userinfo.firstname + "'s Account"}
					</button>
				</a>
			</div>
		</div>
	</nav>
</header>

