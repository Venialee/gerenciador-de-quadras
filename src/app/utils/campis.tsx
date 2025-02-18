import { QuadraInterface } from "@/@types/types";

// export const campis = [
//     { id: 1, UF: "ES", cidade: "Vitória" },
//     { id: 2, UF: "ES", cidade: "Alegre" },
//     { id: 3, UF: "ES", cidade: "São Mateus" }
// ];

export const vetorQuadras: Array<QuadraInterface> = [];

export const quadra: QuadraInterface = {
    idQuadra: vetorQuadras.length + 1,
    idEndereco: 1,
    nome: "Quadra Alegre",
    capacidade: 1000,
}