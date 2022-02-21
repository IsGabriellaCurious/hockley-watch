import { createDB } from "$lib/global";
import { scryptSync, timingSafeEqual } from "crypto";
import * as jwt from "jsonwebtoken";
import * as cookie from "cookie";
import * as dotenv from "dotenv";
import type { LoginResult } from "$lib/types";
import type { EndpointOutput } from "@sveltejs/kit";
import type { RowDataPacket } from "mysql2";
import { maxTokenAge } from "$lib/sharedfuncs";

export async function post({ request }): Promise<EndpointOutput> {
    let body = await request.json();

    if (!body.email || !body.password) {
        return {
            body: {
                message: "Login failed: missing username or password."
            },
            status: 401
        };
    }

    let dbPwId = await getDbPasswordAndId(body.email);

    if (dbPwId == null) {
        console.log("user doesnt exist")
        return {
            body: {
                message: "Login failed: invalid username or password."
            },
            status: 401
        }
    }

    const [dbSalt, dbKey] = dbPwId.password.split(':'); // Get the salt and hashed pw from the db
    const hashedBuffer = scryptSync(body.password, dbSalt, 64); // Generate the expected hash from the input password + db hash

    // Setup the buffer and check the match
    const keyBuffer = Buffer.from(dbKey, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) {

        let token = await createToken(dbPwId.id);

        const headers = {
            'Set-Cookie': cookie.serialize("auth", token, {
                httpOnly: true,
                maxAge: maxTokenAge,
                sameSite: 'strict',
                path: '/'
            })
        };

        return {
            headers,
            body: {
                message: "Login success."
            },
            status: 200
        }
    } else {
        console.log("invalid password")
        return {
            body: {
                message: "Login failed: invalid username or password."
            },
            status: 401
        }
    }
};

async function getDbPasswordAndId(email: String): Promise<LoginResult> {
    let conn = await createDB();

    try {
        let result = await conn.query(`SELECT id, password FROM Users WHERE email=?`, [email]);

        let list: Array<any> = (result as RowDataPacket)[0]

        if (list.length == 0) {
            return null;
        }    

        return {
            id: list[0].id,
            password: list[0].password
        };
    } catch (e) {
        console.log(e);
        return null;
    } finally {
        conn.end();
    }
}

async function createToken(id: number) {
    return jwt.sign({ id: id}, process.env.TOKEN_SECRET, {
        expiresIn: maxTokenAge
    });
}