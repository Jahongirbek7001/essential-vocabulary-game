"use client"
import Content from "@/componenets/Content";
import scriptType from "@/typescript/scriptType";
import { useEffect } from "react";
import data from "@/app/essential-1/data";

interface Params {
    id: number;
}

interface Essential1Props {
    params: Params;
}

export default function Essential1({ params }: Essential1Props) {
    const id: number = Number(params.id);

    for (let i = 0; i < data.length; i++) {
        if (data[i].unit_id == id) {
            useEffect(() => {
                scriptType(data[i].options, data[i].unit_name, data[i].unit_id)
            }, []);
        }
    }

    return (
        <>
            <div>{id}</div>
            <Content />
        </>
    );
}
