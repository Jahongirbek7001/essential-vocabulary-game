"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Content from '@/app/component/Content';
import script from '@/app/typescript/script';
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useRef } from "react";

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
    const audioRefsUsa = useRef<(HTMLAudioElement | null)[]>([]);
    const audioRefsUk = useRef<(HTMLAudioElement | null)[]>([]);

    const handlePlay = (index: number) => {
        if (audioRefsUsa.current[index]) {
            audioRefsUsa.current[index]?.play();
        }
    };

    const handlePlayUk = (index: number) => {
        if (audioRefsUk.current[index]) {
            audioRefsUk.current[index]?.play();
        }
    };
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
                    <Button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = `/essential-${bookId}/image/unit-${unitId}.png`;
                            link.download = `unit-${unitId}.png`;
                            link.click();
                        }}
                        className=""
                    >
                        Download Unit
                    </Button>
                </div>
                <div>
                    <p className=" text-center font-semibold text-2xl my-5">{data[unitId - 1].unit_name}</p>
                    {
                        <table className=" w-full xl:w-[50%] text-xs xl:text-xl mx-auto bg-white border">
                            <thead>
                                <tr>
                                    <th className=" bg-secondaryColor">№</th>
                                    <th className="px-4 py-6 xl:py-2 border bg-secondaryColor">English Word</th>
                                    <th className="px-4 py-6 xl:py-2 border bg-secondaryColor">Uzbek Word</th>
                                    <th className="px-1 w-[50px] md:w-[80px] py-6 xl:py-2 border bg-secondaryColor">
                                        <img
                                            src="https://img.icons8.com/color/48/usa.png"
                                            alt="usa"
                                            className=" w-[17px] h-[17px] md:w-[25px] md:h-[25px] xl:w-[30px] xl:h-[30px] mx-auto"
                                        />
                                    </th>
                                    <th className="px-1 w-[50px] md:w-[80px] py-6 xl:py-2 border bg-secondaryColor">
                                        <img
                                            src="https://img.icons8.com/color/48/great-britain.png"
                                            alt="great-britain"
                                            className=" w-[17px] h-[17px] md:w-[25px] md:h-[25px] xl:w-[30px] xl:h-[30px] mx-auto"
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data[unitId - 1].options.map((option, index) => (
                                    <tr key={index} className={index % 2 == 1 ? "text-left border bg-secondaryColor" : "text-left border"}>
                                        <td className="px-4 h-[100px] xl:h-[70px] text-xs xl:text-lg text-center">{index + 1}</td>
                                        <td className="px-6 h-[100px] xl:h-[70px] text-xs xl:text-lg border">{option.word_eng.toUpperCase()}</td>
                                        <td className="px-6 h-[100px] xl:h-[70px] text-xs xl:text-lg border">{option.word_uzb}</td>
                                        <td className="px-1 h-[100px] xl:h-[70px] text-xs xl:text-lg border">
                                            <audio ref={(el) => { audioRefsUsa.current[index] = el }} src={`${process.env.NEXT_PUBLIC_BASE_URL}/essential-${bookId}/audio/usa/${option.word_eng}.mp3`} id={`audioUsa-${index}`} />
                                            <img
                                                src="/gif/voice.gif"
                                                alt="Cool Animation"
                                                className=" cursor-pointer w-[17px] md:w-[25px] md:h-[25px] h-[17px] xl:w-[30px] xl:h-[30px] mx-auto"
                                                onClick={() => handlePlay(index)}
                                                title="Play Sound"
                                            />
                                        </td>
                                        <td className="px-1 h-[100px] xl:h-[70px] text-xs xl:text-lg border">
                                            <audio ref={(el) => { audioRefsUk.current[index] = el }} src={`${process.env.NEXT_PUBLIC_BASE_URL}/essential-${bookId}/audio/uk/${option.word_eng}.mp3`} id={`audioUk-${index}`} />
                                            <img
                                                src="/gif/voice.gif"
                                                alt="Cool Animation"
                                                className=" cursor-pointer w-[17px] md:w-[25px] md:h-[25px] h-[17px] xl:w-[30px] xl:h-[30px] mx-auto"
                                                onClick={() => handlePlayUk(index)}
                                                title="Play Sound"
                                            />
                                        </td>
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