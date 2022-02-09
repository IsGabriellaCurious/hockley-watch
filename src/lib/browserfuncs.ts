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
    return "property";
}

export function generatePropertyName(product: Product) {
    let propertyType = getPropertyType(product.type);
    return (product.new ? "NEW " : "") + product.bedrooms + " bedroom " + propertyType + " for " + (product.rent ? "rent" : "sale");
}