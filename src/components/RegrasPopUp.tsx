'use client'

import { Regra } from "@prisma/client";
import { useEffect, useState } from "react";

export interface Rgerainterface {
    idRegra: number;
    nome: string;
    descricao: string;
}

export default function RegrasPopup({ onClose }: { onClose: () => void }) {
    const [regras, setRegras] = useState<Regra[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRegras = async () => {
            try {
                const response = await fetch("/api/regras");
                if (!response.ok) throw new Error("Erro ao buscar regras");
                const data: Regra[] = await response.json();
                setRegras(data);
            } catch (err) {
                setError("Não foi possível carregar as regras.");
            } finally {
                setLoading(false);
            }
        };
        fetchRegras();
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4">Regras da Quadra</h2>

                {loading && <p>Carregando...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <ul className="space-y-2 max-h-60 overflow-y-auto">
                    {regras.map((regra) => (
                        <li key={regra.idRegra} className="border-b pb-2">
                            <h3 className="font-semibold">{regra.nome}</h3>
                            <p className="text-gray-600 text-sm">{regra.descricao}</p>
                        </li>
                    ))}
                </ul>

                <button onClick={onClose} className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                    Fechar
                </button>
            </div>
        </div>
    )
}