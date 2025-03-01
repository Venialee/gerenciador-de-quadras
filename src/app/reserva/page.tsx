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
                idUsuario: user.usuario.idUsuario,
                dataReserva: data,
                horaInicio: horaInicio,
                horaFim: horaFim,
                status: 0,
                nomeEvento: nomeEvento,
                descricaoEvento: descricaoEvento,
                organizadorEvento: organizadorEvento,
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
            <h1>Reservar Quadra</h1>
            <Box>
                <GenericInput type="date" label="Data" mandatory={true} value={data} onChange={setData} />
                <GenericInput type="time" label="Hora Inicio" mandatory={true} value={horaInicio} onChange={setHoraInicio} />
                <GenericInput type="time" label="Hora Fim" mandatory={true} value={horaFim} onChange={setHoraFim} />
                <GenericInput type="text" label="Nome do Evento" value={nomeEvento} onChange={setNomeEvento} />
                <GenericInput type="text" label="Descrição do Evento" value={descricaoEvento} onChange={setDescricaoEvento} />
                <GenericInput type="text" label="Organizador do Evento" value={organizadorEvento} onChange={setOrganizadorEvento} />
                <div>
                    <button
                        onClick={() => setMostrarPopup(true)}
                        className="text-red-500 p-0 m-0"
                    >
                        Conferir regras da quadra
                    </button>

                    {mostrarPopup && <RegrasPopup onClose={() => setMostrarPopup(false)} />}
                </div>
                <Button content="Reservar" onClick={() => handleClick()} />
            </Box>
        </>
    )
}
