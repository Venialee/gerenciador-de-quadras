rodar docker
docker build -t custom-postgres .
docker run -d --name my-postgres -p 5431:5432 custom-postgres

rodar nestjs
npx prisma migrate dev

QUER ACESSAR O BD PRA RODAR OS COMANDOS SQL?
primeiro rode no terminal `docker ps`, pegue o codigo que será mostrado da coluna CONTAINER ID e rode este COMANDOS
`docker exec -it <COLOQUE O CONTAINER_ID>`
com isso voce vai entrar em um terminal e agora pode rodar os comandos do POSTGRESQL
psql -h localhost -U postgres -d postgres // para conectar ao psql
então para ver a db que existe: \l
para ver as tabelas: \dt
