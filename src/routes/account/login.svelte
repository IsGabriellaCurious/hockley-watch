<script context="module" lang="ts">
    export const load = async ({ url }) => {
        let paramSuccess = url.searchParams.get('success');
        let paramMessage = url.searchParams.get('message')

        return {
            props: {
                paramSuccess,
                paramMessage
            }
        }
    };
</script>

<script lang="ts">
    import { isEmail } from "$lib/sharedfuncs";
    import * as bToast from "bulma-toast";
    import { onMount } from "svelte";

    export let paramSuccess;
    export let paramMessage;

    let loginSelected = true;

    function topButtonClick(loginClicked: boolean) {
        loginSelected = loginClicked;
    }

    onMount(() => {
        if (paramSuccess == "true") {
            bToast.toast({
                message: paramMessage,
                type: "is-success",
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });  
        }
    });

    // Register specific stuff
    let signup_email = "";
    let signup_email_status = "";

    let signup_title = "Please select";
    let signup_title_status = "";

    let signup_firstname = "";
    let signup_firstname_status = "";

    let signup_lastname = "";
    let signup_lastname_status = "";

    let signup_password = "";
    let signup_password_status = "";

    let signup_passwordconfirm = "";
    let signup_passwordconfirm_status = "";

    let signup_submitting = false;

    function regiserStatusSetAll(status: string) {
        signup_email_status = status;
        signup_title_status = status;
        signup_firstname_status = status;
        signup_lastname_status = status;
        signup_password_status = status;
        signup_passwordconfirm_status = status;
    }

    async function onRegisterClick() {
        signup_submitting = true;
        regiserStatusSetAll("disabled");

        if (!signup_email || !signup_title || signup_title == "Please select" || !signup_firstname || !signup_lastname || !signup_password || !signup_passwordconfirm) {

            if (!signup_email) signup_email_status = "is-danger"; else signup_email_status = "";
            if (!signup_title || signup_title == "Please select") signup_title_status = "is-danger"; else signup_title_status = "";
            if (!signup_firstname) signup_firstname_status = "is-danger"; else signup_firstname_status = "";
            if (!signup_lastname) signup_lastname_status = "is-danger"; else signup_lastname_status = "";
            if (!signup_password) signup_password_status = "is-danger"; else signup_password_status = "";
            if (!signup_passwordconfirm) signup_passwordconfirm_status = "is-danger"; else signup_passwordconfirm_status = "";

            bToast.toast({
                message: "You have not completed the form. Please fill in all the boxes.",
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });  
            
            signup_submitting = false;
            return;
        }

        if (!isEmail(signup_email)) {

            bToast.toast({
                message: "Please provide a vaild email address.",
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });  
            
            regiserStatusSetAll("");
            signup_email_status = "is-danger";
            signup_submitting = false;
            return;
        }

        if (signup_password != signup_passwordconfirm) {
            bToast.toast({
                message: "Passwords do not match. Please try again.",
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });  
            
            regiserStatusSetAll("");
            signup_password_status = "is-danger"
            signup_passwordconfirm_status = "is-danger"
            signup_submitting = false;
            return;
        }

        const req = await fetch('/backend/account/signup', {
            method: 'POST',
            body: JSON.stringify({
                'email': signup_email,
                'password': signup_password,
                'title': signup_title,
                'firstname': signup_firstname,
                'lastname': signup_lastname
            })
        });

        const res = await req.json();

        let type: bToast.ToastType = 'is-danger';

        if (req.status == 200) {
            type = 'is-success';
        }

        bToast.toast({
            message: res.message,
            type: type,
            dismissible: true,
            animate: { in: 'fadeInDown', out: 'fadeOutRight' },
            duration: 5000
        });  
        
        regiserStatusSetAll("");
        if (req.status == 200)
            window.location.href = "/account/login?success=true&message=" + res.message;
        signup_submitting = false;
    }

    // Login specific stuff
    let login_email = "";
    let login_email_status = "";

    let login_password = "";
    let login_password_status = "";

    let login_submitting = false;

    async function onLoginClick() {
        login_email_status = "disabled";
        login_password_status = "disabled";
        login_submitting = true;

        if (!login_email || !login_password) {

            if (!login_email) login_email_status = "is-danger"; else login_email_status = "";
            if (!login_password) login_password_status = "is-danger"; else login_password_status = "";

            bToast.toast({
                message: "You have not completed the form. Please fill in all the boxes.",
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });  
            
            login_submitting = false;
            return;
        }

        if (!isEmail(login_email)) {
            login_email_status = "is-danger";
            login_password_status = "";

            bToast.toast({
                message: "Please provide a vaild email address.",
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });  
            
            login_submitting = false;
            return;
        }

        const req = await fetch('/backend/account/login', {
            method: 'POST',
            body: JSON.stringify({
                'email': login_email,
                'password': login_password
            })
        });

        const res = await req.json();

        let type: bToast.ToastType = 'is-danger';

        if (req.status == 200) {
            window.location.href = "/account/home";
            return;
        }

        bToast.toast({
            message: res.message,
            type: type,
            dismissible: true,
            animate: { in: 'fadeInDown', out: 'fadeOutRight' },
            duration: 5000
        });  
        
        login_submitting = false;
        login_email_status = "";
        login_password_status = "";
    }
</script>

<svelte:head>
	<title>Access Control | Surya Real Estate</title>
</svelte:head>

<container class="container box hwe-layout">

    <div class="buttons are-large has-addons is-centered">
        <button class="button is-ghost {loginSelected ? "hwe-login-active" : "hwe-login-inactive"} hwe-login-extra has-text-centered" on:click={() => topButtonClick(true)}>Sign in</button>
        <button class="button is-ghost {!loginSelected ? "hwe-login-active" : "hwe-login-inactive"} hwe-login-extra has-text-centered" on:click={() => topButtonClick(false)}>Register</button>
    </div>

    <section>
        <!-- Login Form -->
        {#if loginSelected}
            <p class="content has-text-centered">Good to see you! Let's get back to the home hunting.</p>

            <div class="field">
                <label class="label">Your email</label>
                <div class="control">
                  <input class="input {login_email_status}" 
                    type="email" 
                    placeholder="someone@example.com" 
                    bind:value={login_email} 
                    on:focus={() => { login_email_status = ""; }}
                    disabled={login_email_status == "disabled"}
                  >
                </div>
            </div>
              
              <div class="field">
                <label class="label">Your password</label>
                <div class="control">
                    <input 
                        class="input {login_password_status}" 
                        type="password" 
                        placeholder="..." 
                        bind:value={login_password} 
                        on:focus={() => { login_password_status = ""; }}
                        disabled={login_password_status == "disabled"}
                    >
                </div>
            </div>
        
            <div class="control">
                <button 
                    class="button is-link is-centered level-item {login_submitting ? "is-loading" : ""}" 
                    on:click={onLoginClick}>
                    Login
                </button>
            </div>
            <br>
            <p class="content"><a href="/account/recovery">Forgot your password?</a></p>

        <!-- Register form -->    
        {:else}
            <p class="content has-text-centered">Welcome! We are so glad you're here.<br>Please create your account with the form below.</p>

            <div class="field">
                <label class="label">Email address</label>
                <div class="control">
                    <input 
                        class="input {signup_email_status}" 
                        type="email" 
                        placeholder="markjames@mathteacher.edu.uk"
                        bind:value={signup_email}
                        on:focus={() => { signup_email_status = ""; }}
                        disabled={signup_email_status == "disabled"}
                    >
                </div>
            </div>

            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <div class="select {signup_title_status}">
                        <select bind:value={signup_title} on:focus={() => { signup_title_status = ""; }}>
                            <option disabled selected>Please select</option>
                            <option>Mr.</option>
                            <option>Mrs.</option>
                            <option>Miss.</option>
                            <option>Ms.</option>
                            <option>Dr.</option>
                            <option>Mx.</option>
                            <option>Prefer not to say</option>
                        </select>
                    </div>
                </div>
              </div>

            <div class="field">
                <label class="label">First name</label>
                <div class="control">
                  <input 
                    class="input {signup_firstname_status}" 
                    type="text" 
                    placeholder="Mark"
                    bind:value={signup_firstname}
                    on:focus={() => { signup_firstname_status = ""; }}
                    disabled={signup_firstname_status == "disabled"}
                  >
                </div>
            </div>

            <div class="field">
                <label class="label">Last name</label>
                <div class="control">
                  <input 
                    class="input {signup_lastname_status}" 
                    type="text" 
                    placeholder="James"
                    bind:value={signup_lastname}
                    on:focus={() => { signup_lastname_status = ""; }}
                    disabled={signup_lastname_status == "disabled"}
                  >
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input 
                    class="input {signup_password_status}" 
                    type="password" 
                    placeholder="..."
                    bind:value={signup_password}
                    on:focus={() => { signup_password_status = ""; }}
                    disabled={signup_password_status == "disabled"}
                  >
                </div>
            </div>

            <div class="field">
                <label class="label">Confirm your password</label>
                <div class="control">
                  <input 
                    class="input {signup_passwordconfirm_status}" 
                    type="password" 
                    placeholder="..."
                    bind:value={signup_passwordconfirm}
                    on:focus={() => { signup_passwordconfirm_status = ""; }}
                    disabled={signup_passwordconfirm_status == "disabled"}
                  >
                </div>
            </div>

            <p class="content">By clicking 'Register' you confirm you have read, understood and accept our <a href="/legal/terms">Terms and Conditions</a> and are ready to find your perfect new home.</p>
        
            <div class="control">
                <button class="button is-link is-centered level-item" on:click={onRegisterClick}>Register</button>
            </div>
        {/if}
    </section>
</container>

<style>
    .hwe-login-active {
        border-bottom: 5px solid blue;
        color: black;
    }

    .hwe-login-inactive {
        border-bottom: 5px solid grey;
        color: grey;
    }

    .hwe-login-extra {
        padding-left: 70px;
        padding-right: 70px;

        outline: none;
    }

    .hwe-login-extra:hover {
        color: black;
        text-decoration: none;
    }
</style>