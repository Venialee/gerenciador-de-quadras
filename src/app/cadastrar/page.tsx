'use client'

import { useState } from "react";
import { UsuarioInterface } from "@/@types/types";
import { useUsers } from "@/context/UserContext";
import Box from "@/components/Box";
import GenericInput from "@/components/GenericInput";
import Button from "@/components/Button";

export default function Register() {
    const { handleRegisterUser, handleRegisterAluno, alunos, users } = useUsers();

    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [CPF, setCPF] = useState<string>("");
    const [matricula, setMatricula] = useState<number>(0);
    const [telefone, setTelefone] = useState<number>(0);

    const handleClick = () => {
        const novoUsuario: UsuarioInterface = {
            idUsuario: 0,
            telefone: BigInt(telefone),
            nome: nome,
            email: email,
            senha: senha,
            CPF: CPF
        }
        handleRegisterUser(novoUsuario);
        console.log("Usuários cadastrados:", [...users, novoUsuario]);
        if (matricula !== null && matricula !== 0) {
            const newAluno = {
                idAluno: 0,
                matricula: matricula,
                idUsuario: novoUsuario.idUsuario
            }
            handleRegisterAluno(newAluno);
            console.log("Alunos:", [...users, newAluno]);
        }
        resetFileds();
    }

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
                <GenericInput type="text" label="Email" value={email} onChange={setEmail} />
                <GenericInput type="text" label="Senha" value={senha} onChange={setSenha} />
                <GenericInput type="text" label="CPF" value={CPF} onChange={setCPF} />
                <GenericInput type="number" label="Telefone*" value={telefone} onChange={setTelefone} />
                <GenericInput type="number" label="Número de matrícula" value={matricula} onChange={setMatricula} />
                <Button content="Cadastrar" onClick={() => handleClick()} />
            </Box>
        </>
    )
}