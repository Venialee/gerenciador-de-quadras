'use client'

import Box from "@/components/Box";
import Button from "@/components/Button";
import GenericInput from "@/components/GenericInput";
import { useState } from "react";

export interface ReservaInterface {
    idReserva: number,
    idQuadra: number,
    dataReserva: string,
    horaInicio: number,
    horafim: number,
    status: string
}

export default function AdminPage() {

    const [inputNome, setinputNome] = useState<string>("");
    const [inputCapacidade, setInputCapacidade] = useState<number>(0);
    const [endereco, setEndereco] = useState({
        logradouro: "",
        bairro: "",
        cep: "",
        numero: "",
        complemento: "",
        idCidade: ""
    })

    const resetFileds = () => {
        setinputNome("");
        setInputCapacidade(0);
        setEndereco({
            logradouro: "",
            bairro: "",
            cep: "",
            numero: "",
            complemento: "",
            idCidade: ""
        })
    }

    const [data, setData] = useState<string>("");
    const [horaInicio, setHoraInicio] = useState<number>(0);
    const [horaFim, setHoraFim] = useState<number>(0);
    const [reservas, setReservas] = useState<ReservaInterface[]>([]);

    const handleClick = () => {
        const reserva: ReservaInterface = {
            idQuadra: 1,
            idReserva: reservas.length + 1,
            dataReserva: data,
            horaInicio: horaInicio,
            horafim: horaFim,
            status: 'pending'
        }
        setReservas((prev) => [...prev, reserva]);
        console.log("Quadras cadastradas:", [...reservas, reserva]);
        resetFileds();
    }

    return (
        <>
            <Box>
                <GenericInput type="date" label="Data" value={data} onChange={setData} />
                <GenericInput type="time" label="Hora Inicio" value={horaInicio} onChange={setHoraInicio} />
                <GenericInput type="time" label="Hora Fim" value={horaFim} onChange={setHoraFim} />
                <Button content="Reservar" onClick={() => handleClick()} />
            </Box>
        </>
    )
}
