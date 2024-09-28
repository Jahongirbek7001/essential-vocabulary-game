"use client";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const IrregularVerbs = () => {

    return (
        <>
            <main className=" text-lg xl:text-xl flex justify-center items-center flex-col xl:flex-row mx-auto p-24 gap-3">
                <Button className="h-full w-[200px] border-2 p-3 rounded-lg shadow-lg hover:w-[203px]">
                    <Link href={`/irregular-verbs/vocabulary`}>
                        <img src="/gif/dictionary.gif" className=" w-full" alt="sx" />
                        <span>VOCABULARY</span>
                    </Link>
                </Button>
                <Button className="h-full w-[200px] border-2 p-3 rounded-lg shadow-lg hover:w-[203px]">
                    <Link href={`/irregular-verbs/quiz`}>
                        <img src="/gif/brain.gif" className=" w-full" alt="sx" />
                        <span>QUIZ</span>
                    </Link>
                </Button>
            </main>
        </>
    )
}

export default IrregularVerbs