"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const IrregularQuiz = () => {

    return (
        <>
            <main className=" text-lg xl:text-xl flex justify-center items-center flex-col xl:flex-row mx-auto p-24 gap-3">
                <Button className=" h-full w-[120px] border-2 p-3 flex justify-center rounded-lg shadow-lg hover:bg-customPink hover:text-white hover:border-customPink">
                    <Link href={`/irregular-verbs/quiz/verb/1`}>
                        <div>Verb Two</div>
                    </Link>
                </Button>
                <Button className=" h-full w-[120px] border-2 p-3 flex justify-center rounded-lg shadow-lg hover:bg-customPink hover:text-white hover:border-customPink">
                    <Link href={`/irregular-verbs/quiz/verb/2`}>
                        <div>Verb Three</div>
                    </Link>
                </Button>
            </main>
        </>
    )
}

export default IrregularQuiz