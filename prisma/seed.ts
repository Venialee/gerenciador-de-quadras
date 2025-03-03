import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data (optional)
    await prisma.quadraRegra.deleteMany({});
    await prisma.regra.deleteMany({});
    await prisma.reserva.deleteMany({});
    await prisma.aluno.deleteMany({});
    await prisma.administrador.deleteMany({});
    await prisma.usuario.deleteMany({});
    await prisma.evento.deleteMany({});
    await prisma.quadra.deleteMany({});
    await prisma.endereco.deleteMany({});
    await prisma.cidade.deleteMany({});

    // Seed Cidades
    await prisma.cidade.createMany({
        data: [
            { idCidade: 1, nome: 'São Paulo', UF: 'SP' },
            { idCidade: 2, nome: 'Rio de Janeiro', UF: 'RJ' },
        ],
    });

    // Seed Enderecos
    await prisma.endereco.createMany({
        data: [
            { 
                idEndereco: 1, 
                idCidade: 1, 
                logradouro: 'Rua das Flores', 
                numero: 123, 
                bairro: 'Centro', 
                CEP: '01001000',
                complemento: 'Próximo ao mercado' 
            },
            { 
                idEndereco: 2, 
                idCidade: 2, 
                logradouro: 'Avenida Atlântica', 
                numero: 456, 
                bairro: 'Copacabana', 
                CEP: '22010001' 
            },
        ],
    });

    // Seed Quadras
    await prisma.quadra.createMany({
        data: [
            { 
                idQuadra: 1, 
                idEndereco: 1, 
                nome: 'Quadra Principal', 
                capacidade: 20 
            },
            { 
                idQuadra: 2, 
                idEndereco: 2, 
                nome: 'Quadra de Areia', 
                capacidade: 15 
            },
        ],
    });

    // Seed Eventos
    await prisma.evento.createMany({
        data: [
            { 
                idEvento: 1,
                nome: 'Festa na Quadra', 
                descricao: 'Festa de formatura', 
                organizador: 'João Silva' 
            },
            { 
                idEvento: 2,
                nome: 'Show de Rock', 
                descricao: 'Show beneficente', 
                organizador: 'Maria Souza' 
            },
        ],
    });

    // Seed Usuarios
    await prisma.usuario.createMany({
        data: [
            { 
                idUsuario: 1,
                telefone: 5511987654321,
                nome: 'Admin',
                sobrenome: 'User',
                email: 'admin@example.com',
                senha: '123',
                CPF: '123' 
            },
            { 
                idUsuario: 2,
                telefone: 5511912345678,
                nome: 'Aluno',
                sobrenome: 'Teste',
                email: 'aluno@example.com',
                senha: '123',
                CPF: '123' 
            },
        ],
    });

    // Seed Administrador
    await prisma.administrador.create({
        data: {
            idAdministrador: 1,
            chaveAcesso: '123'
        }
    });

    // Seed Aluno
    await prisma.aluno.create({
        data: {
            idAluno: 2,
            matricula: '20240001'
        }
    });

    // Seed Regras
    await prisma.regra.createMany({
        data: [
            { 
                idRegra: 1,
                nome: 'Sem animais', 
                descricao: 'Proibida a entrada de animais de estimação' 
            },
            { 
                idRegra: 2,
                nome: 'Calçado apropriado', 
                descricao: 'Obrigatório uso de calçados esportivos' 
            },
            { 
                idRegra: 3,
                nome: 'Horário limite', 
                descricao: 'Funcionamento até 22h' 
            },
        ],
    });

    // Seed QuadraRegra
    await prisma.quadraRegra.createMany({
        data: [
            { idRegra: 1, idQuadra: 1 },
            { idRegra: 2, idQuadra: 1 },
            { idRegra: 3, idQuadra: 1 },
            { idRegra: 2, idQuadra: 2 },
            { idRegra: 3, idQuadra: 2 },
        ],
    });

    // Seed Reservas
    await prisma.reserva.createMany({
        data: [
            { 
                idQuadra: 1,
                idUsuario: 2,
                dataReserva: new Date('2024-03-20'),
                horaInicio: new Date('1970-01-01T09:00:00'),
                horaFim: new Date('1970-01-01T11:00:00'),
                status: 1,
                idEvento: 1
            },
            { 
                idQuadra: 2,
                idUsuario: 2,
                dataReserva: new Date('2024-03-21'),
                horaInicio: new Date('1970-01-01T14:00:00'),
                horaFim: new Date('1970-01-01T16:00:00'),
                status: 0
            },
        ],
    });

    console.log('Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });