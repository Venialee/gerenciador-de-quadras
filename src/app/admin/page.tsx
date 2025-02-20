'use client'

import Box from "@/components/Box";
import Button from "@/components/Button";
import GenericInput from "@/components/GenericInput";
import { useState } from "react";
//import CampiSelector from "@/components/GenericSelector";

export interface ReservaInterface {
    idReserva: number,
    idQuadra: number,
    //idEvento: number,
    //idAdmin: number,
    //idUsuario: number,
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

    const [vetorQuadra, setVetorQuadra] = useState<{ nome: string, capacidade: number }[]>([]);
    const [vetorEndereco, setVetorEndereco] = useState<{
        logradouro: string,
        bairro: string,
        cep: string,
        numero: string,
        complemento: string,
        idCidade: string
    }[]>([]);

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

    const handleEnderecoChange = (field: string, value: string) => {
        setEndereco((prev) => ({ ...prev, [field]: value }));
    };

    const handleCadastrarQuadra = () => {
        const novaQuadra = {
            nome: inputNome,
            capacidade: inputCapacidade
        }

        const novoEndereco = { ...endereco }

        setVetorQuadra((prev) => [...prev, novaQuadra]);
        setVetorEndereco((prev) => [...prev, novoEndereco]);

        console.log("Quadras cadastradas:", [...vetorQuadra, novaQuadra]);
        console.log("Endereços cadastrados:", [...vetorEndereco, novoEndereco]);

        resetFileds();
    }

    const [data, setData] = useState<string>("");
    const [horaInicio, setHoraInicio] = useState<number>(0);
    const [horaFim, setHoraFim] = useState<number>(0);
    const [status, setStatus] = useState<string>("");
    const [reservas, setReservas] = useState<ReservaInterface[]>([]);

    const handleClick = () => {
        const reserva: ReservaInterface = {
            idQuadra: 1,
            idReserva: reservas.length + 1,
            dataReserva: data,
            horaInicio: horaInicio,
            horafim: horaFim,
            status: status
        }
        setReservas((prev) => [...prev, reserva]);
        console.log("Quadras cadastradas:", [...reservas, reserva]);
    }

    return (
        <>
            <Box>
            <h1>Registrar Reserva</h1>
            <div>
                <Button content="Cadastrar Quadra" onClick={() => handleCadastrarQuadra()} />
            </div>
        </Box>
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
