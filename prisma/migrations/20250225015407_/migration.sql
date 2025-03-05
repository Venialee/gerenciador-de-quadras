/*
  Warnings:

  - The primary key for the `Cidade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idcidade` on the `Cidade` table. All the data in the column will be lost.
  - The primary key for the `Endereco` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idendereco` on the `Endereco` table. All the data in the column will be lost.
  - The primary key for the `Evento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idevento` on the `Evento` table. All the data in the column will be lost.
  - The primary key for the `Reserva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idreserva` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `idEndereco` to the `Endereco` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_idCidade_fkey";

-- DropForeignKey
ALTER TABLE "Quadra" DROP CONSTRAINT "Quadra_idEndereco_fkey";

-- DropForeignKey
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_idEvento_fkey";

-- AlterTable
ALTER TABLE "Cidade" DROP CONSTRAINT "Cidade_pkey",
DROP COLUMN "idcidade",
ADD COLUMN     "idCidade" SERIAL NOT NULL,
ADD CONSTRAINT "Cidade_pkey" PRIMARY KEY ("idCidade");

-- AlterTable
ALTER TABLE "Endereco" DROP CONSTRAINT "Endereco_pkey",
DROP COLUMN "idendereco",
ADD COLUMN     "idEndereco" INTEGER NOT NULL,
ADD CONSTRAINT "Endereco_pkey" PRIMARY KEY ("idEndereco");

-- AlterTable
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_pkey",
DROP COLUMN "idevento",
ADD COLUMN     "idEvento" SERIAL NOT NULL,
ADD CONSTRAINT "Evento_pkey" PRIMARY KEY ("idEvento");

-- AlterTable
ALTER TABLE "Reserva" DROP CONSTRAINT "Reserva_pkey",
DROP COLUMN "idreserva",
ADD COLUMN     "idReserva" SERIAL NOT NULL,
ADD CONSTRAINT "Reserva_pkey" PRIMARY KEY ("idReserva");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_idCidade_fkey" FOREIGN KEY ("idCidade") REFERENCES "Cidade"("idCidade") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quadra" ADD CONSTRAINT "Quadra_idEndereco_fkey" FOREIGN KEY ("idEndereco") REFERENCES "Endereco"("idEndereco") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "Evento"("idEvento") ON DELETE SET NULL ON UPDATE CASCADE;
