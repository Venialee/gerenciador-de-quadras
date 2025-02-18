'use client'

import Box from "@/components/Box";
import Button from "@/components/Button";
import GenericInput from "@/components/GenericInput";
import { useState } from "react";

import { ReservaInterface } from "@/@types/types";

export default function AdminPage() {
    const [data, setData] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [horaInicio, setHoraInicio] = useState<number>(0);
    const [horaFim, setHoraFim] = useState<number>(0);
    const [reservas, setReservas] = useState<ReservaInterface[]>([]);

    const handleClick = () => {
        const reserva: ReservaInterface = {
            idQuadra: 1,
            idReserva: reservas.length + 1,
            dataReserva: data,
            horaInicio: horaInicio,
            horaFim: horaFim,
            status: "pendente"
        }
        setReservas((prev) => [...prev, reserva]);
        console.log("Quadras cadastradas:", [...reservas, reserva]);
        resetFileds();
    }

    const resetFileds = () => {
        setHoraFim(0);
        setHoraInicio(0);
        setStatus("");
        setData("");
    }

    return (
        <>
        <h1>Reservar Quadra</h1>
        <Box>
            <GenericInput type="text" label="Data" value={data} onChange={setData} />
            <GenericInput type="number" label="Hora Inicio" value={horaInicio} onChange={setHoraInicio} />
            <GenericInput type="number" label="Hora Fim" value={horaFim} onChange={setHoraFim} />
            <GenericInput type="text" label="Status" value={status} onChange={setStatus} />
            <Button content="Reservar" onClick={() => handleClick()} />
         </Box>
        </>
    )
}
