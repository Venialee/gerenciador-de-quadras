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
    const [cpf, setCpf] = useState<string>("");
    const [matricula, setMatricula] = useState<number>(0);
    const [telefoneObrigatorio, setTelefoneObrigatorio] = useState<number>(0);
    const [telefoneOpcional, setTelefoneOpcional] = useState<number>(0);

    const handleClick = () => {
        const novoUsuario: UsuarioInterface = {
            idUsuario: users.length + 1,
            idTelefone: 1,
            nome: nome,
            email: email,
            senha: senha,
            cpf: cpf
        }
        handleRegisterUser(novoUsuario);
        console.log("Usuários cadastrados:", [...users, novoUsuario]);
        if(matricula !== null && matricula !== 0){
            const newAluno = {
                idAluno: novoUsuario.idUsuario,
                matricula: matricula
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
        setCpf("");
    }

    return (
        <>
            <h1>Cadastrar Usuário</h1>
            <Box>
                <GenericInput type="text" label="Nome" value={nome} onChange={setNome} />
                <GenericInput type="text" label="Email" value={email} onChange={setEmail} />
                <GenericInput type="text" label="Senha" value={senha} onChange={setSenha} />
                <GenericInput type="text" label="CPF" value={cpf} onChange={setCpf} />
                <GenericInput type="number" label="Telefone*" value={telefoneObrigatorio} onChange={setTelefoneObrigatorio} />
                <GenericInput type="number" label="Telefone" value={telefoneOpcional} onChange={setTelefoneOpcional} />
                <GenericInput type="number" label="Número de matrícula" value={matricula} onChange={setMatricula} />
                <Button content="Cadastrar" onClick={() => handleClick()} />
            </Box>
        </>
    )
}