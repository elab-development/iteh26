import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { AUTH_COOKIE, signAuthToken } from "@/lib/auth"
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

type Body = {
    name: string;
    email: string;
    password: string;
}

export async function POST(req: Request) {
    //pokupi podatke iz zahteva
    const { name, email, password } = await req.json() as Body

    //validiraj podatke
    if (!name || !email || !password) {
        return NextResponse.json({ error: "Nedostaju podaci" }, { status: 401 })
    }

    //pronadji usera po mailu
    const exists = await db.select().from(usersTable).where(eq(usersTable.email, email))
    if (exists.length) {
        return NextResponse.json({ error: "Email postoji u bazi" }, { status: 401 })
    }

    //hesiraj lozniku
    const passHash = await bcrypt.hash(password, 10)

    //unesi korisnika u bazu
    const [u] = await db.insert(usersTable).values({ name, email, passHash }).returning({ id: usersTable.id, name: usersTable.name, email: usersTable.email })

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