import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const idreserva = Number(id);

        const reserva = await prisma.reserva.findUnique({
            where: { idReserva: idreserva },
        });

        if (!reserva) {
            return NextResponse.json(
                { message: "Reserva não encontrada" },
                { status: 404 }
            );
        }

        return NextResponse.json(reserva);
    }
    catch (error) {
        console.error("Erro ao buscar a reserva:", error);
        return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
    }
}

export async function DELETE(req: NextApiRequest, { params }: { params: { id: string } }) {
    const id = await parseInt(params.id);

    try {
        const reserva = await prisma.reserva.delete({
            where: {
                idReserva: id
            }
        });
        return NextResponse.json({ message: "Reserva deletado com sucesso", reserva });
    }
    catch (error) {
        return NextResponse.json(
            { message: "Erro ao deletar reserva do banco de dados: ", error }, { status: 500 }
        )
    }
}

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        const updatedData = await req.json();
        const idreserva = parseInt(id, 10);

        if (isNaN(idreserva)) {
            return NextResponse.json({ message: 'ID inválido' }, { status: 400 });
        }
        console.log(updatedData)
        // Validate required reservation fields
        if (!updatedData.dataReserva || [1, 2].includes(updatedData.status)) {
            return NextResponse.json({ message: 'Parâmetros inválidos' }, { status: 400 });
        }

        // Get existing reservation to find associated event
        const existingReserva = await prisma.reserva.findUnique({
            where: { idReserva: idreserva },
            include: { evento: true }
        });

        if (!existingReserva) {
            return NextResponse.json({ message: 'Reserva não encontrada' }, { status: 404 });
        }

        // Split reservation and event data
        const { evento, ...reservaData } = updatedData;

        // Process reservation dates
        const constructISO = (dateString: string, timeString: string) => {
            const [hours, minutes] = timeString.split(':');
            const date = new Date(dateString);
            date.setHours(parseInt(hours));
            date.setMinutes(parseInt(minutes));
            return date;
        };

        // Update reservation and event in transaction
        const [updatedReserva, updatedEvent] = await prisma.$transaction([
            prisma.reserva.update({
                where: { idReserva: idreserva },
                data: {
                    dataReserva: new Date(reservaData.dataReserva),
                    horaInicio: constructISO(reservaData.dataReserva, reservaData.horaInicio),
                    horaFim: constructISO(reservaData.dataReserva, reservaData.horaFim),
                    status: reservaData.status
                }
            }),
            ...(evento && existingReserva.idEvento ? [
                prisma.evento.update({
                    where: { idEvento: existingReserva.idEvento },
                    data: {
                        nome: evento.nome,
                        descricao: evento.descricao, // Fixed typo
                        organizador: evento.organizador
                    }
                })
            ] : [])
        ]);

        return NextResponse.json({ 
            message: 'Atualização realizada com sucesso',
            reserva: updatedReserva,
            evento: updatedEvent || null
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Erro ao atualizar status da reserva' }, { status: 500 });
    }
}
