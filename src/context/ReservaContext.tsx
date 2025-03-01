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
            const databaseReservas = await fetchAllReservasFromDB();

            const pendentes = await fetchReservasPendentesFromDB();
            const aprovadas = await fetchReservasAprovadasFromDB();
            const canceladas = await fetchReservasCanceladasFromDB();

            setReservasPendentes(pendentes);
            setReservasAprovadas(aprovadas);
            setReservasCanceladas(canceladas);

            console.log("Reservas recebidas do banco:", databaseReservas);
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
            window.alert("Reserva cadastrada com sucesso");

            setReservasPendentes((prev) => [...prev, reservaCriada]);

        } catch (error) {
            console.error("Erro ao cadastrar reserva:", error);
            window.alert("Erro ao cadastrar reserva");
        }
    };

    const handleDeleteReserva = async (reserva: ReservaInterface) => {
        try {
            const res = await fetch(`/api/reserva/${reserva.idreserva}`, {
                method: 'DELETE',
            })

            const data = await res.json();

            if (res.ok) {
                console.log("Reserva deletada com sucesso", data);
                setReservasPendentes((prev) => prev.filter((r) => r.idreserva !== reserva.idreserva));
                setReservasAprovadas((prev) => prev.filter((r) => r.idreserva !== reserva.idreserva));
                setReservasCanceladas((prev) => prev.filter((r) => r.idreserva !== reserva.idreserva));
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
        if (!reserva || !reserva.idreserva) {
            console.error("Erro: ID da reserva não informado corretamente.");
            return;
        }

        const idreserva = reserva.idreserva;
        console.log("ID da reserva recebido:", idreserva);

        try {
            const response = await fetch(`/api/reserva/${idreserva}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idreserva, status }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Caso específico para conflito de horários (código 409)
                if (response.status === 409) {
                    // Aqui você pode mostrar uma mensagem de erro ou um toast para o usuário
                    console.error('Conflito de horário:', data.message);
                    // Se estiver usando alguma biblioteca de notificação como react-toastify:
                    // toast.error('Não é possível aprovar: já existe uma reserva neste horário');
                    alert('Não é possível aprovar: já existe uma reserva neste horário');
                    return;
                }
                throw new Error(data.message);
            }

            console.log('Reserva atualizada:', data);

            if (status === 1) {
                setReservasPendentes((prev) => prev.filter((r) => r.idreserva !== idreserva));
                setReservasAprovadas((prev) => [...prev, { ...reserva, status }]);
            }
            else if (status === 2) {
                setReservasPendentes((prev) => prev.filter((r) => r.idreserva !== idreserva));
                setReservasCanceladas((prev) => [...prev, { ...reserva, status }]);
            }
        } catch (error) {
            console.error('Erro ao atualizar reserva:', error);
            // Aqui você pode mostrar uma mensagem de erro genérica
            alert('Erro ao atualizar reserva');
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