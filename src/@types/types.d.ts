export interface QuadraInterface {
    idQuadra: number;
    idEndereco: number;
    nome: string;
    capacidade: number;
}

export interface reservaInterface {
    idReserva: number;
    idQuadra: number;
    idEvento: number;
    idAdmin: number;
    idUsuario: number;
    //Rever os tipos abaixo
    dataReserva: string;
    horaInicio: string;
    horaFim: string;
    status: string;
}