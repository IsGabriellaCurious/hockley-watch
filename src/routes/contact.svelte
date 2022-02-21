<script lang="ts">
    import { isEmail } from "$lib/sharedfuncs";
    import * as bToast from "bulma-toast";

    let email = "";
    let message = "";

    let emailStatus = "";
    let messageStatus = "";

    let submitting = false;

    async function submit() {
        emailStatus = "disabled";
        messageStatus = "disabled";
        submitting = true;

        if (!email || !message) {

            if (!email) emailStatus = "is-danger"; else emailStatus = "";
            if (!message) messageStatus = "is-danger"; else messageStatus = "";

            bToast.toast({
                message: "You have not completed the form. Please fill in all the boxes.",
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });  
            
            submitting = false;
            return;
        }

        if (!isEmail(email)) {
            emailStatus = "is-danger";
            messageStatus = "";

            bToast.toast({
                message: "Please provide a vaild email address.",
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });  
            
            submitting = false;
            return;
        }

        const req = await fetch('/backend/submitcontact', {
            method: 'POST',
            body: JSON.stringify({
                'email': email,
                'message': message
            })
        });

        const res = await req.json();

        let type: bToast.ToastType = 'is-danger';
        if (req.status == 200) {
            type = 'is-success';

            email = "";
            message = "";

            emailStatus = "";
            messageStatus = "";
        } else {
            type = 'is-danger';
        }

        bToast.toast({
            message: res.message,
            type: type,
            dismissible: true,
            animate: { in: 'fadeInDown', out: 'fadeOutRight' },
            duration: 5000
        });  
        
        submitting = false;
    }
</script>


<svelte:head>
	<title>Contact Us | Surya Real Estate</title>
</svelte:head>

<container class="container box hwe-layout">
    <section class="content has-text-centered">
        <h1>We love your feedback.</h1>
        <p>Have a concern or just want to say hi? Drop us a message in the form below and we will get back to you ASAP.</p>
    </section>

    <br>
    <div class="field">
        <label class="label">Your email</label>
        <div class="control">
          <input 
            class="input {emailStatus}" 
            type="email" 
            placeholder="someone@example.com" 
            bind:value={email} 
            on:focus={() => { emailStatus = ""; }}
            disabled={emailStatus == "disabled"}
          >
        </div>
    </div>
      
    <div class="field">
        <label class="label">Message</label>
        <div class="control">
            <textarea 
                class="textarea {messageStatus}" 
                placeholder="I would like to give some feedback..." 
                bind:value={message} 
                on:focus={() => { messageStatus = ""; }}
                disabled={messageStatus == "disabled"}
            />
        </div>
    </div>

    <div class="control">
        <button class="button is-link is-centered {submitting ? "is-loading" : ""}" on:click={submit}>Submit</button>
    </div>  
</container>