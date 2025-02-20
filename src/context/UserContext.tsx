'use client'

import React, { createContext, ReactNode, useContext, useState } from "react";

import { AlunoInterface, UsuarioInterface } from "@/@types/types";

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

export const telefone1 = {
    idTelefone: 1,
    telefone: 29999495960
}

const someUsers: UsuarioInterface[] = [
    {
        idUsuario: 1,
        idTelefone: telefone1.idTelefone,
        nome: "Maria",
        email: "maria@gmail.com",
        senha: "123maria456",
        cpf: "19219219270"
    },
    {
        idUsuario: 2,
        idTelefone: telefone1.idTelefone,
        nome: "João",
        email: "joao@gmail.com",
        senha: "123joao456",
        cpf: "20220220270"
    }
]

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<UsuarioInterface[]>([...someUsers]);
    const [alunos, setAlunos] = useState<AlunoInterface[]>([]);
    const [currentUser, setCurrentUser] = useState<UsuarioInterface | null>(null);

    const handleRegisterUser = (user: UsuarioInterface) => {
        setUsers((prev) => [...prev, user]);
    }

    const handleRegisterAluno = (aluno: AlunoInterface) => {
        setAlunos((prev) => [...prev, aluno]);
    }

    const handleLogin = (email: string, senha: string) => {
        const user = users.find((user) => user.email === email && user.senha === senha);
        if (user) {
            setCurrentUser(user);
            console.log(user);
        }
        else console.log("Usuário não encontrado");
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