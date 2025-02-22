import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const usuarios = await prisma.usuario.findMany();

    const usuariosComTelefone = usuarios.map(usuario => ({
        ...usuario,
        telefone: usuario.telefone.toString()
    }));

    return NextResponse.json(usuariosComTelefone);
}

export async function POST(req: NextRequest) {
    try {
        const {
            nome,
            sobrenome,
            email,
            senha,
            CPF,
            telefone,
            matricula
        } = await req.json();

        if (!nome || !sobrenome || !email || !senha || !CPF || !telefone) {
            return NextResponse.json({ message: "Todos os campos são obrigatórios" }, { status: 400 });
        }

        if (typeof telefone !== "string" || !/^\d+$/.test(telefone)) {
            return NextResponse.json({ message: "Número de telefone inválido" }, { status: 400 });
        }

        const telefoneBigInt = BigInt(telefone);

        const novoUsuario = await prisma.usuario.create({
            data: {
                nome,
                sobrenome,
                email,
                senha,
                CPF,
                telefone: telefoneBigInt
            }
        });

        let novoAluno = null;

        if (matricula) {
            novoAluno = await prisma.aluno.create({
                data: {
                    matricula: matricula,
                    idAluno: novoUsuario.idUsuario
                }
            });
        }

        const responseUsuario = {
            ...novoUsuario,
            telefone: novoUsuario.telefone.toString()
        };

        return NextResponse.json({
            usuario: responseUsuario,
            aluno: novoAluno
        }, { status: 201 });
    }
    catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
    }
}