import { ReservaInterface } from "@/@types/types";
import Button from "./Button";
import { useReserva } from "@/context/ReservaContext";

export interface TableProps {
    reserva: ReservaInterface
}

export default function Table({ reserva }: TableProps) {
    const { handleAprovarReserva, handleRejeitarReserva, handleDeleteReserva } = useReserva();

    const showButton = () => {
        if (reserva.status === "approved") {
            return <Button content="Cancelar" variation="red" onClick={() => handleRejeitarReserva(reserva)} />
        } else if (reserva.status === "canceled") {
            return <Button content="Deletar" variation="red" onClick={() => handleDeleteReserva(reserva)} />
        }
        else return (
            <>
                <Button content="Aprovar Reserva" onClick={() => handleAprovarReserva(reserva)} />
                <Button content="Rejeitar Reserva" variation="red" onClick={() => handleRejeitarReserva(reserva)} />
            </>
        )
    }

    return (
        <div className="w-auto flex flex-col items-center m-8">
            <table className="border-collapse border border-gray-400 m-2">
                <thead>
                    <tr>
                        <th className="border border-gray-400 p-2">Data</th>
                        <th className="border border-gray-400 p-2">Hora Inicial</th>
                        <th className="border border-gray-400 p-2">Hora Final</th>
                        <th className="border border-gray-400 p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-400 p-2">{reserva.dataReserva}</td>
                        <td className="border border-gray-400 p-2">{reserva.horaInicio}</td>
                        <td className="border border-gray-400 p-2">{reserva.horaFim}</td>
                        <td className="border border-gray-400 p-2">{reserva.status}</td>
                    </tr>
                </tbody>
            </table>
            <div className="justify-between w-full flex max-w-[371px]">
                {showButton()}
            </div>
        </div>
    );
}
