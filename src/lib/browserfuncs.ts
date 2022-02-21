import type { Product } from "./types";

export function getPropertyType(type: number): string {
    switch (type) {
        case 0:
            return "house";
        case 1:
            return "flat";
        case 2:
            return "bungalo";
        default:
            return "property";
    }
}

export function generatePropertyName(product: Product, showNew: boolean = true) {
    let propertyType = getPropertyType(product.type);
    return (product.newlyBuilt && showNew ? "NEW " : "") + product.bedrooms + " bedroom " + propertyType + " for " + (product.rent ? "rent" : "sale");
}