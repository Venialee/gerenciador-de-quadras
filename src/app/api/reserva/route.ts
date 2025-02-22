import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const reservas = await prisma.reserva.findMany();
    return NextResponse.json(reservas);
}

export async function POST(req: NextRequest) {
    try {
        const {
            horaInicio,
            horaFim,
            dataReserva,
            status,
            nomeEvento,
            descricaoEvento,
            organizadorEvento,
            idUsuario
        } = await req.json();

        if (!horaInicio || !horaFim || !dataReserva) {
            return NextResponse.json({ message: "Prrencha os campos obrigatórios" }, { status: 400 });
        }

        const timeHoraInicio = new Date(`1970-01-01T${horaInicio}:00Z`);
        const timeHoraFim = new Date(`1970-01-01T${horaFim}:00Z`);

        let novoEvento = null;

        const novaReserva = await prisma.reserva.create({
            data: {
                horaInicio: timeHoraInicio,
                horaFim: timeHoraFim,
                dataReserva,
                status: 1,
                idQuadra: 1,
                idUsuario,
                ...(novoEvento ? { idEvento: 1 } : {})
            }
        });

        if (nomeEvento && descricaoEvento && organizadorEvento) {
            novoEvento = await prisma.evento.create({
                data: {
                    nome: nomeEvento,
                    descricao: descricaoEvento,
                    organizador: organizadorEvento
                }
            });
        }

        return NextResponse.json({
            reserva: novaReserva,
            evento: novoEvento
        }, { status: 201 });
    }
    catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return NextResponse.json({ message: 'Erro interno no servidor' }, { status: 500 });
    }
}