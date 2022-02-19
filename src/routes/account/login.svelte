<script lang="ts">
    import { isEmail } from "$lib/sharedfuncs";
    import * as bToast from "bulma-toast";

    let loginSelected = true;

    function topButtonClick(loginClicked: boolean) {
        loginSelected = loginClicked;
    }

    // Login specific stuff
    let login_email = "";
    let login_email_status = "";

    let login_password = "";
    let login_password_status = "";

    let login_submitting = false;

    function onLoginClick() {
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
    }
</script>

<svelte:head>
	<title>Account Control | Surya Real Estate</title>
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
                        class="input" 
                        type="email" 
                        placeholder="markjames@mathteacher.edu.uk"
                    >
                </div>
            </div>

            <div class="field">
                <label class="label">Title</label>
                <div class="control">
                    <div class="select">
                        <select>
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
                    class="input" 
                    type="text" 
                    placeholder="Mark"
                  >
                </div>
            </div>

            <div class="field">
                <label class="label">Last name</label>
                <div class="control">
                  <input 
                    class="input" 
                    type="text" 
                    placeholder="James"
                  >
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input 
                    class="input" 
                    type="password" 
                    placeholder="..."
                  >
                </div>
            </div>

            <div class="field">
                <label class="label">Confirm your password</label>
                <div class="control">
                  <input 
                    class="input" 
                    type="password" 
                    placeholder="..."
                  >
                </div>
            </div>

            <p class="content">By clicking 'Register' you confirm you have read, understood and accept our <a href="/legal/terms">Terms and Conditions</a> and are ready to find your perfect new home.</p>
        
            <div class="control">
                <button class="button is-link is-centered level-item">Register</button>
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