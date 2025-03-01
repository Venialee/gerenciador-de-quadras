import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const regras = await prisma.regra.findMany();
    return NextResponse.json(regras);
}