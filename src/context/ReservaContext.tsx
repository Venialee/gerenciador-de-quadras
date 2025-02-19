'use client';

import { createContext, useState, useContext, ReactNode } from "react";
import { ReservaInterface } from "@/@types/types";
import { quadra } from "@/app/utils/quadra";

interface ReservaContextType {
    reservas: ReservaInterface[];
    setReservas: React.Dispatch<React.SetStateAction<ReservaInterface[]>>;
    reservasAprovadas: ReservaInterface[];
    setReservasAprovadas: React.Dispatch<React.SetStateAction<ReservaInterface[]>>;
    reservasRejeitadas: ReservaInterface[];
    setReservasRejeitadas: React.Dispatch<React.SetStateAction<ReservaInterface[]>>;
    handleCadastrarReserva: (reserva: ReservaInterface) => void;
    handleAprovarReserva: (reserva: ReservaInterface) => void;
    handleRejeitarReserva: (reserva: ReservaInterface) => void;
    handleDeleteReserva: (reserva: ReservaInterface) => void;
}

const ReservaContext = createContext<ReservaContextType | undefined>(undefined);

const ListaReservas: ReservaInterface[] = [
    {
        idQuadra: quadra.idQuadra,
        idReserva: 1,
        dataReserva: '2021-10-11',
        horaInicio: '10:00',
        horaFim: '11:00',
        status: "pending"
    },
    {
        idQuadra: quadra.idQuadra,
        idReserva: 2,
        dataReserva: '2021-10-12',
        horaInicio: '11:00',
        horaFim: '12:00',
        status: "pending"
    },
    {
        idQuadra: quadra.idQuadra,
        idReserva: 3,
        dataReserva: '2021-10-13',
        horaInicio: '12:00',
        horaFim: '13:00',
        status: "pending"
    },
    {
        idQuadra: quadra.idQuadra,
        idReserva: 4,
        dataReserva: '2021-10-14',
        horaInicio: '13:00',
        horaFim: '14:00',
        status: "pending"
    },
    {
        idQuadra: quadra.idQuadra,
        idReserva: 5,
        dataReserva: '2021-10-15',
        horaInicio: '15:00',
        horaFim: '16:00',
        status: "pending"
    },
]

//provider
export function ReservaProvider({ children }: { children: ReactNode }) {
    const [reservas, setReservas] = useState<ReservaInterface[]>([...ListaReservas]);
    const [reservasAprovadas, setReservasAprovadas] = useState<ReservaInterface[]>([]);
    const [reservasRejeitadas, setReservasRejeitadas] = useState<ReservaInterface[]>([]);

    const handleCadastrarReserva = (reserva: ReservaInterface) => {
        if (Object.values(reserva).every(value => value !== "" && value !== '0' && value !== null)) {
            setReservas((prev) => [...prev, reserva])
        }
        else console.log("Preencha todos os campos");
    }

    const handleAprovarReserva = (reserva: ReservaInterface) => {
        const isAlreadyApproved = reservasAprovadas.some(r => r.idReserva === reserva.idReserva);
        if (!isAlreadyApproved) {
            const reservaAprovada = { ...reserva, status: "approved" };

            setReservas((prev) => prev.filter(r => r.idReserva !== reserva.idReserva));
            setReservasAprovadas((prev) => [...prev, reservaAprovada]);

            console.log("Reserva aprovada:", reservaAprovada);
        }
    };

    const handleRejeitarReserva = (reserva: ReservaInterface) => {
        const isAlreadyRejected = reservasRejeitadas.some(r => r.idReserva === reserva.idReserva);
        if (!isAlreadyRejected) {
            const reservaRejeitada = { ...reserva, status: "canceled" };

            // Remove a reserva do array de reservas aprovadas
            setReservasAprovadas((prev) => prev.filter(r => r.idReserva !== reserva.idReserva));

            // Remove a reserva do array de reservas pendentes (se ainda estiver lá)
            setReservas((prev) => prev.filter(r => r.idReserva !== reserva.idReserva));

            // Adiciona a reserva ao array de rejeitadas
            setReservasRejeitadas((prev) => [...prev, reservaRejeitada]);

            console.log("Reserva rejeitada:", reservaRejeitada);
        }
    };


    const handleDeleteReserva = (reserva: ReservaInterface) => {
        setReservasRejeitadas((prev) => prev.filter(r => r.idReserva !== reserva.idReserva));
    }

    // const handleChangeStatus = (wantedReserva: ReservaInterface, status: string) => {
    //     reservas.map((reserva) => {
    //         if (reserva.idReserva === wantedReserva.idReserva) {
    //             return { ...reserva, status: status }
    //         }
    //         return reserva;
    //     })
    //     setReservas(reservas);
    // }

    return (
        <ReservaContext.Provider value={{
            reservas,
            setReservas,
            reservasAprovadas,
            setReservasAprovadas,
            handleCadastrarReserva,
            handleAprovarReserva,
            handleRejeitarReserva,
            reservasRejeitadas,
            setReservasRejeitadas,
            handleDeleteReserva
        }}>
            {children}
        </ReservaContext.Provider>
    );
}

//hook
export function useReserva() {
    const context = useContext(ReservaContext);
    if (!context) throw new Error("useReserva deve ser usado com ReservaProvider");
    return context;
}