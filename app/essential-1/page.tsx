"use client"

import Link from "next/link";
import { useEffect, useState } from 'react';
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

const EssentialFirst = () => {
    const [data, setData] = useState<Unit[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('https://word-game-data.vercel.app/essential1.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData: Unit[]) => setData(jsonData))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <>
            <main className="text-white text-xl xl:text-2xl grid grid-cols-1 md:grid-cols-5 mx-auto p-24 gap-3">
                {
                    data.map((element) => (
                        <Link className=" border-2 p-2 flex justify-center rounded-lg shadow-lg" key={element.unit_id} href={`/essential-${element.book_id}/unit/${element.unit_id}`}>
                            <div className=" ">Unit - {element.unit_id}</div>
                        </Link>
                    ))
                }
            </main>
        </>
    )
}
export default EssentialFirst;