export interface QuadraInterface {
    idQuadra: number;
    idEndereco: number;
    nome: string;
    capacidade: number;
}

export interface UsuarioInterface {
    idUsuario: number;
    idTelefone: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
}

export interface ReservaInterface {
    idReserva: number,
    idQuadra: number,
    //idEvento: number,
    //idAdmin: number,
    //idUsuario: number,
    dataReserva: string,
    horaInicio: string,
    horaFim: string,
    status: string
}