'use client';

import Link from "next/link";
import { useUsers } from "@/context/UserContext";
import { IoMenu } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { handleLogout, currentUser } = useUsers();

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <header className="flex h-auto justify-between items-center p-8 bg-complementYellow shadow-md">
            <div className="flex items-center">
                <Link href="/" className="text-center text-darkBlue text-3xl font-bold hover:text-lightBlue">Home</Link>
            </div>
            <div>
                <div className="lg:hidden">
                    <button className="text-[1.5rem]" onClick={toggleMenu} aria-label="Toggle menu">
                        {isOpen ? <IoCloseOutline /> : <IoMenu />}
                    </button>
                </div>

                <nav className={`bg-complementYellow absolute lg:relative pb-6 right-0 lg:right-unsetlg:left-unset left-0 lg:top-unset top-[112px] z-50 shadow-[0px_8px_8px_0px_rgba(93,0,150,0.16)] 
                    flex flex-col items-center justify-center gap-2 lg:top-0 lg:gap-0 lg:block lg:shadow-none lg:pb-0 lg:my-0 lg:mx-auto
                    ${isOpen ? 'block' : 'hidden lg:flex'} mt-[-2rem]`}>
                    <div className="flex gap-4 flex-col lg:p-0 lg:flex-row w-auto mr-auto lg:items-center justify-start shrink-0 flex-start px-8 py-0 items-start">
                        {currentUser ? (
                            <>
                                {currentUser.tipo === 'admin' && <Link href="/admin" className="text-center text-darkBlue lg:text-3xl font-bold hover:text-lightBlue">Admin</Link>}
                                <Link href="/reserva" className="text-center text-darkBlue lg:text-3xl font-bold hover:text-lightBlue">Fazer Reserva</Link>
                                <Link href="/minhas-reservas" className="text-center text-darkBlue lg:text-3xl font-bold hover:text-lightBlue">Minhas Reservas</Link>
                                <span className="cursor-pointer text-center text-darkBlue lg:text-3xl font-bold hover:text-lightBlue" onClick={handleLogout}>Logout</span>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-center text-darkBlue lg:text-3xl font-bold hover:text-lightBlue">Login</Link>
                                <Link href="/cadastrar" className="flex justify-center items-center h-11 lg:px-2 lg:py-1.5 
                                lg:bg-darkBlue bg-transparent lg:rounded-[30px] lg:border lg:border-complementYellow lg:hover:bg-middleBlue">
                                    <span className="text-center lg:text-[#f2e74b] lg:text-3xl font-bold ">Cadastre-se</span>
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}