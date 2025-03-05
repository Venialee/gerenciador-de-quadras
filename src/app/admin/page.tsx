'use client';

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
            <div className="min-h-screen flex flex-col w-full md:flex-row md:justify-between bg-darkBlue bg-[url('/logomarca_fundo.svg')] bg-center bg-no-repeat">
                <div className="flex flex-col items-center w-full mb-8 p-4">
                    <h2 className="text-complementYellow text-xl font-bold my-4">Reservas Pendentes</h2>
                    {Array.isArray(reservasPendentes) && reservasPendentes.length > 0 ? (
                        <TableList tables={reservasPendentes.map(reserva => ({ reserva }))} />
                    ) : (
                        <p className="text-backgroundYellow text-xl">Nenhuma reserva pendente.</p>
                    )}
                </div>
                <div className="flex flex-col items-center w-full mb-8 p-4">
                    <h2 className="text-complementYellow text-xl font-bold my-4">Reservas Canceladas</h2>
                            {Array.isArray(reservasCanceladas) && reservasCanceladas.length > 0 ? (
                        <TableList tables={reservasCanceladas.map(reserva => ({ reserva }))} />
                    ) : (
                        <p className="text-backgroundYellow text-xl">Nenhuma reserva cancelada.</p>
                    )}
                </div>
            </div>
        </>
    )
}