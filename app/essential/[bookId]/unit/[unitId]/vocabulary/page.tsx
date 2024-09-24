"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Content from '@/app/component/Content';
import script from '@/app/typescript/script';
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

interface VocabProps {
    params: {
        bookId: number;
        unitId: number;
    };
}

const Vocabulary = ({ params }: VocabProps) => {
    const [data, setData] = useState<Unit[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { bookId, unitId } = params;

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/essential${bookId}.json`)
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
            <main className=" text-lg xl:text-xl grid grid-cols-1 mx-auto p-5 xl:p-10 gap-3">
                <div>
                    <p className=" text-center font-semibold text-2xl my-5">{data[unitId - 1].unit_name}</p>
                    {
                        <table className=" w-full xl:w-[50%] text-base xl:text-xl mx-auto bg-white border">
                            <thead>
                                <tr>
                                    <th className=" bg-secondaryColor">№</th>
                                    <th className="px-4 py-6 xl:py-2 border bg-secondaryColor">English Word</th>
                                    <th className="px-4 py-6 xl:py-2 border bg-secondaryColor">Uzbek Word</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data[unitId - 1].options.map((option, index) => (
                                    <tr key={index} className={index % 2 == 1 ? "text-left border bg-secondaryColor" : "text-left border"}>
                                        <td className="px-4 h-[100px] xl:h-[70px] text-base xl:text-lg text-center">{index + 1}</td>
                                        <td className="px-6 h-[100px] xl:h-[70px] text-base xl:text-lg border">{option.word_eng.toUpperCase()}</td>
                                        <td className="px-6 h-[100px] xl:h-[70px] text-base xl:text-lg border">{option.word_uzb}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    }
                    <div className=" flex justify-center items-center mt-5 gap-5">
                        <Button
                            className={
                                Number(unitId) === 1 && Number(bookId) === 1
                                    ? "hidden"
                                    : "w-[150px] border-2 p-3 rounded-lg shadow-lg"
                            }
                        >
                            <Link href={
                                Number(bookId) === 1
                                    ? `/essential/${Number(bookId)}/unit/${Number(unitId) - 1}/vocabulary`
                                    : `/essential/${Number(bookId) - 1}/unit/30/vocabulary`
                            }

                            >
                                <span>PREVIOUS UNIT</span>
                            </Link>
                        </Button>
                        <Button className="w-[150px] border-2 p-3 rounded-lg shadow-lg">
                            <Link href={`/essential/${Number(bookId)}/unit/${Number(unitId)}`}>
                                <span>MAIN UNIT</span>
                            </Link>
                        </Button>
                        <Button
                            className={
                                Number(unitId) === 30 && Number(bookId) === 6
                                    ? "hidden"
                                    : "w-[150px] border-2 p-3 rounded-lg shadow-lg"
                            }
                        >
                            <Link href={
                                Number(unitId) === 30
                                    ? `/essential/${Number(bookId) + 1}/unit/1/vocabulary`
                                    : `/essential/${Number(bookId)}/unit/${Number(unitId) + 1}/vocabulary`
                            }>
                                <span>NEXT UNIT</span>
                            </Link>
                        </Button>
                    </div>


                </div>
            </main>

        </>
    )
}

export default Vocabulary