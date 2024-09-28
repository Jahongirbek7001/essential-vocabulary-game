"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import irregularScript from '@/app/typescript/irregularScript'

type Irregular = {
    id: number;
    verb1: string;
    verb2: string;
    verb3: string;
    verbUzb: string
};

interface Params {
    id: number
}

interface Essential1Props {
    params: Params;
}

const Verbs = ({ params }: Essential1Props) => {
    const id: number = params.id;

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


    useEffect(() => {
        if (data) {
            irregularScript(data, id);
        }
    }, [data]);
    return (
        <>
            <Card className=" absolute w-[90%] max-w-[40em] bg-gradient-to-br from-[#DDE4FF] to-[#8DA2EE] p-[5em_1em] sm:p-[5em_2em] transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-center rounded-3xl">
                <div className=" mb-4 text-black" id="hint-ref"></div>
                <div className=" mb-4 text-black" id="wordVerbOne"></div>
                <div id="user-input-section"></div>
                <div id="message" className=" text-[#FE6873]"></div>
                <div id="letter-container" className="mt-8 space-y-2">
                </div>

                <div className=" text-center text-xl font-semibold translate-y-12">
                    The idea was taken from the Youtube channel <br />{" "}
                    <span>Coding Artist</span>
                </div>
            </Card>

            <div
                className=" bg-white absolute w-full h-full flex items-center justify-center flex-col gap-5 top-0 z-10"
                id="controls-container"
            >
                <div id="result" className=" text-[#282828]"></div> 
                <div id="word" className=" text-primaryColor font-semibold my-4"></div>

                <div className="box flex justify-center">
                    <Button
                        id="start"
                        className=" hover:bg-primaryColor h-full text-[1.2em] py-6 px-12 bg-primaryColor text-white border-none outline-none rounded-[2em] cursor-pointer"
                    >
                        Start
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Verbs