export interface QuadraInterface {
    idQuadra: number;
    idEndereco: number;
    nome: string;
    capacidade: number;
}
export interface UsuarioInterface {
    idUsuario: number;
    telefone: bigint;
    nome: string;
    email: string;
    senha: string;
    CPF: string;
}

export interface AdminInterface {
    idAdmin: number;
    chaveDeAcesso: string;
}

export interface AlunoInterface {
    idAluno: number;
    matricula: number;
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