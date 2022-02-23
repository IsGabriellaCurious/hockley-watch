<script context="module" lang="ts">
    export const load = async ({ params, fetch }) => {

        let newProd = params.id == "new";

        if (params.id == "new") {
            let product = {
                type: 99,
                address: "",
                rent: false,
                newlyBuilt: false,
                garden: false,
                pets: false,
                pets_info: "",
                sold: false
            } as Product;
            return {
                props: {
                    product,
                    newProd
                }
            };
        }

        const res = await fetch("/backend/shop/" + params.id + ".json");
        if (res.status == 200) {

            const product = await res.json() as Product;

            product.price = product.price * 100;

            return {
                props: {
                    product,
                    newProd
                }
            };
        } else {
            return {
                status: res.status,
                error: new Error('This product does not exist. Please check the URL and try again.')
            };
        }

    };
</script>

<script lang="ts">
    import * as bToast from "bulma-toast";

    import type { Product } from "$lib/types";

    export let product: Product;
    export let newProd: boolean;

    function back() {
        history.back();
    }
    
    // ruh roh here we go
    let id_status = "";

    let address_status = "";

    let type_status = "";

    let rent_status = "";

    let description_status = "";

    let price_status = "";

    let listed_status = "";

    let coverimage_status = "";

    let sold_status = "";

    let nb_status = "";

    let bd_status = "";

    let ba_status = "";

    let re_status = "";

    let ga_status = "";

    let pt_status = "";
    let pto_status = "";

    let submitLoading = false;

    async function setAllStatus(status: string) {
        address_status = status;
        type_status = status;
        rent_status = status;
        price_status = status;
        bd_status = status;
        ba_status = status;
        re_status = status;
        ga_status = status;
        pt_status = status;
        pto_status = status;
        description_status = status;
        coverimage_status = status;
        sold_status = status;
        nb_status = status;
    }

    async function submit() {
        submitLoading = true;
        let success;
        let message;

        if (!product.address || !product.type || product.type == 99 || product.rent == null 
            || !product.price || !product.bedrooms || !product.bathrooms || !product.receptions
            || product.garden == null || product.pets == null || !product.description || !product.coverimage
            || product.sold == null || product.newlyBuilt == null) 
        {
            setAllStatus("");
            if (!product.address) address_status = "is-danger";
            if (!product.type || product.type == 99 ) type_status = "is-danger";
            if (product.rent == null) rent_status = "is-danger";
            if (!product.price) price_status = "is-danger";
            if (!product.bedrooms) bd_status = "is-danger";
            if (!product.bathrooms) ba_status = "is-danger";
            if (!product.receptions) re_status = "is-danger";
            if (product.garden == null) ga_status = "is-danger";
            if (product.pets == null) pt_status = "is-danger";
            if (!product.description) description_status = "is-danger";
            if (!product.coverimage) coverimage_status = "is-danger";
            if (product.sold == null) sold_status = "is-danger";
            if (product.newlyBuilt == null) nb_status = "is-danger";

            bToast.toast({
                message: "You have not completed the form. Please fill in all the boxes.",
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });  
            
            submitLoading = false;
            return;
        }


        let req;
        if (newProd) {
            req = await fetch('/backend/shop/createlisting', {
                method: 'POST',
                body: JSON.stringify(product)
            });
        } else {
            req = await fetch('/backend/shop/updatelisting', {
                method: 'POST',
                body: JSON.stringify(product)
            });
        }

        let json = await req.json();

        success = req.status == 200;
        message = success ? "The property has been " + (newProd ? "published" : "updated") + " successfully." : "Error updating property. Try again later.";

        bToast.toast({
            message: message,
            type: success ? "is-success" : "is-danger",
            dismissible: true,
            animate: { in: 'fadeInDown', out: 'fadeOutRight' },
            duration: 5000
        });  

        if (success)
            window.location.href = "/admin/property/manage?message=" + message + "&highlight=" + json.id;

        submitLoading = false;
    }

</script>

<svelte:head>
	<title>Property Edit | Surya Administration</title>
</svelte:head>

<container class="container box hwe-layout">
    <section class="content has-text-centered">
        {#if newProd}
            <h1>Register a new property.</h1>
            <p>Please fill out all the fields below. Once finished, check all inputs then click publish to make it live!</p>
        {:else}
            <h1>Editing {product.address}.</h1>
            <p>Remember to save your changes. All edits are pushed instantly to the live website.</p>
        {/if}
    </section>

    <section>
        <!-- Basic Info -->
        <div class="divider">Basic Details</div>
        <br>
        <div class="field">
            <label class="label">Address</label>
            <div class="control">
              <input 
                class="input {address_status}" 
                type="text" 
                placeholder="..."
                bind:value={product.address}
                on:focus={() => { address_status = ""; }}
                disabled={address_status == "disabled"}
              >
            </div>
        </div>

        <div class="field">
            <label class="label">Type</label>
            <div class="control">
                <div class="select {type_status}">
                    <select bind:value={product.type} on:focus={() => { type_status = ""; }}>
                        <option value=9 selected={product.type === 99} disabled>Please select</option>
                        <option value=0 selected={product.type === 0}>House</option>
                        <option value=1 selected={product.type === 1}>Flat</option>
                        <option value=2 selected={product.type === 2}>Bungalo</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Pricing -->
        <br>
        <div class="divider">Pricing</div>
        <br>
        <label class="label checkbox">
            Rented?<br>
            <input 
                class="{rent_status}"
                type="checkbox"
                bind:checked={product.rent}
                on:focus={() => { rent_status = "" }}
                disabled={rent_status == "disabled"}
            >
        </label>

        <div class="field">
            <label class="label">Price {product.rent ? "per month" : ""}</label>
            <div class="control">
              <input 
                class="input {price_status}" 
                type="number"
                step=".01"
                placeholder="..."
                bind:value={product.price}
                on:focus={() => { price_status = ""; }}
                disabled={price_status == "disabled"}
              >
              Please input the price in pennies (this is done by entering the price then adding the 2 penny digits on the end).
            </div>
        </div>

        <!-- Property Details -->
        <br>
        <div class="divider">Property Specifics</div>
        <br>
        <div class="field">
            <label class="label"># of Bedrooms</label>
            <div class="control">
              <input 
                class="input {bd_status}" 
                type="number"
                placeholder="..."
                bind:value={product.bedrooms}
                on:focus={() => { bd_status = ""; }}
                disabled={bd_status == "disabled"}
              >
            </div>
        </div>

        <div class="field">
            <label class="label"># of Bathrooms</label>
            <div class="control">
              <input 
                class="input {ba_status}" 
                type="number"
                placeholder="..."
                bind:value={product.bathrooms}
                on:focus={() => { ba_status = ""; }}
                disabled={ba_status == "disabled"}
              >
            </div>
        </div>

        <div class="field">
            <label class="label"># of Receptions</label>
            <div class="control">
              <input 
                class="input {re_status}" 
                type="number"
                placeholder="..."
                bind:value={product.receptions}
                on:focus={() => { re_status = ""; }}
                disabled={re_status == "disabled"}
              >
            </div>
        </div>

        <label class="label checkbox">
            Is there garden?<br>
            <input 
                class="{ga_status}"
                type="checkbox"
                bind:checked={product.garden}
                on:focus={() => { ga_status = "" }}
                disabled={ga_status == "disabled"}
            >
        </label>

        <label class="label checkbox">
            Are pets allowed?<br>
            <input 
                class="{pt_status}"
                type="checkbox"
                bind:checked={product.pets}
                on:focus={() => { pt_status = "" }}
                disabled={pt_status == "disabled"}
            >
        </label>

        {#if product.pets}
            <div class="field">
                <label class="label">Are there any specific pet rules?</label>
                <div class="control">
                <input 
                    class="input {pto_status}" 
                    type="text" 
                    placeholder="..."
                    bind:value={product.pets_info}
                    on:focus={() => { pto_status = ""; }}
                    disabled={pto_status == "disabled"}
                >
                </div>
            </div>
        {/if}

        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <textarea 
                    class="textarea {description_status}" 
                    placeholder="Lots of detail here!" 
                    bind:value={product.description} 
                    on:focus={() => { description_status = ""; }}
                    disabled={description_status == "disabled"}
                />
            </div>
        </div>

        <!-- Miscellaneous -->
        <br>
        <div class="divider">Miscellaneous</div>
        <br>
        <div class="field">
            <label class="label">Link to cover image</label>
            <div class="control">
              <input 
                class="input {coverimage_status}" 
                type="text"
                placeholder="..."
                bind:value={product.coverimage}
                on:focus={() => { coverimage_status = ""; }}
                disabled={coverimage_status == "disabled"}
              >
            </div>
        </div>

        <div class="field">
            <label class="label">Date Listed</label>
            <div class="control">
              <input 
                class="input {listed_status}" 
                type="text"
                placeholder="This will be filled automatically."
                bind:value={product.listed}
                on:focus={() => { listed_status = ""; }}
                disabled
              >
            </div>
        </div>

        <label class="label checkbox">
            Sold?<br>
            <input 
                class="{sold_status}"
                type="checkbox"
                bind:checked={product.sold}
                on:focus={() => { sold_status = "" }}
                disabled={sold_status == "disabled"}
            >
        </label>

        <label class="label checkbox">
            Newly Built?<br>
            <input 
                class="{nb_status}"
                type="checkbox"
                bind:checked={product.newlyBuilt}
                on:focus={() => { nb_status = "" }}
                disabled={nb_status == "disabled"}
            >
        </label>

        <div class="field is-grouped">
            <p class="control">
              <button class="button is-primary is-light {submitLoading ? "is-loading" : ""}" on:click={submit}>{newProd ? "Publish" : "Save"}</button>
            </p>
            <p class="control">
              <button class="button is-light" on:click={() => { window.location.href = "/admin/property/manage"}}>Cancel</button>
            </p>
          </div>
    </section>
</container>