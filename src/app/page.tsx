'use client';

import { useReserva } from "@/context/ReservaContext";
import { useUsers } from "@/context/UserContext";
import TableList from "@/components/TableList";

export default function Home() {
  const {
    reservas,
    reservasAprovadas,
    reservasRejeitadas
  } = useReserva();

  const { currentUser } = useUsers();

  const helloUser = () => {
    if (currentUser !== null) {
      return <h2 className="text-red-500">Olá, {currentUser.nome}</h2>
    }
  }

  return (
    <>
      <h1>Reservar Quadra</h1>
      {helloUser()}
      <div className="flex flex-row">
        <div>
          <h2>Reservas Pendentes</h2>
          <TableList tables={reservas.map(reserva => ({ reserva }))} />
        </div>
        <div>
          <h2>Reservas Aprovadas</h2>
          <TableList tables={reservasAprovadas.map(reserva => ({ reserva }))} />
        </div>
        <div>
          <h2>Reservas Rejeitadas</h2>
          <TableList tables={reservasRejeitadas.map(reserva => ({ reserva }))} />
        </div>
      </div>
    </>
  )
}
