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

export function verifyAuthToken(token: string): JwtUserClaims {
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & JwtUserClaims; // vraca string pa ga kastujemo, mora da odgovara oba tipa, I ovom Payload generickom I nasem custom JwtUserClaims

    //ako je validan, ne znaci da ima sva polja
    if (!payload || !payload.sub || !payload.email) throw new Error("Invalid token");
    return {
        sub: payload.sub,
        email: payload.email,
        name: payload.name
    }
}
