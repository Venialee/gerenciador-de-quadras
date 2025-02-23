'use client';

import { useReserva } from "@/context/ReservaContext";
import { useUsers } from "@/context/UserContext";
import TableList from "@/components/TableList";

export default function Home() {
  const {
    reservasPendentes,
    reservasAprovadas,
    reservasCanceladas,
  } = useReserva();

  const { currentUser } = useUsers();

  const helloUser = () => {
    if (currentUser !== null) {
      return <h2 className="text-red-500">Olá, {currentUser.nome}</h2>;
    }
  };

  return (
    <>
      <h1>Reservar Quadra</h1>
      {helloUser()}
      <div className="flex flex-row">
        <div>
          <h2>Reservas Aprovadas</h2>
          {Array.isArray(reservasAprovadas) && reservasAprovadas.length > 0 ? (
            <TableList tables={reservasAprovadas.map(reserva => ({ reserva }))} />
          ) : (
            <p>Nenhuma reserva aprovada.</p>
          )}
        </div>
      </div>
    </>
  );
}