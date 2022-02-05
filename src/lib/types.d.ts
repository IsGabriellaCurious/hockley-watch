import type { StringifyOptions } from "querystring";

/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export interface BasicProduct {
	id: number;
}

export interface Product extends BasicProduct {
	name: string,
	address: string,
	description: string,
	coverimage: string,
	_images: string,
	images: string[],
	price: number,
	clicks: boolean,
	sold: boolean
}

export interface ProductList {
	list: Array<Product>;
}
