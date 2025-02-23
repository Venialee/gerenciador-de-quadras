'use client'

import { useReserva } from "@/context/ReservaContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";

export default function ({ params }: { params: Promise<{ id: string }> }) {
    const { reservasPendentes, handleAlterarStatusReserva } = useReserva();
    const router = useRouter();

    const { id } = use(params);

    const reserva = reservasPendentes.find(reserva => reserva.idreserva === Number(id));

    const [novaData, setNovaData] = useState(reserva?.dataReserva || "");
    const [novaHoraInicio, setNovaHoraInicio] = useState(reserva?.horaInicio || "");
    const [novaHoraFim, setNovaHoraFim] = useState(reserva?.horaFim || "");

    useEffect(() => {
        if (reserva) {
            setNovaData(reserva.dataReserva);
            setNovaHoraInicio(reserva.horaInicio);
            setNovaHoraFim(reserva.horaFim);
        }
    }, [reserva]);

    const handleSubmit = async () => {
        if (!reserva) return;

        const updatedReserva = {
            ...reserva,
            dataReserva: novaData,
            horaInicio: novaHoraInicio,
            horaFim: novaHoraFim,
        };

        console.log("Enviando reserva para atualização:", updatedReserva); // 👈 Debug

        try {
            const res = await fetch(`/api/reserva/${reserva.idreserva}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedReserva), // Certifique-se de que isso não é null
            });

            if (!res.ok) {
                throw new Error("Erro ao atualizar reserva");
            }

            handleAlterarStatusReserva(reserva, reserva.status);
            alert("Reserva atualizada com sucesso!");
            router.back();
        } catch (error) {
            console.error("Erro ao atualizar reserva:", error);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Editar Reserva</h2>
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
                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Salvar</button>
                    <button onClick={() => router.back()} className="bg-red-500 text-white px-4 py-2 rounded">Cancelar</button>
                </div>
            </div>
        </div>
    );
}
