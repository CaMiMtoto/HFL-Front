"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import { TbMenu2, TbX} from "react-icons/tb";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

    useEffect(() => {
        // listen to screen size changes
        const handleResize = () => {
            // lg screen size or less
            if (window.innerWidth <1024) {
                setIsOpen(false);
            }else{
                setIsOpen(true);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });

    return <nav className={` bg-gray-200 py-2 border-b border-b-gray-300 `}>
        <div
            className={"flex flex-col lg:flex-row lg:items-center gap-2 justify-between max-w-screen-xl px-10 mx-auto"}>
            <div className={"flex items-center justify-between gap-2"}>
                <div className={"flex items-center justify-between gap-2"}>
                    <img src={"https://licensing.moh.gov.rw/assets/logo-762df436.png"} alt={"Logo"}
                           width={"50"}
                           height={"10"}/>
                    <Link href={"/"} className={"font-bold "}>MOH</Link>
                </div>
                <button className={"inline-flex lg:hidden items-center justify-center"} onClick={toggle}
                        type={"button"}>
                    {!isOpen && <TbMenu2 size={"24"}/>}
                    {isOpen && <TbX size={"24"}/>}
                </button>
            </div>
            <div
                className={`overflow-hidden text-sm transition-all ease-in-out duration-500 flex flex-col lg:flex-row gap-4  ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <Link href={"/"} className={"block text-gray-700 hover:text-gray-900"}>Staff Login</Link>
                <Link href={"/"} className={"block text-gray-700 hover:text-gray-900"}>Check License Validity</Link>
                <Link href={"/"} className={"block text-gray-700 hover:text-gray-900"}>User Manual</Link>
                <Link href={"/login"} className={"block text-gray-700 hover:text-gray-900"}>Login</Link>
                <Link href={"/register"} className={"block text-gray-700 hover:text-gray-900"}>Register</Link>
            </div>

        </div>

    </nav>;
}