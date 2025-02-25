import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    const quadras = await prisma.cidade.findMany();
    return NextResponse.json(quadras);
}

