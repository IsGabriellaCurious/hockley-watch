import { createDB } from "$lib/global";
import type { SignupResult } from "$lib/types";
import type { EndpointOutput } from "@sveltejs/kit";

import { scryptSync, randomBytes } from 'crypto';
import type { RowDataPacket } from "mysql2";

export async function post({ request }): Promise<EndpointOutput> {
    let body = await request.json();

    if (!body.email || !body.title || !body.firstname || !body.lastname || !body.password) {
        return {
            body: {
                message: "Signup failed: missing arguments."
            },
            status: 401
        };
    }

    if (await doesEmailExist(body.email)) {
        return {
            body: {
                message: "Signup failed: email in-use."
            },
            status: 401
        };
    }

    const salt = randomBytes(16).toString('hex');
    let hashedPassword = scryptSync(body.password, salt, 64).toString('hex');

    let result: SignupResult = await createUser(body.email, hashedPassword, salt, body.title, body.firstname, body.lastname);

    if (!result.success) {
        return {
            body: {
                message: "" + result.message
            },
            status: 401
        };
    } else {
        return {
            body: {
                message: "Your account has been successfully created. Please sign in to continue."
            },
            status: 200
        };
    }
};

async function doesEmailExist(email: String): Promise<boolean> {
    let conn = await createDB();

    try {
        let result = await conn.query(`SELECT id FROM Users WHERE email=?`, [email]);

        let list: Array<any> = (result as RowDataPacket)[0]
        console.log(list.length);

        if (list.length == 0) {
            return false;
        }    

        return true;
    } catch (e) {
        console.log(e);
        return true;
    }
}

async function createUser(email: String, password: String, salt: String, title: String, firstname: String, lastname: String): Promise<SignupResult> {
    let conn = await createDB();
    let pwSaltCombo = salt + ":" + password;

    try {
        await conn.query(
            `INSERT INTO Users (email, password, title, firstname, lastname) VALUES (?,?,?,?,?)`, 
            [email, pwSaltCombo, title, firstname, lastname]
        );

        return {
            success: true,
            message: "Successfully created your account."
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            message: "Internal error: " + e
        };
    } finally {
        conn.end();
    }
}