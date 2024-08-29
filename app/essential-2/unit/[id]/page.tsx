"use client";
import Content from "@/componenets/Content";
import scriptType from "@/typescript/scriptType";
import { useEffect, useState } from "react";

type Option = {
    word_eng: string;
    word_uzb: string;
};

type Unit = {
    book_id: number;
    book_name: string;
    unit_id: number;
    unit_name: string;
    options: Option[];
};

interface Params {
    id: number;
}

interface Essential1Props {
    params: Params;
}

export default function Essential1({ params }: Essential1Props) {
    const [data, setData] = useState<Unit[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://word-game-data.vercel.app/essential2.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData: Unit[]) => setData(jsonData))
            .catch((err) => setError(err.message));
    }, []);

    // Hooklarni shartli ravishda emas, tartib bilan chaqirish
    useEffect(() => {
        if (data) {
            const id = Number(params.id);
            const selectedUnit = data.find(unit => unit.unit_id === id);
            if (selectedUnit) {
                scriptType(selectedUnit.options, selectedUnit.unit_name, selectedUnit.unit_id);
            }
        }
    }, [data, params.id]);

    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <>
            <Content />
        </>
    );
}
