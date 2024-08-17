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
            <nav className="navbar">
                <div className="container">
                    <Link href={'/'} className="logo text-3xl">Essential</Link>
                    <ul className="nav-links">
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