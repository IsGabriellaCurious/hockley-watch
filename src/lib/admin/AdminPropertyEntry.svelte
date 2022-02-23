<script lang="ts">
    import { generatePropertyName, getPropertyType } from "$lib/browserfuncs";
    import type { Product } from "$lib/types";

    export let product: Product;
    export let shouldHighlight: number;

    function yesno(b: boolean): string {
        return b ? "✔" : "✖"; // https://www.i2symbol.com/symbols/check
    }
</script>

<tr class="{shouldHighlight != null && shouldHighlight == product.id ? "is-selected is-light" : ""}">
    <th>{product.id}</th>
    <td>{product.address}</td>
    <td>{getPropertyType(product.type)}</td>
    <td>{yesno(product.rent)}</td>
    <td>£{product.price} {product.rent ? "/month" : ""}</td>
    <td>{product.listed}</td>
    <td>{yesno(product.sold)}</td>
    <td>{yesno(product.newlyBuilt)}</td>
    <td>{product.bedrooms}</td>
    <td>{product.bathrooms}</td>
    <td>{product.receptions}</td>
    <td>{yesno(product.garden)}</td>
    <td>{yesno(product.pets)}</td>
    <td><button class="button is-warning is-light" on:click={() => { window.location.href = "/admin/property/" + product.id}}>Edit</button></td>
</tr>