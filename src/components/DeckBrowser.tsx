"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { mockDecks, mockSubjects } from "@/mock/data"
import { FullDeckDto } from "@/shared/types"
import Card from "./Card"
import Sidebar from "./Sidebar"

export default function DeckBrowser() {
    const [decks, setDecks] = useState<FullDeckDto[]>(mockDecks);
    const [search, setSearch] = useState<string>("");
    const [subjectId, setSubjectId] = useState<number | null>(null);

    useEffect(() => {
        //console.log(search)
        console.log(subjectId)
        let data = mockDecks;
        if (subjectId !== null) {
            data = data.filter((d) => d.subject.id === subjectId)
        }

        if (search.trim()) {
            data = data.filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
        }
        setDecks(data)
    }, [search, subjectId])

    return (
        <div className="mx-auto max-w-7xl p-4">
            <div className="flex flex-col gap-8 md:flex-row">
                {/* <p>Obo je komponenta DeckBrowser</p> */}
                <Sidebar search={search} onSearch={setSearch} subjectId={subjectId} setSubjectId={setSubjectId} subjects={mockSubjects} />

                <section className="flex-1">
                    {/* sve kartice */}
                    {decks.length === 0 ? <p>Nema takvih spilova</p> :
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {/* Jedna kartica */}
                            {decks.map((deck, idx) => (
                                <Card deck={deck} key={deck.id} />
                            ))}
                        </div>
                    }
                </section>
            </div>
        </div>
    )
}