'use client';

import { useReserva } from "@/context/ReservaContext";
import { useUsers } from "@/context/UserContext";
import TableList from "@/components/TableList";

export default function Home() {
  const {
    reservasAprovadas
  } = useReserva();

  const { currentUser } = useUsers();

  const helloUser = () => {
    if (currentUser !== null) {
      return <h2 className="text-complementYellow text-xl font-bold mb-8">Olá, {currentUser.nome}</h2>;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-darkBlue bg-[url('/logomarca_fundo.svg')] bg-center bg-no-repeat flex justify-center">
        <div className="flex flex-col items-center w-full max-w-md p-8 rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="flex flex-col items-center w-full">
              {helloUser()}
              <h2 className="text-backgroundYellow font-bold text-2xl">Reservas Aprovadas</h2>
              {Array.isArray(reservasAprovadas) && reservasAprovadas.length > 0 ? (
                <TableList tables={reservasAprovadas.map(reserva => ({ reserva }))} />
              ) : (
                <p>Nenhuma reserva aprovada.</p>
              )}
            </div>
        </div>
      </div>
    </>
  );
}