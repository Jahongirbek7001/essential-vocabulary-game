"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Params {
    bookId: number;
    unitId: number;
}

interface Essential1Props {
    params: Params;
}

export default function Essential1({ params }: Essential1Props) {
    const { bookId, unitId } = params;

    return (
        <>
            <main className=" text-lg xl:text-xl flex justify-center items-center flex-col xl:flex-row  mx-auto p-5 xl:p-14 gap-10">
                <Button className="h-full w-[200px] border-2 p-3 rounded-lg shadow-lg hover:w-[203px]">
                    <Link href={`/essential/${bookId}/unit/${unitId}/vocabulary`}>
                        <img src="/gif/dictionary.gif" className=" w-full" alt="sx" />
                        <span>VOCABULARY</span>
                    </Link>
                </Button>
                <Button className="h-full w-[200px] border-2 p-3 rounded-lg shadow-lg hover:w-[203px]">
                    <Link href={`/essential/${bookId}/unit/${unitId}/quiz`}>
                        <img src="/gif/brain.gif" className=" w-full" alt="sx" />
                        <span>QUIZ</span>
                    </Link>
                </Button>
                <Button className="h-full w-[200px] border-2 p-3 rounded-lg shadow-lg hover:w-[203px]">
                    <Link href={`/essential/${bookId}/unit/${unitId}/vocabulary`}>
                        <img src="/gif/book.gif" className=" w-full" alt="sx" />
                        <span>SENTENCE</span>
                    </Link>
                </Button>
            </main>

        </>
    );
}
