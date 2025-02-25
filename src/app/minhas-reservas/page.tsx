'use client'

import TableList from "@/components/TableList";
import { useReserva } from "@/context/ReservaContext"
import { useUsers } from "@/context/UserContext";

export default function MinhasReservas() {
    const { reservasPendentes } = useReserva();
    const { currentUser } = useUsers();

    const reservasDoUsuario = reservasPendentes.filter((r) => r.idUsuario === currentUser?.idUsuario);

    return (
        <>
            <div>
                <h2>Reservas Pendentes</h2>
                {Array.isArray(reservasPendentes) && reservasPendentes.length > 0 ? (
                    <TableList tables={reservasDoUsuario.map(reserva => ({ reserva }))} />
                ) : (
                    <p>Nenhuma reserva pendente.</p>
                )}
            </div>
        </>
    )
}