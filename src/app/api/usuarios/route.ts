import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const usuarios = await prisma.usuario.findMany();

    const usuariosComTelefone = usuarios.map(usuario => ({
        ...usuario,
        telefone: usuario.telefone.toString()  // Converte o BigInt para string
    }));

    return NextResponse.json(usuariosComTelefone);
}

export async function POST(req: NextRequest) {
    try {
        const { email, senha } = await req.json();

        if (!email || !senha) {
            return NextResponse.json({ message: 'Email e senha são obrigatórios' }, { status: 400 });
        }

        const user = await prisma.usuario.findFirst({
            where: {
                email: email
            },
        });

        if (user && user.senha === senha) {
            return NextResponse.json({
                email: user.email,
                nome: user.nome,
                idUsuario: user.idUsuario,
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Usuário ou senha incorretos' }, { status: 401 });
        }
    } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
    }
}