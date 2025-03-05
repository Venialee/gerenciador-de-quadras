'use client'

import GenericInput from "@/components/GenericInput";
import { useReserva } from "@/context/ReservaContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";

export default function ({ params }: { params: Promise<{ id: string }> }) {
    const { reservasPendentes } = useReserva();
    const router = useRouter();

    const { id } = use(params);

    const reserva = reservasPendentes.find(reserva => reserva.idReserva === Number(id));
    const [novaData, setNovaData] = useState(reserva?.dataReserva || "");
    const [novaHoraInicio, setNovaHoraInicio] = useState(reserva?.horaInicio || "");
    const [novaHoraFim, setNovaHoraFim] = useState(reserva?.horaFim || "");
    const [novoNomeEvento, setNovoNomeEvento] = useState(reserva?.evento?.nome );
    const [novaDescricao, setnovaDescricao] = useState(reserva?.evento?.descricao );
    const [novoOrganizador, setnovoOrganizador] = useState(reserva?.evento?.organizador );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const hasEvents = novoNomeEvento || novaDescricao || novoOrganizador;

    useEffect(() => {
        if (reserva) {
            const formatDate = (date: Date) => date.toISOString().split('T')[0];
            const formatTime = (date: Date) => date.toISOString().split('T')[1].substring(0, 5);
            setNovaData(formatDate(new Date(reserva.dataReserva )));
            setNovaHoraInicio(formatTime( new Date(reserva.horaInicio)));
            setNovaHoraFim(formatTime( new Date(reserva.horaFim)));
            setNovoNomeEvento(reserva?.evento?.nome)
            setnovaDescricao(reserva?.evento?.descricao)
            setnovoOrganizador(reserva?.evento?.organizador)
            
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
                    evento : {
                        nome: novoNomeEvento || null,
                        descricao: novaDescricao || null,
                        organizador: novoOrganizador || null
                    } 
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
        <div className="min-h-screen flex justify-center items-center bg-darkBlue bg-[url('/logomarca_fundo.svg')] bg-center bg-no-repeat">
            <div className="bg-backgroundYellow p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-darkBlue mb-4">Editar Reserva</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <GenericInput
                    label="Data"
                    type="date"
                    value={novaData}
                    onChange={setNovaData}
                    icon={<img src="/calendar.svg" alt="Ícone de nome" className="h-5 w-5 text-darkBlue" />}
                    mandatory
                    variant="editReserva"
                />
                <GenericInput
                    label="Hora Início"
                    type="time"
                    value={novaHoraInicio}
                    onChange={setNovaHoraInicio}
                    icon={<img src="/clock.svg" alt="Ícone de nome" className="h-5 w-5 text-darkBlue" />}
                    mandatory
                    variant="editReserva"
                />
                <GenericInput
                    label="Hora Fim"
                    type="time"
                    value={novaHoraFim}
                    onChange={setNovaHoraFim}
                    icon={<img src="/clock.svg" alt="Ícone de nome" className="h-5 w-5 text-darkBlue" />}
                    mandatory
                    variant="editReserva"
                />
  <div className="p-4">
            {!hasEvents ? (
                <p className="text-gray-500">voice nao cadastrou eventos</p>
            ) : (
                <>
                    <GenericInput
                        label="Nome evento"
                        type="text"
                        value={novoNomeEvento || ''}
                        onChange={setNovoNomeEvento}
                        icon={<img src="/message.svg" alt="Ícone de nome" className="h-5 w-5 text-darkBlue" />}
                        mandatory
                        variant="editReserva"
                    />
                    <GenericInput
                        label="Descrição evento"
                        type="text"
                        value={novaDescricao|| ''}
                        onChange={setnovaDescricao}
                        icon={<img src="/message.svg" alt="Ícone de descrição" className="h-5 w-5 text-darkBlue" />}
                        mandatory
                        variant="editReserva"
                    />
                    <GenericInput
                        label="Organizador evento"
                        type="text"
                        value={novoOrganizador|| ''}
                        onChange={setnovoOrganizador}
                        icon={<img src="/message.svg" alt="Ícone de organizador" className="h-5 w-5 text-darkBlue" />}
                        mandatory
                        variant="editReserva"
                    />
                </>
            )}
        </div>
                <div className="flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className={`bg-darkBlue text-white px-8 py-2 rounded-lg font-bold ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                        onClick={() => router.back()}
                        className="bg-darkOrange text-white px-8 py-2 rounded-lg font-bold"
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}