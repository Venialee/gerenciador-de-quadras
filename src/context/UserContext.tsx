'use client'

import React, { createContext, ReactNode, useContext, useState } from "react";

import { AlunoInterface, UsuarioInterface } from "@/@types/types";
import { useRouter } from 'next/navigation';

interface UserContextType {
    currentUser: UsuarioInterface | null;
    users: UsuarioInterface[];
    alunos: AlunoInterface[];
    setUsers: React.Dispatch<React.SetStateAction<UsuarioInterface[]>>;
    handleRegisterUser: (user: UsuarioInterface) => void;
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

    const handleRegisterUser = (user: UsuarioInterface) => {
        setUsers((prev) => [...prev, user]);
    }

    const handleRegisterAluno = (aluno: AlunoInterface) => {
        setAlunos((prev) => [...prev, aluno]);
    }

    const handleLogin = async (email: string, senha: string) => {
        try {
            const res = await fetch('/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await res.json();

            if (res.status === 200) {
                setCurrentUser(data);
                router.push('/');
            } else {
                window.alert('Usuário ou senha incorretos');
            }
        } catch (error) {
            console.log("Erro ao buscar usuário:", error);
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
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