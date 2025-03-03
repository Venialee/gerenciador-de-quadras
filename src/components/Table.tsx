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
                    <div className="flex flex-col sm:flex-row md:gap-2">
                        <Button content="Aprovar" variation="backgroundYellow" onClick={() => {
                            handleAlterarStatusReserva(reserva, 1);
                        }} />
                        <Button content="Cancelar" variation="lightOrange" onClick={() => {
                            handleAlterarStatusReserva(reserva, 2);
                        }} />
                    </div>
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
        <div className="w-full flex flex-col items-center m-2">
            <table className="border-collapse border border-gray-400 m-2 w-full max-w-4xl">
                <thead>
                    <tr className="bg-complementYellow">
                        <th className="border border-gray-400 p-2 text-darkBlue font-bold">Data</th>
                        <th className="border border-gray-400 p-2 text-darkBlue font-bold">Hora Inicial</th>
                        <th className="border border-gray-400 p-2 text-darkBlue font-bold">Hora Final</th>
                        <th className="border border-gray-400 p-2 text-darkBlue font-bold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-backgroundYellow">
                        <td className="text-center border border-gray-400 p-2 text-darkBlue">{formatDate(reserva.dataReserva)}</td>
                        <td className="text-center border border-gray-400 p-2 text-darkBlue">{formatTime(reserva.horaInicio)}</td>
                        <td className="text-center border border-gray-400 p-2 text-darkBlue">{formatTime(reserva.horaFim)}</td>
                        <td className="text-center border border-gray-400 p-2 text-darkBlue">{setReservaStatus()}</td>
                    </tr>
                    {reserva.idEvento !== null ?
                        <>
                            <tr className="bg-backgroundYellow">
                                <td className="border border-gray-400 p-2 text-darkBlue font-b" colSpan={4}><span className="font-bold">Evento:</span> {reserva.evento?.nome ?? 'N/A'}</td>
                            </tr>
                            <tr className="bg-backgroundYellow">
                                <td className="border border-gray-400 p-2 text-darkBlue font-b" colSpan={4}><span className="font-bold">Organizador do Evento:</span> {reserva.evento?.organizador ?? 'N/A'}</td>
                            </tr>
                            <tr className="bg-backgroundYellow">
                                <td className="border border-gray-400 p-2 text-darkBlue font-b" colSpan={4}><span className="font-bold">Descrição:</span> {reserva.evento?.descricao ?? 'N/A'}</td>
                            </tr>
                        </>
                        :
                        null
                    }
                </tbody>
            </table>
            <div className="flex flex-col sm:flex-row justify-center mt-4 gap-2">
                {showButton()}
                {displayEditButton === true ? (
                    <Link href={`/minhas-reservas/${reserva.idreserva}`} scroll={false}>
                        <Button  content="Editar" variation="lightBlue" />
                    </Link>
                ) : null}
            </div>
        </div>
    );
}