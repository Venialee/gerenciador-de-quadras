import { ReservaInterface } from "@/@types/types";
import Button from "./Button";
import { useReserva } from "@/context/ReservaContext";
import { useUsers } from "@/context/UserContext";
import Link from "next/link";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export interface TableProps {
    reserva: ReservaInterface;
    displayEditButton?: boolean;
}

export default function Table({ reserva, displayEditButton = false }: TableProps) {
    const { handleAlterarStatusReserva, handleDeleteReserva } = useReserva();
    const { currentUser } = useUsers();

    dayjs.extend(utc);

    function formatDate(date: string) {
        return dayjs.utc(date).format('DD/MM/YYYY');
    }

    function formatTime(time: string) {
        return dayjs.utc(time).format('HH:mm');
    }

    const showButton = () => {
        if (reserva.status === 0 && currentUser?.tipo === 'admin') {
            return (
                <>
                    <Button content="Aprovar reserva" variation="backgroundYellow" onClick={() => {
                        handleAlterarStatusReserva(reserva, 1);
                    }} />
                    <Button content="Cancelar reserva" variation="lightOrange" onClick={() => {
                        handleAlterarStatusReserva(reserva, 2);
                    }} />
                </>
            );
        }
        else if (reserva.status === 2 && currentUser?.tipo === 'admin') {
            return (
                <>
                    <Button content="Deletar reserva" variation="lightOrange" onClick={() => {
                        handleDeleteReserva(reserva);
                    }} />
                </>
            );
        }
        else {
            return null;
        }
    };

    const setReservaStatus = () => {
        switch (reserva.status) {
            case 0:
                return 'Pendente';
            case 1:
                return 'Aprovado';
            case 2:
                return 'Cancelado';
            default:
                return 'Undefined';
        }
    };

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
                        <td className="border border-gray-400 p-2">{formatDate(reserva.dataReserva)}</td>
                        <td className="border border-gray-400 p-2">{formatTime(reserva.horaInicio)}</td>
                        <td className="border border-gray-400 p-2">{formatTime(reserva.horaFim)}</td>
                        <td className="border border-gray-400 p-2">{setReservaStatus()}</td>
                    </tr>
                    {reserva.idEvento !== null ?
                        <>
                            <tr className="border border-gray-400 p-2">
                                <td className="w-full">Evento: {reserva.evento?.nome ?? 'N/A'}</td>
                            </tr>
                            <tr className="border border-gray-400 p-2">
                                <td className="w-full">Organizador do Evento: {reserva.evento?.organizador ?? 'N/A'}</td>
                            </tr>
                            <tr className="border border-gray-400 p-2">
                                <td className="w-full">Descrição: {reserva.evento?.descricao ?? 'N/A'}</td>
                            </tr>
                        </>
                        :
                        null
                    }
                </tbody>
            </table>
            <div className="justify-between w-full flex max-w-[371px]">
                {showButton()}
                {displayEditButton === true ? <Link href={`/minhas-reservas/${reserva.idReserva}`} scroll={false}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                        Editar Reserva
                    </button>
                </Link> : null}
            </div>
        </div>
    );
}