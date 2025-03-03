'use client';

import { useState } from "react";
import { useReserva } from "@/context/ReservaContext";

import Box from "@/components/Box";
import Button from "@/components/Button";
import GenericInput from "@/components/GenericInput";
import RegrasPopup from "@/components/RegrasPopUp";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUsers } from '@/context/UserContext';

export default function Reservas() {
    const [data, setData] = useState<string>("");
    const [horaInicio, setHoraInicio] = useState<string>("");
    const [horaFim, setHoraFim] = useState<string>("");
    const [nomeEvento, setNomeEvento] = useState<string>("");
    const [descricaoEvento, setDescricaoEvento] = useState<string>("");
    const [organizadorEvento, setOrganizadorEvento] = useState<string>("");
    const [mostrarPopup, setMostrarPopup] = useState(false);
    const { currentUser } = useUsers();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push('/login');
        }
    }, [currentUser, router]);

    const {
        handleCadastrarReserva
    } = useReserva();

    const handleClick = async () => {
        const localStorageUser = localStorage.getItem("currentUser");

        if (localStorageUser) {
            const user = JSON.parse(localStorageUser);

            const newReserva = {
                idQuadra: 1,
                idUsuario: user.idUsuario,
                dataReserva: data,
                horaInicio: horaInicio,
                horaFim: horaFim,
                status: 0,
                nomeEvento: nomeEvento || null,
                descricaoEvento: descricaoEvento || null,
                organizadorEvento: organizadorEvento || null,
            };

            await handleCadastrarReserva(newReserva);

            resetFileds();
        }
    };

    const resetFileds = () => {
        setHoraFim("");
        setHoraInicio("");
        setData("");
        setDescricaoEvento("");
        setNomeEvento("");
        setOrganizadorEvento("");
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-darkBlue bg-[url('/logomarca_fundo.svg')] bg-center bg-no-repeat">
                <div className="flex flex-col items-center w-full max-w-md p-8 rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
                    <div className="flex flex-col w-full">
                        <GenericInput type="date" label="" value={data} onChange={setData} placeholder="Data" icon={<img src="/calendar.svg" alt="Ícone de data" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="time" label="" value={horaInicio} onChange={setHoraInicio} placeholder="Hora Inicio" icon={<img src="/clock.svg" alt="Ícone de hora inicio" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="time" label="" value={horaFim} onChange={setHoraFim} placeholder="Hora Fim" icon={<img src="/clock.svg" alt="Ícone de hora fim" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="text" label="" value={nomeEvento} onChange={setNomeEvento} placeholder="Nome do Evento" icon={<img src="/calendar-day.svg" alt="Ícone de evento" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="text" label="" value={descricaoEvento} onChange={setDescricaoEvento} placeholder="Descrição do Evento" icon={<img src="/message.svg" alt="Ícone de descrição" className="h-5 w-5 text-darkBlue" />} />
                        <GenericInput type="text" label="" value={organizadorEvento} onChange={setOrganizadorEvento} placeholder="Organizador do Evento" icon={<img src="/perfil.svg" alt="Ícone de organizador" className="h-5 w-5 text-darkBlue" />} />
                        <div>
                            <button onClick={() => setMostrarPopup(true)} className="text-complementYellow p-0 m-0">
                                Conferir regras da quadra
                            </button>
                            {mostrarPopup && <RegrasPopup onClose={() => setMostrarPopup(false)} />}
                        </div>
                        <Button content="Reservar" onClick={() => handleClick()} />
                    </div>
                </div>
            </div>
        </>
    )
}
