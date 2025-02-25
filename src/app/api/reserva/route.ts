import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const reservas = await prisma.reserva.findMany();
    return NextResponse.json(reservas);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Dados recebidos:", body);

        const {
            idQuadra,
            idUsuario,
            dataReserva,
            horaInicio,
            horaFim,
            status,
            nomeEvento,
            descricaoEvento,
            organizadorEvento
        } = body;
        
        if (!idQuadra || !idUsuario || !dataReserva || !horaInicio || !horaFim) {
            return NextResponse.json({ message: "Preencha todos os campos obrigatórios" }, { status: 400 });
        }

        let idEvento: number | null = null;

        if (nomeEvento && descricaoEvento && organizadorEvento) {
            const eventoCriado = await prisma.evento.create({
                data: {
                    nome: nomeEvento,
                    descricao: descricaoEvento,
                    organizador: organizadorEvento,
                },
            });

            idEvento = eventoCriado.idEvento;
        }

        const reserva = await prisma.reserva.create({
            data: {
                idQuadra,
                idUsuario,
                dataReserva: new Date(dataReserva),
                horaInicio: new Date(`1970-01-01T${horaInicio}:00Z`),
                horaFim: new Date(`1970-01-01T${horaFim}:00Z`),
                status,
                idEvento
            },
        });

        return NextResponse.json(reserva, { status: 201 });

    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return NextResponse.json(
            { message: "Erro interno no servidor", error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
