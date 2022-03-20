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
            <i class="fa-solid fa-chevron-left fa-fw level-item plshover" style="color:white;" aria-disabled={currentGalleryIndex == 0} on:click={() => { currentGalleryIndex--; }}/>
            <figure class="image level-item">
                <img src={product.images[currentGalleryIndex]} alt={product.address}/>
            </figure>
            <i class="fa-solid fa-chevron-right fa-fw level-item plshover" style="color:white;" aria-disabled={currentGalleryIndex == product.images.length-1} on:click={() => { currentGalleryIndex++; }}/>
        </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={() => { showGallery = false; }}/>
  </div>

<!-- Main Page -->
<container class="container box hwe-layout">
    <section class="column has-text-centered">
            <figure class="image" on:click={() => { showGallery = true; }}>
                <img class="plshover" src={product.coverimage} alt={product.address}/>
            </figure>
            <p style="font-style: italic; font-size: 13px;">Click the above to launch the gallery!</p>

            <h1 class="title"><strong>{propertyName}</strong></h1>
            <h2 class="subtitle">{product.address}</h2>

            <h2 class="subtitle"><i class="fas fa-tag"/> £{product.price.toLocaleString('en-GB')} {product.rent ? "/month" : ""}</h2>
    </section>
    
    <section class="section" style="padding-top: 0;">
        <div class="columns">
            <div class="column is-one-quarter">
                <div class="divider">At a Glance</div>
                <div style="padding: 1em;">
                    <i class="fas fa-bed fa-fw"/> Bedrooms: {product.bedrooms}<br>
                    <i class="fas fa-bath fa-fw"/> Bathrooms: {product.bathrooms}<br>
                    <i class="fas fa-couch fa-fw"/> Receptions: {product.receptions}<br>
                    <i class="fab fa-pagelines fa-fw"/> Garden: {product.garden ? "Yes" : "No"}
                    {#if product.rent}
                        <br><i class="fa-solid fa-cat fa-fw"/> Pets: {product.pets ? "Yes" : "No"}
                    {/if}
                </div>
            </div>

            <div class="column">
                <div class="divider">Description</div>
                <!-- we love a bit of XSS -->
                <p class="content">{@html product.description}</p>
            </div>
        </div>
    </section>
        

    {#if product.rent}
        <section class="section has-text-centered" style="padding-top: 0;">
            <div class="divider">Pet Info</div>
            <p>{product.pets ? product.pets_info : "Pets are not allowed at this property."}</p>
        </section>
    {/if}

    <section class="section">
        <div class="buttons is-centered">
            <button class="button is-primary" on:click={onBasketClick} disabled={product.sold}><i class="fa-solid fa-message"></i>&nbsp;Enquire</button>
            {#if saveStatus}
                <button class="button is-danger {saveButtonLoading ? "is-loading" : ""}" on:click={onSaveClick}><i class="fa-solid fa-star fa-fw" />&nbsp;Unsave</button>
            {:else}    
            <button class="button is-link {saveButtonLoading ? "is-loading" : ""}" on:click={onSaveClick}><i class="fa-regular fa-star fa-fw" />&nbsp;Save</button>
            {/if}
        </div>
        <p class="has-text-centered">Have a question? Contact our team <a style="font-style:italic;" href="/contact?subj=Question regarding {product.address} ({product.id}):">here</a>.</p>
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

    .plshover:hover {
        cursor: pointer;
    }
</style>