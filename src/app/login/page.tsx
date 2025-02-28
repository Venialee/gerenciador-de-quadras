'use client'

import Box from "@/components/Box";
import GenericInput from "@/components/GenericInput";
import { useUsers } from "@/context/UserContext";
import Link from "next/link";
import { useState } from "react";
import Button from "@/components/Button";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const { handleLogin } = useUsers();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleLogin(email, senha);
    }

    return (
        <div className="min-h-screen bg-darkBlue bg-[url('/logomarca_fundo.svg')] bg-center bg-no-repeat flex justify-center items-center">
            <div className="flex flex-col items-center w-full max-w-md p-8 rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                <img src="/logomarca.svg" alt="Logomarca" className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56" />
                <form className="flex flex-col  w-full" onSubmit={handleSubmit}>
                    <GenericInput type="text" label="" value={email} onChange={setEmail} placeholder="Informe o seu e-mail" icon={<img src="/email.svg" alt="Ícone de email" className="h-5 w-5 text-darkBlue" />} />
                    <GenericInput type="password" label="" value={senha} onChange={setSenha} placeholder="Digite a sua senha" icon={<img src="/senha.svg" alt="Ícone de senha" className="h-5 w-5 text-darkBlue" />} />
                    <Button content="Entrar" variation="backgroundYellow" />
                    <span className="block mt-4 text-center">
                        <Link className="text-complementYellow" href="/cadastrar">Não tem uma conta? Cadastre-se!</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}