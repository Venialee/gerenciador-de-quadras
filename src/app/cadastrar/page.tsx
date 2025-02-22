'use client'

import { useState } from "react";
import { useUsers } from "@/context/UserContext";
import Box from "@/components/Box";
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
            <h1>Cadastrar Usuário</h1>
            <Box>
                <GenericInput type="text" label="Nome" value={nome} onChange={setNome} />
                <GenericInput type="text" label="Sobrenome" value={sobrenome} onChange={setSobrenome} />
                <GenericInput type="text" label="Email" value={email} onChange={setEmail} />
                <GenericInput type="password" label="Senha" value={senha} onChange={setSenha} />
                <GenericInput type="text" label="CPF" value={CPF} onChange={setCPF} />
                <GenericInput type="text" label="Telefone" value={telefone} onChange={setTelefone} />
                <GenericInput type="number" label="Número de matrícula" value={matricula} onChange={setMatricula} />
                <Button content="Cadastrar" onClick={() => handleClick()} />
            </Box>
        </>
    )
}