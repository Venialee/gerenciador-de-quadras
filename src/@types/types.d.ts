export interface QuadraInterface {
    idQuadra: number;
    idEndereco: number;
    nome: string;
    capacidade: number;
}
export interface UsuarioInterface {
    idUsuario?: number;
    telefone: string;
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
    CPF: string;
    tipo?: string;
}

export interface AdminInterface {
    idAdmin: number;
    chaveDeAcesso: string;
}

export interface AlunoInterface {
    idAluno: number;
    matricula: number | string;
}

export interface ReservaInterface {
    idreserva?: number,
    idQuadra: number,
    idEvento?: number,
    idUsuario: number,
    dataReserva: string,
    horaInicio: string,
    horaFim: string,
    status: number,
    evento?: {
        nome: string,
        descricao: string,
        organizador: string
    }
}