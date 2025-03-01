-- AlterTable
ALTER TABLE "Cidade" ALTER COLUMN "idCidade" DROP DEFAULT;
DROP SEQUENCE "Cidade_idCidade_seq";

-- AlterTable
ALTER TABLE "Endereco" ALTER COLUMN "idEndereco" DROP DEFAULT;
DROP SEQUENCE "endereco_idendereco_seq";

-- AlterTable
ALTER TABLE "Quadra" ALTER COLUMN "idQuadra" DROP DEFAULT;
DROP SEQUENCE "quadra_idquadra_seq";

-- AlterTable
ALTER TABLE "Regra" ALTER COLUMN "idRegra" DROP DEFAULT;
DROP SEQUENCE "regra_idregra_seq";
