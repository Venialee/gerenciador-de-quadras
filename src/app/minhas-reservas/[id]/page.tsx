
'use client'

import { useReserva } from "@/context/ReservaContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";

export default function ({ params }: { params: Promise<{ id: string }> }) {
    const { reservasPendentes } = useReserva();
    const router = useRouter();

    const { id } = use(params);

    const reserva = reservasPendentes.find(reserva => reserva.idReserva === Number(id));
    console.log('rv',reserva)
    const [novaData, setNovaData] = useState(reserva?.dataReserva || "");
    const [novaHoraInicio, setNovaHoraInicio] = useState(reserva?.horaInicio || "");
    const [novaHoraFim, setNovaHoraFim] = useState(reserva?.horaFim || "");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // dayjs.extend(utc);

    // function formatTime(time: string) {
    //     return dayjs.utc(`1970-01-01 ${time}`, 'YYYY-MM-DD HH:mm').toISOString();
    // }

    // function formatDate(date: string) {
    //     return dayjs.utc(date, 'DD/MM/YYYY').toISOString();
    // }

    useEffect(() => {
        if (reserva) {
            setNovaData(reserva.dataReserva);
            setNovaHoraInicio(reserva.horaInicio);
            setNovaHoraFim(reserva.horaFim);
        }
    }, [reserva]);

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            setError("");

            if (!novaData || !novaHoraInicio || !novaHoraFim) {
                setError("Todos os campos são obrigatórios");
                setIsLoading(false);
                return;
            }

            if (novaHoraInicio >= novaHoraFim) {
                setError("A hora de fim deve ser posterior à hora de início");
                setIsLoading(false);
                return;
            }

            const response = await fetch(`/api/reservas-pendentes/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dataReserva: novaData,
                    horaInicio: novaHoraInicio,
                    horaFim: novaHoraFim,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Erro ao atualizar reserva");
            }

            window.location.href = "/minhas-reservas";
            router.refresh();

        } catch (error) {
            console.error("Erro ao salvar edição da reserva:", error);
            setError(error instanceof Error ? error.message : "Erro desconhecido ao salvar reserva");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Editar Reserva</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <label className="block mb-2">
                    Data:
                    <input type="date" className="border p-2 w-full" value={novaData} onChange={(e) => setNovaData(e.target.value)} />
                </label>
                <label className="block mb-2">
                    Hora Início:
                    <input type="time" className="border p-2 w-full" value={novaHoraInicio} onChange={(e) => setNovaHoraInicio(e.target.value)} />
                </label>
                <label className="block mb-4">
                    Hora Fim:
                    <input type="time" className="border p-2 w-full" value={novaHoraFim} onChange={(e) => setNovaHoraFim(e.target.value)} />
                </label>
                <div className="flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className={`bg-green-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

