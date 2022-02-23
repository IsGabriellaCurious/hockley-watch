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
	newlyBuilt: boolean,
	address: string,
	description: string,
	listed: Date,
	coverimage: string,
	images: Array<string>,
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

export interface BasicResult {
	success: boolean,
	message: string
}

export interface LoginResult {
    id: number,
	admin: boolean,
    password: string,
}

export interface AuthResult {
	result: string,
	id: number,
	admin: boolean,
}

export interface UserInfo {
	id: number,
	admin: boolean,
	email: string,
	title: string,
	firstname: string,
	lastname: string,
	saved: Array<number>
}
