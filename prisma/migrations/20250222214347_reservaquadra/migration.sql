-- CreateTable
CREATE TABLE "Cidade" (
    "idcidade" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "UF" VARCHAR(2) NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("idcidade")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "idendereco" INTEGER NOT NULL,
    "idCidade" INTEGER NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "bairro" VARCHAR(100) NOT NULL,
    "CEP" VARCHAR(100) NOT NULL,
    "numero" INTEGER NOT NULL,
    "complemento" VARCHAR(100),

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("idendereco")
);

-- CreateTable
CREATE TABLE "Quadra" (
    "idQuadra" INTEGER NOT NULL,
    "idEndereco" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "capacidade" INTEGER NOT NULL,

    CONSTRAINT "Quadra_pkey" PRIMARY KEY ("idQuadra")
);

-- CreateTable
CREATE TABLE "Evento" (
    "idevento" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(100),
    "organizador" VARCHAR(100) NOT NULL,

    CONSTRAINT "Evento_pkey" PRIMARY KEY ("idevento")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" SERIAL NOT NULL,
    "telefone" BIGINT NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "sobrenome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha" VARCHAR(100) NOT NULL,
    "CPF" VARCHAR(11) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "idreserva" SERIAL NOT NULL,
    "idQuadra" INTEGER NOT NULL,
    "idEvento" INTEGER,
    "idUsuario" INTEGER NOT NULL,
    "dataReserva" DATE NOT NULL,
    "horaInicio" TIME NOT NULL,
    "horaFim" TIME NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("idreserva")
);

-- CreateTable
CREATE TABLE "Administrador" (
    "idAdministrador" SERIAL NOT NULL,
    "chaveAcesso" VARCHAR(100) NOT NULL,

    CONSTRAINT "Administrador_pkey" PRIMARY KEY ("idAdministrador")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "idAluno" SERIAL NOT NULL,
    "matricula" VARCHAR(100) NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("idAluno")
);

-- CreateTable
CREATE TABLE "Regra" (
    "idRegra" INTEGER NOT NULL,
    "descricao" VARCHAR(100) NOT NULL,
    "nome" CHAR(50) NOT NULL,

    CONSTRAINT "Regra_pkey" PRIMARY KEY ("idRegra")
);

-- CreateTable
CREATE TABLE "QuadraRegra" (
    "idRegra" INTEGER NOT NULL,
    "idQuadra" INTEGER NOT NULL,

    CONSTRAINT "QuadraRegra_pkey" PRIMARY KEY ("idRegra","idQuadra")
);

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_idCidade_fkey" FOREIGN KEY ("idCidade") REFERENCES "Cidade"("idcidade") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quadra" ADD CONSTRAINT "Quadra_idEndereco_fkey" FOREIGN KEY ("idEndereco") REFERENCES "Endereco"("idendereco") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idQuadra_fkey" FOREIGN KEY ("idQuadra") REFERENCES "Quadra"("idQuadra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idEvento_fkey" FOREIGN KEY ("idEvento") REFERENCES "Evento"("idevento") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administrador" ADD CONSTRAINT "Administrador_idAdministrador_fkey" FOREIGN KEY ("idAdministrador") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_idAluno_fkey" FOREIGN KEY ("idAluno") REFERENCES "Usuario"("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuadraRegra" ADD CONSTRAINT "QuadraRegra_idRegra_fkey" FOREIGN KEY ("idRegra") REFERENCES "Regra"("idRegra") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuadraRegra" ADD CONSTRAINT "QuadraRegra_idQuadra_fkey" FOREIGN KEY ("idQuadra") REFERENCES "Quadra"("idQuadra") ON DELETE RESTRICT ON UPDATE CASCADE;
