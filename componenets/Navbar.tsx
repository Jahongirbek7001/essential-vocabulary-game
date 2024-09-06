"use client"

import Link from "next/link";
import { useEffect } from "react"


export default function Navbar() {
    const handleClick = () => {
        const burger = document.querySelector('.burger') as HTMLButtonElement;
        const navLinks = document.querySelector('.nav-links') as HTMLUListElement;

        if (!burger || !navLinks) {
            console.error('Burger button or nav links element not found');
        } else {
            navLinks.classList.toggle("active");
            burger.classList.toggle("toggle");
        }
    }
    return (
        <>
            <nav className=" p-3 border-2 border-solid border-gray-400">
                <div className=" w-[90%] mx-auto flex justify-between items-center">
                    <Link href={'/'} className=" text-3xl">Essential</Link>
                    <ul className="nav-links flex items-center gap-5">
                        <li><Link href={'/'}>Home</Link></li>
                        <li><Link href={"/download"}>Download</Link></li>
                    </ul>
                    <button className="burger" onClick={handleClick}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </button>
                </div>
            </nav>

        </>
    )
}