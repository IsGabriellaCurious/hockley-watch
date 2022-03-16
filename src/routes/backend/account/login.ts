import { createDB } from "$lib/global";
import { scryptSync, timingSafeEqual } from "crypto";
import jsonwebtoken  from 'jsonwebtoken';
import * as cookie from "cookie";
import * as dotenv from "dotenv";
import type { LoginResult } from "$lib/types";
import type { RowDataPacket } from "mysql2";
import { maxTokenAge } from "$lib/sharedfuncs";

export async function post({ request }) {
    let body = await request.json();

    if (!body.email || !body.password) {
        return {
            body: {
                message: "Login failed: missing username or password."
            },
            status: 401
        };
    }

    let dbInfo = await getDbInfo(body.email);

    if (dbInfo == null) {
        console.log("user doesnt exist")
        return {
            body: {
                message: "Login failed: invalid username or password."
            },
            status: 401
        }
    }

    const [dbSalt, dbKey] = dbInfo.password.split(':'); // Get the salt and hashed pw from the db
    const hashedBuffer = scryptSync(body.password, dbSalt, 64); // Generate the expected hash from the input password + db hash

    // Setup the buffer and check the match
    const keyBuffer = Buffer.from(dbKey, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) {

        let token = await createToken(dbInfo.id, dbInfo.admin);

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

async function getDbInfo(email: String): Promise<LoginResult> {
    let conn = await createDB();

    try {
        let result = await conn.query(`SELECT id, admin, password FROM Users WHERE email=?`, [email]);

        let list: Array<any> = (result as RowDataPacket)[0]

        if (list.length == 0) {
            return null;
        }    

        return {
            id: list[0].id,
            admin: list[0].admin,
            password: list[0].password
        };
    } catch (e) {
        console.log(e);
        return null;
    } finally {
        conn.end();
    }
}

async function createToken(id: number, admin: boolean) {
    return jsonwebtoken.sign({ id: id, admin: admin }, process.env.TOKEN_SECRET, {
        expiresIn: maxTokenAge
    });
}