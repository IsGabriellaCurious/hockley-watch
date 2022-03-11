<script lang="ts">
    import type { Product } from "$lib/types";

    export let product: Product;

    product.images.unshift(product.coverimage);
</script>

{#each product.images as image}
    <tr>
        <th>Property {product.id}</th>
        <td><img src={image} alt=""/></td>
        <!--<td>TBC</td>-->
        <td>{image}</td>
    </tr>
{/each}