'use client'

import TableList from "@/components/TableList";
import { useReserva } from "@/context/ReservaContext";

export interface ReservaInterface {
    idReserva: number,
    idQuadra: number,
    dataReserva: string,
    horaInicio: number,
    horafim: number,
    status: string
}

export default function AdminPage() {
    const { reservasPendentes, reservasCanceladas } = useReserva();

    return (
        <>
            <div>
                <h2>Reservas Pendentes</h2>
                {Array.isArray(reservasPendentes) && reservasPendentes.length > 0 ? (
                    <TableList tables={reservasPendentes.map(reserva => ({ reserva }))} />
                ) : (
                    <p>Nenhuma reserva pendente.</p>
                )}
            </div>
            <div>
                <h2>Reservas Canceladas</h2>
                {Array.isArray(reservasCanceladas) && reservasCanceladas.length > 0 ? (
                    <TableList tables={reservasCanceladas.map(reserva => ({ reserva }))} />
                ) : (
                    <p>Nenhuma reserva cancelada.</p>
                )}
            </div>
        </>
    )
}
