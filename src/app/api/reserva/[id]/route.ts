import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;
        const idreserva = Number(id);

        const reserva = await prisma.reserva.findUnique({
            where: { idreserva: idreserva },
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
                idreserva: id
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
        const { status } = await req.json();
        const idreserva = parseInt(id, 10);

        if (isNaN(idreserva) || (status !== 1 && status !== 2)) {
            return NextResponse.json({ message: 'Parâmetros inválidos' }, { status: 400 });
        }

        // Buscar a reserva que está sendo atualizada
        const reservaAtual = await prisma.reserva.findUnique({
            where: { idreserva: idreserva },
        });

        if (!reservaAtual) {
            return NextResponse.json({ message: 'Reserva não encontrada' }, { status: 404 });
        }

        // Se estiver aprovando a reserva (status = 1), verificar conflitos
        if (status === 1) {
            // Buscar reservas já aprovadas na mesma quadra e na mesma data
            const reservasAprovadas = await prisma.reserva.findMany({
                where: {
                    idQuadra: reservaAtual.idQuadra,
                    dataReserva: reservaAtual.dataReserva,
                    status: 1, // Apenas reservas já aprovadas
                    idreserva: { not: idreserva } // Excluir a reserva atual da verificação
                },
            });

            // Converter os horários da reserva atual para comparação
            const inicioAtual = new Date(reservaAtual.horaInicio).getTime();
            const fimAtual = new Date(reservaAtual.horaFim).getTime();

            // Verificar se há alguma sobreposição de horários
            const conflito = reservasAprovadas.some(reserva => {
                const inicioReserva = new Date(reserva.horaInicio).getTime();
                const fimReserva = new Date(reserva.horaFim).getTime();

                // Há conflito se:
                // 1. O início da reserva atual está entre o início e fim de uma reserva aprovada
                // 2. O fim da reserva atual está entre o início e fim de uma reserva aprovada
                // 3. A reserva atual engloba completamente uma reserva aprovada
                return (
                    (inicioAtual >= inicioReserva && inicioAtual < fimReserva) ||
                    (fimAtual > inicioReserva && fimAtual <= fimReserva) ||
                    (inicioAtual <= inicioReserva && fimAtual >= fimReserva)
                );
            });

            if (conflito) {
                return NextResponse.json(
                    { message: 'Não é possível aprovar: já existe uma reserva neste horário' },
                    { status: 409 } // Código 409 para conflito
                );
            }
        }

        // Se não houver conflito, ou se estiver cancelando a reserva (status = 2), prosseguir
        const reserva = await prisma.reserva.update({
            where: { idreserva: idreserva },
            data: { status },
        });

        return NextResponse.json({ message: 'Status atualizado com sucesso', reserva }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Erro ao atualizar status da reserva' }, { status: 500 });
    }
}