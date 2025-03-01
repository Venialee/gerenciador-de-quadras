import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data (optional)
    await prisma.quadraRegra.deleteMany({});
    await prisma.regra.deleteMany({});
    await prisma.reserva.deleteMany({});
    await prisma.aluno.deleteMany({});
    await prisma.administrador.deleteMany({});
    await prisma.usuario.deleteMany({});
    await prisma.evento.deleteMany({});
    await prisma.quadra.deleteMany({});
    await prisma.endereco.deleteMany({});
    await prisma.cidade.deleteMany({});
  // Seed Cidades
  await prisma.cidade.createMany({
    data: [
      { idCidade:1,nome: 'São Paulo', UF: 'SP' },
      { idCidade:2, nome: 'Rio de Janeiro', UF: 'RJ' },
    ],
  });

  // Seed Enderecos
  await prisma.endereco.createMany({
    data: [
      { idEndereco: 1, idCidade: 1, logradouro: 'Rua das Flores', numero: 123, bairro: 'Centro', CEP: '01001000' },
    ],
  });

  // Seed Eventos
  await prisma.evento.createMany({
    data: [
      { nome: 'Festa na Quadra', organizador: 'fulano' },
      { nome: 'Show de Rock', organizador: 'de tal' },
    ],
  });


  // Seed Quadras
  await prisma.quadra.createMany({
    data: [
      {idQuadra: 1,idEndereco: 1,
        nome: 'Quadra Principal',   capacidade:2},
      { idQuadra: 2,idEndereco: 1, nome: 'Quadra de Areia' ,  capacidade:2},
    ],
  });

  console.log('Database seeded successfully!');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });