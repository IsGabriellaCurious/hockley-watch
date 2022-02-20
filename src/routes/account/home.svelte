<script context="module" lang="ts">
    import type { UserInfo } from "$lib/types";

    export const load = async ({ fetch }) => {
        const res = await fetch("/backend/account/me");
        let myInfo: UserInfo;
        console.log(res.status)
        if (res.status == 200) {

            myInfo = await res.json();

        } else if (res.status == 302) {
            return {
                status: 302,
                redirect: '/account/login'
            }
        } else {
            return {
                status: 500,
                error: new Error(`There was an error processing your request. Please try again later. (${res.status})`)
            };
        }

        return {
            props: {
                myInfo
            }
        }
    };
</script>

<script lang="ts">
    export let myInfo: UserInfo;
</script>

<container class="container box hwe-layout">
    <section class="content has-text-centered">
        <h1>Welcome back, {myInfo.firstname}.</h1>
    </section>
</container>