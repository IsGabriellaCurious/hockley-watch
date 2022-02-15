import type { StringifyOptions } from "querystring";

/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export interface Product extends BasicProduct {
	id: number,
	type: number, // 0 - house, 1 - flat, 2 - bungalo
	rent: boolean,
	new: boolean,
	name: string,
	address: string,
	description: string,
	coverimage: string,
	_images: string,
	images: string[],
	price: number,
	bedrooms: number,
	bathrooms: number,
	receptions: number,
	garden: boolean,
	pets: boolean,
	pets_info: string,
	clicks: number,
	sold: boolean
}

export interface ProductList {
	list: Array<Product>;
}
