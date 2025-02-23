'use client'

import Box from "@/components/Box";
import GenericInput from "@/components/GenericInput";
import { useUsers } from "@/context/UserContext";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const { handleLogin } = useUsers();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleLogin(email, senha);
    }

    return (
        <>
            <h1>Login</h1>
            <Box>
                <form onSubmit={(e) => { handleSubmit(e) }}>
                    <GenericInput type="text" label="Email" value={email} onChange={setEmail} />
                    <GenericInput type="password" label="Senha" value={senha} onChange={setSenha} />
                    <button type="submit">Entrar</button>
                    <span className="block">
                        <Link className="text-red-500" href="/cadastrar">Não tem uma conta? Cadastre-se!</Link>
                    </span>
                </form>
            </Box>
        </>
    )
}