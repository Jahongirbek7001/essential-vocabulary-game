"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react"

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
    bookId: number;
}

interface Essential1Props {
    params: Params;
}

const EssentialParams = ({ params }: Essential1Props) => {
    const id = Number(params.bookId);

    const [data, setData] = useState<Unit[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/essential${id}.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData: Unit[]) => setData(jsonData))
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) return <div>Error: {error}</div>;
    if (!data) {
        return (
            <main className="flex justify-center items-center  h-[1200px] xl:h-[650px]">
                <Loader2 className="mr-2 h-20 w-20 animate-spin  text-customPink" />
            </main>
        );
    }
    return (
        <>
            <main className=" text-lg xl:text-xl grid grid-cols-1 md:grid-cols-5 mx-auto p-24 gap-3">
                {
                    data.map((element) => (
                        <Link className=" border-2 p-2 flex justify-center rounded-lg shadow-lg hover:bg-customPink hover:text-white" key={element.unit_id} href={`/essential/${element.book_id}/unit/${element.unit_id}`}>
                            <div>Unit - {element.unit_id}</div>
                        </Link>
                    ))
                }
            </main>
        </>
    );
};

export default EssentialParams;
