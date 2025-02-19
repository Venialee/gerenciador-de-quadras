'use client'

import React, { createContext, ReactNode, useContext, useState } from "react";

import { UsuarioInterface } from "@/@types/types";

interface UserContextType {
    currentUser: UsuarioInterface | null;
    users: UsuarioInterface[];
    setUsers: React.Dispatch<React.SetStateAction<UsuarioInterface[]>>;
    handleRegisterUser: (user: UsuarioInterface) => void;
    handleLogin: (email: string, senha: string) => void;
    handleLogout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const teste: UsuarioInterface = {
        idUsuario: 1,
        idTelefone: 1,
        nome: "teste",
        email: "teste@teste.com",
        senha: "teste",
        cpf: "34534534"
    }

    const teste2: UsuarioInterface = {
        idUsuario: 2,
        idTelefone: 2,
        nome: "marilia",
        email: "ma@gmail.com",
        senha: "teste",
        cpf: "543436665"
    }

    const [users, setUsers] = useState<UsuarioInterface[]>([teste, teste2]);
    const [currentUser, setCurrentUser] = useState<UsuarioInterface | null>(null);

    const handleRegisterUser = (user: UsuarioInterface) => {
        setUsers((prev) => [...prev, user]);
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
            currentUser,
            handleRegisterUser,
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