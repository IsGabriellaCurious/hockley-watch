<script lang="ts">
    let loginSelected = true;

    function topButtonClick(loginClicked: boolean) {
        loginSelected = loginClicked;
    }
</script>

<svelte:head>
	<title>Login | Surya Real Estate</title>
</svelte:head>

<container class="container box hwe-layout">

    <div class="buttons are-large has-addons is-centered">
        <button class="button is-ghost {loginSelected ? "hwe-login-active" : "hwe-login-inactive"} hwe-login-extra has-text-centered" on:click={() => topButtonClick(true)}>Sign in</button>
        <button class="button is-ghost {!loginSelected ? "hwe-login-active" : "hwe-login-inactive"} hwe-login-extra has-text-centered" on:click={() => topButtonClick(false)}>Register</button>
    </div>

    <section>
        {#if loginSelected}
            <p class="content has-text-centered">Welcome back!</p>

            <div class="field">
                <label class="label">Your e-mail</label>
                <div class="control">
                  <input class="input" type="email" placeholder="someone@example.com">
                </div>
            </div>
              
              <div class="field">
                <label class="label">Your password</label>
                <div class="control">
                    <input class="input" type="password" placeholder="...">
                </div>
            </div>
        
            <div class="control">
                <button class="button is-link is-centered level-item">Login</button>
            </div>
            <br>
            <p class="content"><a href="/account/recovery">Forgot your password?</a></p>
        {:else}
            <p class="content has-text-centered">Welcome! We are so glad you're here.<br>Please create your account with the form below.</p>

            <div class="field">
                <label class="label">Email address</label>
                <div class="control">
                    <input class="input" type="email" placeholder="markjames@mathteacher.edu.uk">
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
                            <option>Prefer not to say.</option>
                        </select>
                    </div>
                </div>
              </div>

            <div class="field">
                <label class="label">First name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="Mark">
                </div>
            </div>

            <div class="field">
                <label class="label">Last name</label>
                <div class="control">
                  <input class="input" type="text" placeholder="James">
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                  <input class="input" type="password" placeholder="...">
                </div>
            </div>

            <div class="field">
                <label class="label">Confirm your password</label>
                <div class="control">
                  <input class="input" type="password" placeholder="...">
                </div>
            </div>

            <p class="content">By clicking 'Register' you confirm you have read, understood and accept our <a href="/legal/terms">Terms and Contions</a> and are ready to find your perfect new home.</p>
        
            <div class="control">
                <button class="button is-link is-centered level-item">Register</button>
            </div>
        {/if}
    </section>
</container>

<style>
    .hwe-login-active {
        border-bottom: 5px solid blue;
    }

    .hwe-login-inactive {
        border-bottom: 5px solid grey;
    }

    .hwe-login-extra {
        padding-left: 70px;
        padding-right: 70px;

        color: black;
        outline: none;
    }

    .hwe-login-extra:hover {
        color: black;
        text-decoration: none;
    }
</style>