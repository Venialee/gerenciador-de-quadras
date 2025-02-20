'use client'

import { useUsers } from "@/context/UserContext";

export default function Home() {
  const { currentUser } = useUsers();

  return (
    <>
      <h1>Gerenciador de Quadras</h1>
      <h2>Olá, {currentUser ? currentUser.nome : 'Guest'}</h2>
    </>
  );
}
