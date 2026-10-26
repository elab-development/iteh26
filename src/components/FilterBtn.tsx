import React from "react";

export default function FilterBtn({
    children,
    sid,
    setSubjectId
}: {
    children: React.ReactNode;
    sid: number | null;
    setSubjectId: (value: number | null) => void
}) {
    return (
        <button className="rounded border p-3 transition" onClick={() => setSubjectId(sid)}>
            {children}
        </button>
    )
}