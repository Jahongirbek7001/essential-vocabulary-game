"use client"

import Link from "next/link";
import data from "./data";

const EssentialFirst = () => {

    return (
        <>
            <main className="text-white text-xl xl:text-2xl grid grid-cols-2 md:grid-cols-5 mx-auto p-24 gap-5">
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