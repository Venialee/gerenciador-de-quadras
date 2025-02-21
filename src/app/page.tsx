// _app.tsx
'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUsers } from '@/context/UserContext';

export default function MyApp() {
  const { currentUser } = useUsers();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  return (
    <h1>Olá, {currentUser ? currentUser.nome : 'Visitante'}</h1>
  )
}