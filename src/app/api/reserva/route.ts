import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    try {
        const reservas = await prisma.reserva.findMany({
            where: status ? { status: Number(status) } : {},
            include: {
                evento: true
            }
        });

        const reservasFormatadas = reservas.map(reserva => ({
            ...reserva,
            dataReserva: reserva.dataReserva.toISOString().split("T")[0],
            horaInicio: reserva.horaInicio.toTimeString().split(" ")[0],
            horaFim: reserva.horaFim.toTimeString().split(" ")[0],
        }));

        return NextResponse.json(reservasFormatadas);
    } catch (error) {
        console.error("Erro ao buscar reservas:", error);
        return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
    }
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
        console.log(
            idQuadra,
            idUsuario,
            dataReserva,
            horaInicio,
            horaFim,
            status,
            nomeEvento,
            descricaoEvento,
            organizadorEvento
        )
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

        const reservaFormatada = {
            ...reserva,
            dataReserva: reserva.dataReserva.toISOString().split('T')[0], // Formato YYYY-MM-DD
            horaInicio: reserva.horaInicio.toISOString().split('T')[1].split('.')[0], // Formato HH:MM:SS
            horaFim: reserva.horaFim.toISOString().split('T')[1].split('.')[0], // Formato HH:MM:SS
        };

        return NextResponse.json(reservaFormatada, { status: 201 });

    } catch (error) {
        console.error("Erro ao processar a requisição:", error);
        return NextResponse.json(
            { message: "Erro interno no servidor", error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
