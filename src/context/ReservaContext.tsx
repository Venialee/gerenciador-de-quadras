'use client';

import {
    fetchAllReservasFromDB,
    fetchReservasAprovadasFromDB,
    fetchReservasCanceladasFromDB,
    fetchReservasPendentesFromDB
} from "@/lib/quadraService";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ReservaInterface } from "@/@types/types";

interface ReservaContextType {
    reservasPendentes: ReservaInterface[];
    reservasAprovadas: ReservaInterface[];
    reservasCanceladas: ReservaInterface[];
    setReservasPendentes: (reservas: ReservaInterface[]) => void;
    setReservasAprovadas: (reservas: ReservaInterface[]) => void;
    setReservasCanceladas: (reservas: ReservaInterface[]) => void;
    handleCadastrarReserva: (reserva: ReservaInterface) => void;
    handleDeleteReserva: (reserva: ReservaInterface) => void;
    handleAlterarStatusReserva: (reserva: ReservaInterface, status: number) => void;
    atualizarReservas(): void
}

const ReservaContext = createContext<ReservaContextType | undefined>(undefined);

export function ReservaProvider({ children }: { children: ReactNode }) {
    const [reservasPendentes, setReservasPendentes] = useState<ReservaInterface[]>([]);
    const [reservasAprovadas, setReservasAprovadas] = useState<ReservaInterface[]>([]);
    const [reservasCanceladas, setReservasCanceladas] = useState<ReservaInterface[]>([]);
    useEffect(() => {
        const fetchReservas = async () => {
            const pendentes = await fetchReservasPendentesFromDB();
            const aprovadas = await fetchReservasAprovadasFromDB();
            const canceladas = await fetchReservasCanceladasFromDB();

            setReservasPendentes(pendentes);
            setReservasAprovadas(aprovadas);
            setReservasCanceladas(canceladas);

        };

        fetchReservas();
    }, []);

    const handleCadastrarReserva = async (novaReserva: ReservaInterface) => {
        try {
            const res = await fetch("/api/reserva", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },  
                body: JSON.stringify(novaReserva),
            });

            if (!res.ok) {
                throw new Error("Erro ao cadastrar reserva");
            }

            const reservaCriada = await res.json();
            console.log("Reserva criada com sucesso:", reservaCriada);

            setReservasPendentes((prev) => [...prev, reservaCriada]);

        } catch (error) {
            console.error("Erro ao cadastrar reserva:", error);
        }
    };
  
    const handleDeleteReserva = async (reserva: ReservaInterface) => {
        try {
            const res = await fetch(`/api/reserva/${reserva.idReserva}`, {
                method: 'DELETE',
            })

            const data = await res.json();

            if (res.ok) {
                console.log("Reserva deletada com sucesso", data);
                setReservasPendentes((prev) => prev.filter((r) => r.idReserva !== reserva.idReserva));
                setReservasAprovadas((prev) => prev.filter((r) => r.idReserva !== reserva.idReserva));
                setReservasCanceladas((prev) => prev.filter((r) => r.idReserva !== reserva.idReserva));
            } else {
                console.error("Erro ao deletar reserva", data);
                return null;
            }
        }
        catch (error) {
            console.error("Erro ao deletar reserva", error);
            return null;
        }
    }

    const handleAlterarStatusReserva = async (reserva: ReservaInterface, status: number) => {
        if (!reserva || !reserva.idReserva) {
            console.error("Erro: ID da reserva não informado corretamente.");
            return;
        }

        const idreserva = reserva.idReserva;
        console.log("ID da reserva recebido:", idreserva);

        try {
            const response = await fetch(`/api/reserva/${idreserva}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reserva, idreserva, status }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            console.log('Reserva atualizada:', data);

            if (status === 1) {
                setReservasPendentes((prev) => prev.filter((r) => r.idReserva !== idreserva));
                setReservasAprovadas((prev) => [...prev, { ...reserva, status }]);
            }
            else if (status === 2) {
                setReservasPendentes((prev) => prev.filter((r) => r.idReserva !== idreserva));
                setReservasCanceladas((prev) => [...prev, { ...reserva, status }]);
            }
        } catch (error) {
            console.error('Erro ao atualizar reserva:', error);
        }
    };

    const atualizarReservas = async () => {
        const res = await fetch("/api/reserva");
        const data = await res.json();
        setReservasPendentes(data);
    };


    return (
        <ReservaContext.Provider value={{
            reservasPendentes,
            reservasAprovadas,
            reservasCanceladas,
            setReservasPendentes,
            setReservasAprovadas,
            setReservasCanceladas,
            handleCadastrarReserva,
            handleDeleteReserva,
            handleAlterarStatusReserva,
            atualizarReservas
        }}>
            {children}
        </ReservaContext.Provider>
    );
}

export function useReserva() {
    const context = useContext(ReservaContext);
    if (!context) throw new Error("useReserva deve ser usado com ReservaProvider");
    return context;
}