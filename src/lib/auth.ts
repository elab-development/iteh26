import * as jwt from "jsonwebtoken"

export const AUTH_COOKIE = "auth";
const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in env")
}

//definisemo izgled tokena
export type JwtUserClaims = {
    sub: string; //subject, najcesce id
    email: string;
    name?: string;
}

export function signAuthToken(claims: JwtUserClaims) {
    return jwt.sign(claims, JWT_SECRET, { algorithm: "HS256", expiresIn: "7d" })
}