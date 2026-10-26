import FilterBtn from "./FilterBtn"
import { FullSubjectDto } from "@/shared/types"

type Props = {
    search: string;
    onSearch: (value: string) => void;
    subjectId: number | null;
    setSubjectId: (value: number | null) => void;
    subjects: FullSubjectDto[];
}

export default function Sidebar({ search, onSearch, subjectId, setSubjectId, subjects }: Props) {
    return (
        <aside>
            <div className="flex flex-col gap-4">
                <input
                    type="text" placeholder="Pretraga spilova"
                    className="rounded p-3 border border-gray-200"
                    value={search}
                    onChange={(e) => onSearch(e.target.value)} />
                <div className="flex flex-wrap gap-2 md:flex-col">
                    <FilterBtn sid={null} setSubjectId={setSubjectId}>Svi predmeti</FilterBtn>
                    {subjects.map((subject) =>
                        <FilterBtn key={subject.id} sid={subject.id} setSubjectId={setSubjectId}>{subject.name}</FilterBtn>
                    )}
                </div>
            </div>

        </aside>
    )
}