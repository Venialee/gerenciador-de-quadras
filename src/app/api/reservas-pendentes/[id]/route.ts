
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

function formatTime(time: string) {
    return dayjs.utc(`1970-01-01 ${time}`, "YYYY-MM-DD HH:mm").toISOString();
}

function formatDate(date: string) {
    return dayjs.utc(date, "DD/MM/YYYY").toISOString();
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "ID de reserva inválido" },
                { status: 400 }
            );
        }

        // Query the database for the specific reservation with status 0 (pending)
        const reserva = await prisma.reserva.findFirst({
            where: {
                idreserva: id,
                status: 0,
            },
            include: {
                evento: true,
            },
        });

        if (!reserva) {
            return NextResponse.json(
                { error: "Reserva pendente não encontrada" },
                { status: 404 }
            );
        }

        const formattedReserva = {
            idreserva: reserva.idreserva,
            idQuadra: reserva.idQuadra,
            idEvento: reserva.idEvento || undefined,
            idUsuario: reserva.idUsuario,
            dataReserva: reserva.dataReserva,
            horaInicio: reserva.horaInicio,
            horaFim: reserva.horaFim,
            status: reserva.status,
            evento: reserva.evento
                ? {
                    nome: reserva.evento.nome,
                    descricao: reserva.evento.descricao,
                    organizador: reserva.evento.organizador,
                }
                : undefined,
        };

        return NextResponse.json(formattedReserva);
    } catch (error) {
        console.error("Erro ao buscar reserva pendente:", error);
        return NextResponse.json(
            { error: "Erro ao buscar reserva pendente" },
            { status: 500 }
        );
    }
}

// export async function PATCH(
//     request: NextRequest,
//     { params }: { params: { id: string } }
// ) {
//     try {
//         const id = parseInt(params.id);

//         if (isNaN(id)) {
//             return NextResponse.json(
//                 { error: "ID de reserva inválido" },
//                 { status: 400 }
//             );
//         }

//         // Check if the reservation exists and is pending
//         const existingReserva = await prisma.reserva.findFirst({
//             where: {
//                 idreserva: id,
//                 status: 0, // Only pending reservations can be edited
//             },
//         });

//         if (!existingReserva) {
//             return NextResponse.json(
//                 { error: "Reserva pendente não encontrada" },
//                 { status: 404 }
//             );
//         }

//         // Parse the request body
//         const data = await request.json();
//         const { dataReserva, horaInicio, horaFim } = data;

//         // Validate required fields
//         if (!dataReserva || !horaInicio || !horaFim) {
//             return NextResponse.json(
//                 { error: "Dados incompletos para atualização da reserva" },
//                 { status: 400 }
//             );
//         }

//         const formattedDataReserva = dayjs.utc(dataReserva).toDate();
//         const formattedHoraInicio = dayjs.utc(`1970-01-01T${horaInicio}`).toDate();
//         const formattedHoraFim = dayjs.utc(`1970-01-01T${horaFim}`).toDate();

//         const updatedReserva = await prisma.reserva.update({
//             where: {
//                 idreserva: id,
//             },
//             data: {
//                 dataReserva: formattedDataReserva,
//                 horaInicio: formattedHoraInicio,
//                 horaFim: formattedHoraFim,
//             },
//         });

//         const formattedResponse = {
//             idreserva: updatedReserva.idreserva,
//             idQuadra: updatedReserva.idQuadra,
//             idEvento: updatedReserva.idEvento || undefined,
//             idUsuario: updatedReserva.idUsuario,
//             dataReserva: dayjs(updatedReserva.dataReserva).format("YYYY-MM-DD"),
//             horaInicio: dayjs(updatedReserva.horaInicio).format("HH:mm"),
//             horaFim: dayjs(updatedReserva.horaFim).format("HH:mm"),
//             status: updatedReserva.status,
//         };

//         return NextResponse.json(formattedResponse);
//     } catch (error) {
//         console.error("Erro ao atualizar reserva pendente:", error);
//         return NextResponse.json(
//             { error: "Erro ao atualizar reserva pendente" },
//             { status: 500 }
//         );
//     }
// }

export async function PATCH(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const id = parseInt(params.id);

        if (isNaN(id)) {
            return NextResponse.json(
                { error: "ID de reserva inválido" },
                { status: 400 }
            );
        }

        // Check if the reservation exists and is pending
        const existingReserva = await prisma.reserva.findFirst({
            where: {
                idreserva: id,
                status: 0, // Only pending reservations can be edited
            },
        });

        if (!existingReserva) {
            return NextResponse.json(
                { error: "Reserva pendente não encontrada" },
                { status: 404 }
            );
        }

        // Parse the request body
        const data = await request.json();
        const { dataReserva, horaInicio, horaFim } = data;

        // Validate required fields
        if (!dataReserva || !horaInicio || !horaFim) {
            return NextResponse.json(
                { error: "Dados incompletos para atualização da reserva" },
                { status: 400 }
            );
        }

        const formattedDataReserva = dayjs.utc(dataReserva).toDate();
        const formattedHoraInicio = dayjs.utc(`1970-01-01T${horaInicio}`).toDate();
        const formattedHoraFim = dayjs.utc(`1970-01-01T${horaFim}`).toDate();

        const updatedReserva = await prisma.reserva.update({
            where: {
                idreserva: id,
            },
            data: {
                dataReserva: formattedDataReserva,
                horaInicio: formattedHoraInicio,
                horaFim: formattedHoraFim,
            },
        });

        const formattedResponse = {
            idreserva: updatedReserva.idreserva,
            idQuadra: updatedReserva.idQuadra,
            idEvento: updatedReserva.idEvento || undefined,
            idUsuario: updatedReserva.idUsuario,
            dataReserva: dayjs(updatedReserva.dataReserva).format("YYYY-MM-DD"),
            horaInicio: dayjs(updatedReserva.horaInicio).format("HH:mm"),
            horaFim: dayjs(updatedReserva.horaFim).format("HH:mm"),
            status: updatedReserva.status,
        };

        return NextResponse.json(formattedResponse);
    } catch (error) {
        console.error("Erro ao atualizar reserva pendente:", error);
        return NextResponse.json(
            { error: "Erro ao atualizar reserva pendente" },
            { status: 500 }
        );
    }
}

