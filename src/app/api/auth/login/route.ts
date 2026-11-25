import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { AUTH_COOKIE, signAuthToken } from "@/lib/auth"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

type Body = {
    email: string;
    password: string;
}

export async function POST(req: Request) {
    //pokupi podatke iz zahteva
    const { email, password } = await req.json() as Body

    //validiraj podatke
    if (!email || !password) {
        return NextResponse.json({ error: "Pogresan email ili lozinka" }, { status: 401 })
    }

    //pronadji usera po mailu
    const [u] = await db.select().from(usersTable).where(eq(usersTable.email, email))
    if (!u) {
        return NextResponse.json({ error: "Pogresan email ili lozinka" }, { status: 401 })
    }

    //proveri da li je dobra lozinka
    const ok = await bcrypt.compare(password, u.passHash)
    if (!ok) {
        return NextResponse.json({ error: "Pogresan email ili lozinka" }, { status: 401 })
    }

    //potpisi JWT
    const token = signAuthToken({ sub: u.id, email: u.email, name: u.name })
    const res = NextResponse.json({ id: u.id, email: u.email, name: u.name })

    //unesi ga u cookie
    res.cookies.set(AUTH_COOKIE, token, cookieOpts())

    //vrati odgovor
    return res;
}

export function cookieOpts() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
    }
}