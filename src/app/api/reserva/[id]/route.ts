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
