'use client'

import TableList from "@/components/TableList";
import { useReserva } from "@/context/ReservaContext"
import { useUsers } from "@/context/UserContext";
import { useEffect, useState } from 'react';

export default function MinhasReservas() {
    const { reservasPendentes,atualizarReservas  } = useReserva();
    const { currentUser } = useUsers();

    console.log('reserva pen ', reservasPendentes)
 
    // Filter current user's pending reservations
    const reservasDoUsuario = reservasPendentes?.filter((r: any) => 
        r.idUsuario === (currentUser as any)?.usuario?.idUsuario
    );


    return (
        <>
            <div>
                <h2>Reservas Pendentes</h2>
                {Array.isArray(reservasDoUsuario) && reservasDoUsuario.length > 0 ? (
                    <TableList tables={reservasDoUsuario.map((reserva:any) => ({ reserva }))} />
                   
                ) : (
                    <p>Nenhuma reserva pendente.</p>
                )}
            </div>
        </>
    )
}