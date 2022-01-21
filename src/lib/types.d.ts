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
	brand: string,
	description: string,
	coverimg: string,
	price: number,
	reduced: boolean,
	reduced_price: number;
}
