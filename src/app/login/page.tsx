'use client'

import Box from "@/components/Box";
import Button from "@/components/Button";
import GenericInput from "@/components/GenericInput";
import { useUsers } from "@/context/UserContext";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    const { handleLogin } = useUsers();

    const handleClick = () => {
        handleLogin(email, senha);
    }

    return (
        <>
            <h1>Login</h1>
            <Box>
                <GenericInput type="text" label="Email" value={email} onChange={setEmail} />
                <GenericInput type="text" label="Senha" value={senha} onChange={setSenha} />
                <Button content="Entrar" onClick={() => handleClick()} />
            </Box>
        </>
    )
}