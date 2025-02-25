'use client'

import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";

import { AlunoInterface, UsuarioInterface } from "@/@types/types";
import { useRouter } from 'next/navigation';

interface UserContextType {
    currentUser: UsuarioInterface | null;
    users: UsuarioInterface[];
    alunos: AlunoInterface[];
    setUsers: React.Dispatch<React.SetStateAction<UsuarioInterface[]>>;
    handleRegisterUser: (user: UsuarioInterface, matricula?: number | string) => void;
    handleRegisterAluno: (aluno: AlunoInterface) => void;
    handleLogin: (email: string, senha: string) => void;
    handleLogout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<UsuarioInterface[]>([]);
    const [alunos, setAlunos] = useState<AlunoInterface[]>([]);
    const [currentUser, setCurrentUser] = useState<UsuarioInterface | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("currentUser");
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        }
    }, []);

    const handleRegisterUser = async (user: UsuarioInterface, matricula?: string | number) => {
        try {
            const res = await fetch("/api/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...user, matricula }),
            });

            if (!res.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }

            const data = await res.json();
            setCurrentUser(data);
            localStorage.setItem("currentUser", JSON.stringify(data));
            console.log("Usuário salvo no localStorage:", data);
            router.push('/');

            if (data.aluno) {
                setAlunos((prev) => [...prev, data.aluno]);
            }
        } catch (error) {
            console.error("Erro no registro:", error);
        }
    }

    const handleRegisterAluno = (aluno: AlunoInterface) => {
        setAlunos((prev) => [...prev, aluno]);
    }

    const handleLogin = async (email: string, senha: string) => {
        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await res.json();
            console.log("Dados recebidos da API:", data)

            if (res.status === 200) {
                console.log("Status da resposta:", res.status);
                localStorage.setItem("currentUser", JSON.stringify(data));
                console.log("Usuário salvo no localStorage:", data);
                setCurrentUser(data);
                router.push(data.tipo === 'admin' ? '/admin' : '/');
            } else {
                window.alert('Usuário ou senha incorretos');
            }
        } catch (error) {
            console.log("Erro ao buscar usuário:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        router.push('/');
    }

    return (
        <UserContext.Provider value={{
            users,
            alunos,
            currentUser,
            handleRegisterUser,
            handleRegisterAluno,
            handleLogin,
            handleLogout,
            setUsers
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUsers = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('Usuários devem ser gerenciados com o UserProvider');
    }
    return context;
};