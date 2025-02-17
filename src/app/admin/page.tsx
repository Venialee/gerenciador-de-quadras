'use client'

import Box from "@/components/Box";
import Button from "@/components/Button";
import GenericInput from "@/components/GenericInput";
import { useState } from "react";
//import CampiSelector from "@/components/GenericSelector";

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

    const getIdCidade = () => {
        const cidade = document.getElementById("qInputIdCidade") as HTMLInputElement;
        return cidade.value
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

    return (
        <Box>
            <h1>Registrar Quadra</h1>
            <div className="py-4">
                <GenericInput
                    id="qInputNome"
                    label="Nome"
                    type="text"
                    value={inputNome}
                    onChange={setinputNome}
                />
                <GenericInput
                    id="qInputCapacidade"
                    label="Capacidade"
                    type="number"
                    value={inputCapacidade}
                    onChange={setInputCapacidade}
                />
                <GenericInput id="qInputLogradouro"
                    label="Logradouro"
                    type="text"
                    value={endereco.logradouro}
                    onChange={(value) => handleEnderecoChange("logradouro", value)} />
                <GenericInput id="qInputBairro"
                    label="Bairro"
                    type="text"
                    value={endereco.bairro}
                    onChange={(value) => handleEnderecoChange("bairro", value)} />
                <GenericInput id="qInputCep"
                    label="CEP"
                    type="text"
                    value={endereco.cep}
                    onChange={(value) => handleEnderecoChange("cep", value)} />
                <GenericInput
                    id="qInputNumero"
                    label="Número"
                    type="text"
                    value={endereco.numero}
                    onChange={(value) => handleEnderecoChange("numero", value)} />
                <GenericInput
                    id="qInputComplemento"
                    label="Complemento"
                    type="text"
                    value={endereco.complemento}
                    onChange={(value) => handleEnderecoChange("complemento", value)} />
                <GenericInput
                    id="qInputIdCidade"
                    label="ID da Cidade"
                    type="text"
                    value={endereco.idCidade}
                    onChange={(value) => handleEnderecoChange("idCidade", value)} />
                {/* <CampiSelector onChange={() => { }} /> */}
            </div>
            <div>
                <Button content="Cadastrar Quadra" onClick={() => handleCadastrarQuadra()} />
            </div>
        </Box>
    )
}
