/*
  Warnings:

  - You are about to alter the column `status` on the `Reserva` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE "Administrador" ALTER COLUMN "idAdministrador" DROP DEFAULT;
DROP SEQUENCE "Administrador_idAdministrador_seq";

-- AlterTable
ALTER TABLE "Aluno" ALTER COLUMN "idAluno" DROP DEFAULT;
DROP SEQUENCE "Aluno_idAluno_seq";

-- AlterTable
CREATE SEQUENCE endereco_idendereco_seq;
ALTER TABLE "Endereco" ALTER COLUMN "idEndereco" SET DEFAULT nextval('endereco_idendereco_seq');
ALTER SEQUENCE endereco_idendereco_seq OWNED BY "Endereco"."idEndereco";

-- AlterTable
CREATE SEQUENCE quadra_idquadra_seq;
ALTER TABLE "Quadra" ALTER COLUMN "idQuadra" SET DEFAULT nextval('quadra_idquadra_seq');
ALTER SEQUENCE quadra_idquadra_seq OWNED BY "Quadra"."idQuadra";

-- AlterTable
CREATE SEQUENCE regra_idregra_seq;
ALTER TABLE "Regra" ALTER COLUMN "idRegra" SET DEFAULT nextval('regra_idregra_seq');
ALTER SEQUENCE regra_idregra_seq OWNED BY "Regra"."idRegra";

-- AlterTable
ALTER TABLE "Reserva" ALTER COLUMN "status" SET DATA TYPE SMALLINT;
