'use client';

import TableList from "@/components/TableList";
import { useReserva } from "@/context/ReservaContext";
import { useUsers } from "@/context/UserContext";

export default function MinhasReservas() {
    const { reservasPendentes } = useReserva();
    const { currentUser } = useUsers();

    const reservasDoUsuario = reservasPendentes.filter((r) => r.idUsuario === currentUser?.idUsuario);

    return (
        <>
            <div className="min-h-screen bg-darkBlue bg-[url('/logomarca_fundo.svg')] bg-center bg-no-repeat flex justify-center">
                <div className="flex flex-col items-center w-full max-w-md p-8 rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-complementYellow text-xl font-bold mb-8">Reservas Pendentes</h2>
                        {Array.isArray(reservasPendentes) && reservasPendentes.length > 0 ? (
                            <TableList displayEditButton={true} tables={reservasDoUsuario.map(reserva => ({ reserva }))} />
                        ) : (
                            <p className="text-backgroundYellow text-xl">Nenhuma reserva pendente.</p>
                        )}
                    </div>
                </div>
            </div>
        </> 
    );
}