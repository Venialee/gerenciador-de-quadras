'use client';

import { useState } from "react";
import { quadra } from "../utils/quadra";
import { ReservaInterface } from "@/@types/types";
import { useReserva } from "@/context/ReservaContext";

import Box from "@/components/Box";
import Button from "@/components/Button";
import GenericInput from "@/components/GenericInput";
import TableList from "@/components/TableList";

export default function AdminPage() {
    const [data, setData] = useState<string>("");
    const [horaInicio, setHoraInicio] = useState<number>(0);
    const [horaFim, setHoraFim] = useState<number>(0);

    const {
        reservas,
        reservasAprovadas,
        reservasRejeitadas,
        handleCadastrarReserva
    } = useReserva();

    const handleClick = () => {
        const newReserva: ReservaInterface = {
            idQuadra: quadra.idQuadra,
            idReserva: reservas.length + 1,
            dataReserva: data,
            horaInicio: horaInicio.toString(),
            horaFim: horaInicio.toString(),
            status: "pending"
        }
        handleCadastrarReserva(newReserva);
        console.log("Quadras cadastradas:", [...reservas, newReserva]);
        resetFileds();
    }

    const resetFileds = () => {
        setHoraFim(0);
        setHoraInicio(0);
        setData("");
    }

    return (
        <>
            <h1>Reservar Quadra</h1>
            <Box>
                <GenericInput type="text" label="Data" value={data} onChange={setData} />
                <GenericInput type="number" label="Hora Inicio" value={horaInicio} onChange={setHoraInicio} />
                <GenericInput type="number" label="Hora Fim" value={horaFim} onChange={setHoraFim} />
                <Button content="Reservar" onClick={() => handleClick()} />
            </Box>
            <div className="flex flex-row">
                <div>
                    <h2>Reservas Pendentes</h2>
                    <TableList tables={reservas.map(reserva => ({ reserva }))} />
                </div>
                <div>
                    <h2>Reservas Aprovadas</h2>
                    <TableList tables={reservasAprovadas.map(reserva => ({ reserva }))} />
                </div>
                <div>
                    <h2>Reservas Rejeitadas</h2>
                    <TableList tables={reservasRejeitadas.map(reserva => ({ reserva }))} />
                </div>
            </div>
        </>
    )
}
