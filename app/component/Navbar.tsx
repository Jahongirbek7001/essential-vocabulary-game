"use client"

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    // State to control the visibility of the menu
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="p-3 border-b-2 border-solid border-gray-400">
                <div className="w-[90%] mx-auto flex justify-between items-center">
                    <Link href={'/'} className="text-3xl">Essential</Link>
                    <button
                        className="burger flex flex-col gap-2 bg-none outline-none block md:hidden"
                        onClick={toggleMenu}
                    >
                        {/* Burger lines */}
                        <div
                            className={`line w-[25px] h-[3px] bg-black transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[11px]' : ''
                                }`}
                        ></div>
                        <div
                            className={`line w-[25px] h-[3px] bg-black transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''
                                }`}
                        ></div>
                        <div
                            className={`line w-[25px] h-[3px] bg-black transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[11px]' : ''
                                }`}
                        ></div>
                    </button>
                    {/* Menu for large screens */}
                    <ul className="nav-links flex items-center gap-5 hidden md:flex">
                        <li><Link href={'/'}>Home</Link></li>
                        <li><Link href={"/download"}>Download</Link></li>
                    </ul>
                </div>

                {/* Dropdown menu for mobile screens */}
                <ul
                    className={`md:hidden bg-white text-center w-full border-t-2 border-solid border-gray-400 transition-all duration-300 ease-in-out ${isOpen ? 'block' : 'hidden'
                        }`}
                >
                    <li className="p-3 border-b border-gray-300"><Link href={'/'}>Home</Link></li>
                    <li className="p-3"><Link href={"/download"}>Download</Link></li>
                </ul>
            </nav>
        </>
    );
}
