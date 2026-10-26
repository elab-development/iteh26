import Image from "next/image"
import { FullDeckDto } from "@/shared/types"

type Props = {
    deck: FullDeckDto;
}

export default function Card({ deck }: Props) {

    return (
        <div key={deck.id} className="rounded-lg border overflow-hidden">
            <Image src={"https://picsum.photos/400/300"} alt="Slika" width={400} height={300} className="w-full" />
            <div className="p-4">
                <h3>{deck.name}</h3>
                <p>{deck.subject.name}</p>
            </div>
        </div>
    )
}