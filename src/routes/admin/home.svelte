<script context="module" lang="ts">
    import type { UserInfo } from "$lib/types";

    export const load = async ({ fetch }) => {
        const res = await fetch("/backend/account/me");
        let myInfo: UserInfo;

        if (res.status == 200) {

            myInfo = await res.json();

            if (!myInfo.admin) {
                return {
                    status: 302,
                    redirect: '/'
                }
            }

        } else {
            return {
                status: 302,
                redirect: '/'
            };
        }

        return {
            props: {
                myInfo
            }
        }
    };
</script>