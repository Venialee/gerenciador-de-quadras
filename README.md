# Gerenciador de Quadras

## Pré-requisitos
- Docker instalado
- Node.js (v18+)
- NestJS CLI instalado (`npm i -g @nestjs/cli`)

---

## 🐳 Executar Banco de Dados PostgreSQL com Docker

### 1. Construir a imagem
```bash
docker build -t custom-postgres .
```

### 2. Iniciar o container
```bash
docker run -d --name my-postgres -p 5431:5432 custom-postgres
```
> **Nota:** O banco estará acessível em `localhost:5431`

---

## 🚀 Executar Aplicação NestJS

### 1. Instalar dependências
```bash
npm install
```

### 2. Executar migrações do Prisma
```bash
npx prisma migrate dev
```

### 3. Executar seed do Prisma
```bash
npx prisma db seed
```

### 4. Iniciar servidor em modo desenvolvimento
```bash
npm run dev
```

---

## 🔍 Acessar Banco de Dados PostgreSQL

### 1. Listar containers em execução
```bash
docker ps
```
> Anote o **CONTAINER ID** do container `my-postgres`

### 2. Conectar ao PostgreSQL via terminal
```bash
docker exec -it <CONTAINER_ID> psql -U postgres -d postgres
```

### 3. Comandos úteis no PSQL

| Comando      | Descrição                         |
| ------------ | --------------------------------- |
| `\l`         | Listar todos os bancos de dados   |
| `\dt`        | Listar tabelas                    |
| `\d+ tabela` | Ver estrutura de uma tabela       |
| `\q`         | Sair do terminal PSQL             |

---

## ⚙️ Variáveis de Ambiente

Certifique-se de configurar no arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:root@localhost:5431/postgres?schema=public"
```

---

## 🛠️ Estrutura do Banco (Prisma)

O schema do banco é gerenciado pelo Prisma em:

```bash
prisma/schema.prisma
```

---

## ❌ Troubleshooting

**Erro de conexão com o banco:**

- Verifique se o container está rodando (`docker ps -a`)
- Confira o mapeamento de portas (`-p 5431:5432`)
- Valide as credenciais no `.env`

**Problemas nas migrações:**

- Execute `npx prisma generate` antes das migrações
- Verifique o histórico de migrações com `npx prisma migrate status`

---

### Principais melhorias:
- Organização hierárquica com seções claras
- Adição de tabela de comandos úteis do PSQL
- Notas explicativas e troubleshooting
- Ícones visuais para melhor navegação
- Formatação consistente em markdown
- Informações complementares sobre Prisma e variáveis de ambiente
- Instruções de pré-requisitos explícitas
