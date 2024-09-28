"use client";
import { useEffect, useState } from "react";

type Irregular = {
    id: number;
    verb1: string;
    verb2: string;
    verb3: string;
    verbUzb: string;
};

const IrregularVocabulary = () => {
    const [data, setData] = useState<Irregular[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/irregular-verbs.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData: Irregular[]) => setData(jsonData))
            .catch((err) => setError(err.message));
    }, []);

    console.log(data);

    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <>
            <main className="text-lg xl:text-xl grid grid-cols-1 mx-auto p-5 xl:p-10 gap-3">
                <div className=" w-full">
                    <p className="text-center font-semibold text-2xl my-5">Irregular Verbs</p>
                    <table className=" text-base xl:text-xl mx-auto bg-white border">
                        <thead>
                            <tr>
                                <th className="bg-secondaryColor">№</th>
                                <th className="px-2 py-6 xl:py-2 border bg-secondaryColor" colSpan={2}>Verb</th>
                                <th className="px-2 py-6 xl:py-2 border bg-secondaryColor">Verb Uzbek</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((option, index) => (
                                <tr key={option.id} className={index % 2 === 1 ? "text-left border bg-secondaryColor" : "text-left border"}>
                                    <td className="px-4 h-[100px] xl:h-[70px] text-base xl:text-lg text-center">{index + 1}</td>
                                    <td>
                                        <p className="px-2 h-[100px] xl:h-[70px] text-base xl:text-lg border flex justify-center items-center">V1</p>
                                        <p className="px-2 h-[100px] xl:h-[70px] text-base xl:text-lg border flex justify-center items-center">V2</p>
                                        <p className="px-2 h-[100px] xl:h-[70px] text-base xl:text-lg border flex justify-center items-center">V3</p>
                                    </td>
                                    <td>
                                        <p className="px-1 h-[100px] xl:h-[70px] text-base xl:text-lg border flex justify-center items-center">{option.verb1.toUpperCase()}</p>
                                        <p className="px-1 h-[100px] xl:h-[70px] text-base xl:text-lg border flex justify-center items-center">{option.verb2.toUpperCase()}</p>
                                        <p className="px-1 h-[100px] xl:h-[70px] text-base xl:text-lg border flex justify-center items-center">{option.verb3.toUpperCase()}</p>
                                    </td>
                                    <td className="px-2 h-[100px] xl:h-[70px] text-base xl:text-lg border text-center">{option.verbUzb.toUpperCase()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
};

export default IrregularVocabulary;
