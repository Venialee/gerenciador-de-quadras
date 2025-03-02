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

        const reservaAtual = await prisma.reserva.findUnique({
            where: { idreserva: idreserva },
        });

        if (!reservaAtual) {
            return NextResponse.json({ message: 'Reserva não encontrada' }, { status: 404 });
        }

        if (status === 1) {
            const reservasAprovadas = await prisma.reserva.findMany({
                where: {
                    idQuadra: reservaAtual.idQuadra,
                    dataReserva: reservaAtual.dataReserva,
                    status: 1,
                    idreserva: { not: idreserva }
                },
            });

            const inicioAtual = new Date(reservaAtual.horaInicio).getTime();
            const fimAtual = new Date(reservaAtual.horaFim).getTime();

            const conflito = reservasAprovadas.some(reserva => {
                const inicioReserva = new Date(reserva.horaInicio).getTime();
                const fimReserva = new Date(reserva.horaFim).getTime();
                return (
                    (inicioAtual >= inicioReserva && inicioAtual < fimReserva) ||
                    (fimAtual > inicioReserva && fimAtual <= fimReserva) ||
                    (inicioAtual <= inicioReserva && fimAtual >= fimReserva)
                );
            });

            if (conflito) {
                return NextResponse.json(
                    { message: 'Não é possível aprovar: já existe uma reserva neste horário' },
                    { status: 409 }
                );
            }
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

// export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
//     try {
//         const { id } = context.params;
//         const idreserva = parseInt(id, 10);
//         const requestData = await req.json();

//         console.log("ID da reserva:", idreserva);
//         console.log("Dados recebidos:", requestData);

//         if (isNaN(idreserva)) {
//             return NextResponse.json({ message: 'ID da reserva inválido' }, { status: 400 });
//         }

//         const reservaAtual = await prisma.reserva.findUnique({
//             where: { idreserva: idreserva },
//         });

//         if (!reservaAtual) {
//             return NextResponse.json({ message: 'Reserva não encontrada' }, { status: 404 });
//         }

//         console.log("Reserva atual:", reservaAtual);

//         // Se a solicitação contém apenas status, processar como antes
//         if (requestData.status !== undefined && Object.keys(requestData).length === 1) {
//             const { status } = requestData;

//             if (status !== 0 && status !== 1 && status !== 2) {
//                 return NextResponse.json({ message: 'Status inválido' }, { status: 400 });
//             }

//             if (status === 1) {
//                 // Verificação de conflito para aprovação (código existente)
//                 // ...
//             }

//             const reserva = await prisma.reserva.update({
//                 where: { idreserva: idreserva },
//                 data: { status },
//             });

//             return NextResponse.json({ message: 'Status atualizado com sucesso', reserva }, { status: 200 });
//         }
//         // Se a solicitação contém informações de edição da reserva
//         else {
//             const { dataReserva, horaInicio, horaFim } = requestData;

//             // Preparar dados para atualização
//             let updateData: any = {};

//             // Tratar a data
//             if (dataReserva) {
//                 updateData.dataReserva = new Date(dataReserva);
//             }

//             // Tratar hora início
//             if (horaInicio) {
//                 // Combinamos a data base com a hora
//                 const [horaI, minutoI] = horaInicio.split(':').map(Number);
//                 const dataBase = new Date();
//                 dataBase.setHours(horaI, minutoI, 0, 0);
//                 updateData.horaInicio = dataBase;
//             }

//             // Tratar hora fim
//             if (horaFim) {
//                 const [horaF, minutoF] = horaFim.split(':').map(Number);
//                 const dataBase = new Date();
//                 dataBase.setHours(horaF, minutoF, 0, 0);
//                 updateData.horaFim = dataBase;
//             }

//             console.log("Dados a serem atualizados:", updateData);

//             try {
//                 // Atualizar a reserva
//                 const reservaAtualizada = await prisma.reserva.update({
//                     where: { idreserva },
//                     data: updateData,
//                 });

//                 console.log("Reserva atualizada:", reservaAtualizada);

//                 return NextResponse.json({
//                     message: 'Reserva atualizada com sucesso',
//                     reserva: reservaAtualizada
//                 }, { status: 200 });
//             } catch (dbError) {
//                 console.error("Erro do Prisma:", dbError);
//                 return NextResponse.json({
//                     message: 'Erro ao atualizar reserva no banco de dados',
//                     error: String(dbError)
//                 }, { status: 500 });
//             }
//         }
//     } catch (error) {
//         console.error("Erro geral:", error);
//         return NextResponse.json({
//             message: 'Erro ao processar a requisição',
//             error: String(error)
//         }, { status: 500 });
//     } finally {
//         // Desconectar o Prisma para evitar conexões abertas
//         await prisma.$disconnect();
//     }
// }

// export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
//     try {
//         const { id } = context.params;
//         const idreserva = parseInt(id, 10);
//         const requestData = await req.json();

//         console.log("ID da reserva:", idreserva);
//         console.log("Dados recebidos:", requestData);

//         if (isNaN(idreserva)) {
//             return NextResponse.json({ message: 'ID da reserva inválido' }, { status: 400 });
//         }

//         const reservaAtual = await prisma.reserva.findUnique({
//             where: { idreserva: idreserva },
//         });

//         if (!reservaAtual) {
//             return NextResponse.json({ message: 'Reserva não encontrada' }, { status: 404 });
//         }

//         console.log("Reserva atual:", reservaAtual);

//         // Se a solicitação contém apenas status, processar como antes
//         if (requestData.status !== undefined && Object.keys(requestData).length === 1) {
//             const { status } = requestData;

//             if (status !== 0 && status !== 1 && status !== 2) {
//                 return NextResponse.json({ message: 'Status inválido' }, { status: 400 });
//             }

//             if (status === 1) {
//                 // Verificação de conflito para aprovação (código existente)
//                 // ...
//             }

//             const reserva = await prisma.reserva.update({
//                 where: { idreserva: idreserva },
//                 data: { status },
//             });

//             return NextResponse.json({ message: 'Status atualizado com sucesso', reserva }, { status: 200 });
//         }
//         // Se a solicitação contém informações de edição da reserva
//         else {
//             const { dataReserva, horaInicio, horaFim } = requestData;

//             // Preparar dados para atualização
//             let updateData: any = {};

//             // Converter dataReserva para formato ISO
//             if (dataReserva) {
//                 const dataISO = new Date(dataReserva);
//                 dataISO.setUTCHours(0, 0, 0, 0);
//                 updateData.dataReserva = dataISO;
//             }

//             // Converter horaInicio para formato ISO
//             if (horaInicio) {
//                 const [horaI, minutoI] = horaInicio.split(':').map(Number);
//                 const dataInicioISO = new Date(1970, 0, 1);
//                 dataInicioISO.setUTCHours(horaI, minutoI, 0, 0);
//                 updateData.horaInicio = dataInicioISO;
//             }

//             // Converter horaFim para formato ISO
//             if (horaFim) {
//                 const [horaF, minutoF] = horaFim.split(':').map(Number);
//                 const dataFimISO = new Date(1970, 0, 1);
//                 dataFimISO.setUTCHours(horaF, minutoF, 0, 0);
//                 updateData.horaFim = dataFimISO;
//             }

//             console.log("Dados a serem atualizados:", updateData);

//             try {
//                 // Atualizar a reserva
//                 const reservaAtualizada = await prisma.reserva.update({
//                     where: { idreserva },
//                     data: updateData,
//                 });

//                 console.log("Reserva atualizada:", reservaAtualizada);

//                 return NextResponse.json({
//                     message: 'Reserva atualizada com sucesso',
//                     reserva: reservaAtualizada
//                 }, { status: 200 });
//             } catch (dbError) {
//                 console.error("Erro do Prisma:", dbError);
//                 return NextResponse.json({
//                     message: 'Erro ao atualizar reserva no banco de dados',
//                     error: String(dbError)
//                 }, { status: 500 });
//             }
//         }
//     } catch (error) {
//         console.error("Erro geral:", error);
//         return NextResponse.json({
//             message: 'Erro ao processar a requisição',
//             error: String(error)
//         }, { status: 500 });
//     } finally {
//         // Desconectar o Prisma para evitar conexões abertas
//         await prisma.$disconnect();
//     }
// }