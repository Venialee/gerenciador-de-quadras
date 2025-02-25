'use client';

import Link from "next/link";
import { useUsers } from "@/context/UserContext";

export default function Header() {
    const { handleLogout, currentUser } = useUsers();

    return (
        <header className="flex gap-4 border-red-500 border-b-2 border-rounded p-4">
            <nav className="flex gap-4">
                <Link href="/">Home</Link>

                {currentUser ? (
                    <>
                        {currentUser.tipo === 'admin' && <Link href="/admin">Admin</Link>}
                        <Link href="/reserva">Fazer Reserva</Link>
                        <Link href="/minhas-reservas">Minhas Reservas</Link>
                        <span className="cursor-pointer" onClick={handleLogout}>Logout</span>
                    </>
                ) : (
                    <>
                        <Link href="/cadastrar">Cadastre-se</Link>
                        <Link href="/login">Login</Link>
                    </>
                )}
            </nav>
        </header>
    );
}