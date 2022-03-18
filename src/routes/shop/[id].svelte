<script context="module" lang="ts">
    export const load = async ({ params, fetch }) => {
        const res = await fetch("/backend/shop/" + params.id + ".json");
        if (res.status == 200) {

            const product: Product = await res.json();
            product.images.unshift(product.coverimage);
            product.description = product.description.replace(/\n/g,'<br>') // fix new lines

            let saveStatus = false;
            
            const meRes = await fetch ("/backend/account/me");
            let me;
            if (meRes.status == 200) {
                me = await meRes.json();
                if (me.saved == null) {
                    me.saved = [];
                    saveStatus = false;
                } else {
                    saveStatus = me.saved.includes(product.id);
                }
            } else {
                me = {
                    saved: []
                };
                saveStatus = false;
            }    

            return {
                props: {
                    product,
                    saveStatus,
                    me
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
    import { generatePropertyName } from "$lib/browserfuncs";

    import type { Product, UserInfo } from "$lib/types";
    import * as bToast from "bulma-toast";
    import { onMount } from "svelte";

    export let product: Product;
    export let me: UserInfo;

    export let propertyName: string = "loaing";

    let saveButtonLoading = false;
    export let saveStatus: boolean;

    let showGallery: boolean = false;
    let currentGalleryIndex: number = 0; 

    onMount(() => {
        propertyName = generatePropertyName(product);
    })

    function back() {
        history.back();
    }

    function onBasketClick() {
  
    }

    async function onSaveClick() {
        saveButtonLoading = true;
        const req = await fetch('/backend/shop/save', {
            method: 'POST',
            body: JSON.stringify({
                'id': product.id
            })
        });

        if (req.status == 200) {
            let json = await req.json()

            bToast.toast({
                message: json.message,
                type: 'is-success',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });

            me.saved = json.saved;
            saveStatus = me.saved.includes(product.id);
        } else if (req.status == 400) {
            bToast.toast({
                message: `Save error: unknown, contact website administrator and try again later.`,
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });
        } else if (req.status == 401) {
            bToast.toast({
                message: `You must login to do this!`,
                type: 'is-danger',
                dismissible: true,
                animate: { in: 'fadeInDown', out: 'fadeOutRight' },
                duration: 5000
            });
        }

        saveButtonLoading = false;
    }
</script>

<svelte:head>
	<title>{propertyName} | Surya Real Estate</title>
</svelte:head>

<!-- Gallery -->
<div class="modal {showGallery ? "is-active" : ""}">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="level">
            <i class="fa-solid fa-chevron-left level-item" aria-disabled={currentGalleryIndex == 0} on:click={() => { currentGalleryIndex--; }}/>
            <figure class="image level-item">
                <img src={product.images[currentGalleryIndex]} alt={product.address}/>
            </figure>
            <i class="fa-solid fa-chevron-right level-item" aria-disabled={currentGalleryIndex == product.images.length-1} on:click={() => { currentGalleryIndex++; }}/>
        </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={() => { showGallery = false; }}/>
  </div>

<!-- Main Page -->
<container class="container box hwe-layout">
    <section class="has-text-centered">
        <figure class="image" on:click={() => { showGallery = true; }}>
            <img src={product.coverimage} alt={product.address}/>
        </figure>
        <br>
        <h1><strong>{propertyName}</strong></h1>
        {product.address}<br><br>

        <i class="fas fa-tag"/> £{product.price.toLocaleString('en-GB')} {product.rent ? "/month" : ""}

        <div class="divider">At a Glance</div>
        <i class="fas fa-bed"/> Bedrooms: {product.bedrooms}<br>
        <i class="fas fa-bath"/> Bathrooms: {product.bathrooms}<br>
        <i class="fas fa-couch"/> Receptions: {product.receptions}<br>
        <i class="fab fa-pagelines"/> Garden: {product.garden ? "Yes" : "No"}
        {#if product.type != 0}
            <br><i class="fa-solid fa-cat"/> Pets: {product.pets ? "Yes" : "No"}
        {/if}

        <div class="divider">Description</div>
        <!-- we love a bit of XSS -->
        <p class="content">{@html product.description}</p>
        
        {#if product.type != 0}
            <br>
            <div class="divider">Pet Info</div>
            <p>{product.pets ? product.pets_info : "Pets are not allowed at this property."}</p>
        {/if}
    </section>

    <section class="section">
        <div class="buttons is-centered">
            <button class="button is-primary" on:click={onBasketClick} disabled={product.sold}>Enquire</button>
            {#if saveStatus}
                <button class="button is-danger {saveButtonLoading ? "is-loading" : ""}" on:click={onSaveClick}>Unsave</button>
            {:else}    
            <button class="button is-link {saveButtonLoading ? "is-loading" : ""}" on:click={onSaveClick}>Save for later</button>
            {/if}
        </div>
    </section>
</container>

<style>
    .image {
        max-height: 256px;
    }

    .image > img {
        height: initial;
        max-height: inherit;
        width: auto;
        margin: 0 auto;
    }
</style>