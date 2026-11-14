import { db } from "./index"
import { usersTable } from "./schema"
import bcrypt from "bcrypt"

async function seed() {
    try {
        const hash = await bcrypt.hash("112266", 10)

        await db.transaction(async (tx) => {
            await tx.insert(usersTable).values([
                {
                    name: "Nikola Tesla",
                    email: "ntesla@gmail.com",
                    passHash: hash
                },
                {
                    name: "Ivo Andric",
                    email: "iandric@gmail.com",
                    passHash: hash
                },
                {
                    name: "Petar Petrovic",
                    email: "ppetrovic@gmail.com",
                    passHash: hash
                }
            ]).onConflictDoNothing()
        })
    } catch (error) {
        console.error("Error seeding database ", error)
        process.exitCode = 1
    } finally {
        db.$client.end()
    }
}

seed()

