'use client'

import { useState } from "react";
import { UsuarioInterface } from "@/@types/types";
import { useUsers } from "@/context/UserContext";
import Box from "@/components/Box";
import GenericInput from "@/components/GenericInput";
import Button from "@/components/Button";

export default function Register() {
    const { handleRegisterUser, users } = useUsers();

    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");

    const handleClick = () => {
        const usuario: UsuarioInterface = {
            idUsuario: users.length + 1,
            idTelefone: 1,
            nome: nome,
            email: email,
            senha: senha,
            cpf: cpf
        }
        handleRegisterUser(usuario);
        console.log("Usuários cadastrados:", [...users, usuario]);
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
                <Button content="Cadastrar" onClick={() => handleClick()} />
            </Box>
        </>
    )
}