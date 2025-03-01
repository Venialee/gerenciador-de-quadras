'use client'

import { useState } from "react";
import { useUsers } from "@/context/UserContext";
import GenericInput from "@/components/GenericInput";
import Button from "@/components/Button";
import { UsuarioInterface } from "@/@types/types";

export default function Register() {
    const { handleRegisterUser } = useUsers();

    const [nome, setNome] = useState<string>("");
    const [sobrenome, setSobrenome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [CPF, setCPF] = useState<string>("");
    const [matricula, setMatricula] = useState<number>(0);
    const [telefone, setTelefone] = useState<string>("");

    const handleClick = async () => {
        const novoUsuario: UsuarioInterface = {
            telefone: telefone.trim(),
            nome,
            sobrenome,
            email,
            senha,
            CPF,
        };

        await handleRegisterUser(novoUsuario, matricula !== 0 ? String(matricula) : undefined);

        resetFileds();
    };

    const resetFileds = () => {
        setNome("");
        setEmail("");
        setSenha("");
        setCPF("");
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-darkBlue bg-[url('/logomarca_fundo.svg')] bg-center bg-no-repeat">
                <div className="flex flex-col items-center w-full max-w-md p-8 rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                    <div className="flex flex-col w-full">
                        <GenericInput type="text" label="" value={nome} onChange={setNome} placeholder="Informe o seu nome" icon={<img src="/perfil.svg" alt="Ícone de nome" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="text" label="" value={sobrenome} onChange={setSobrenome} placeholder="Informe o seu sobrenome" icon={<img src="/perfil.svg" alt="Ícone de sobrenome" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="text" label="" value={email} onChange={setEmail} placeholder="Informe o seu e-mail" icon={<img src="/email.svg" alt="Ícone de email" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="text" label="" value={telefone} onChange={setTelefone} placeholder="Telefone ex: 28 999..." icon={<img src="/phone.svg" alt="Ícone de senha" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="text" label="" value={CPF} onChange={setCPF} placeholder="Digite seu CPF" icon={<img src="/document.svg" alt="Ícone de senha" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="password" label="" value={senha} onChange={setSenha} placeholder="Crie uma senha" icon={<img src="/senha.svg" alt="Ícone de senha" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="number" label="" value={matricula} onChange={setMatricula} placeholder="Matricula" icon={<img src="/document.svg" alt="Ícone de matricula" className="h-5 w-5 text-darkBlue" />} />
                        <Button content="Cadastrar" onClick={() => handleClick()} />
                    </div>
                </div>
            </div>
        </>
    )
}