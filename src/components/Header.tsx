'use client';

import Link from "next/link";
import { useUsers } from "@/context/UserContext";

export default function Header() {
    const { handleLogout, currentUser } = useUsers();

    return (
        <header className="flex justify-between items-center h-[80px] p-8 bg-complementYellow shadow-md">
            <div className="flex items-center">
                <Link href="/" className="text-center text-darkBlue text-3xl font-bold hover:text-lightBlue">Home</Link>
            </div>
            <nav className="flex items-center gap-[60px]">
                {currentUser ? (
                    <>
                        {currentUser.tipo === 'admin' && <Link href="/admin" className="text-center text-darkBlue text-3xl font-bold hover:text-lightBlue">Admin</Link>}
                        <Link href="/reserva" className="text-center text-darkBlue text-3xl font-bold hover:text-lightBlue">Fazer Reserva</Link>
                        <Link href="/minhas-reservas" className="text-center text-darkBlue text-3xl font-bold hover:text-lightBlue">Minhas Reservas</Link>
                        <span className="cursor-pointer text-center text-darkBlue text-3xl font-bold hover:text-lightBlue" onClick={handleLogout}>Logout</span>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="text-center text-darkBlue text-3xl font-bold hover:text-lightBlue">Login</Link>
                        <Link href="/cadastrar" className="flex justify-center items-center h-11 px-2 py-1.5 bg-darkBlue rounded-[30px] border border-complementYellow hover:bg-middleBlue">
                            <span className="text-center text-[#f2e74b] text-3xl font-bold ">Cadastre-se</span>
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}