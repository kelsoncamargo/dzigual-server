# DZIGUA-SERVER_CHALENGER

## Projeto: Servidor Backend para Gerenciamento de Recursos (Raças de Cães)

Este é um servidor backend construído com Node.js e Express.js, integrado ao
banco de dados PostgreSQL via Prisma ORM. O projeto consome a API externa
[dog.ceo](https://dog.ceo/api) para obter dados sobre raças de cães, implementa
autenticação JWT, validação de entradas com Celebrate/Joi, e recursos como
paginação, segurança (Helmet, XSS protection, rate limiting) e CORS. O foco
principal é em endpoints para listagem paginada de raças e detalhes de uma raça
específica.

O projeto é configurado para ambientes de desenvolvimento e produção, com
suporte a Docker para o banco de dados e PgAdmin. Ele inclui seeds para dados
iniciais (via Prisma) e middlewares para autenticação e proteção contra ataques
comuns.

### Tecnologias Principais

- **Node.js & Express.js**: Framework para o servidor HTTP.
- **Prisma**: ORM para interagir com PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Autenticação via tokens.
- **Celebrate/Joi**: Validação de requisições.
- **Docker**: Containerização para banco de dados e PgAdmin.
- **Outras dependências**: Axios (para chamadas API externas), Bcrypt (hash de
  senhas), Helmet, Compression, Rate Limit, XSS-Clean, etc.

## Instruções de Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18+ recomendada).
- Yarn ou NPM para gerenciamento de pacotes.
- Docker e Docker Compose (para banco de dados e PgAdmin).
- PostgreSQL (se não usar Docker).
- Uma conta de e-mail para PgAdmin (configurada via .env).

### Passos de Instalação Local

1. **Clone o repositório**:

   ```
   git clone <URL_DO_REPOSITORIO>
   cd server
   ```

2. **Instale as dependências**:

   ```
   npm install
   ```

   (Ou `yarn install` se preferir Yarn.)

3. **Configure o arquivo .env**: Crie um arquivo `.env` na raiz do projeto
   baseado no exemplo fornecido:

   ```
   # DATABASE SETTING
   DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@127.0.0.1:${POSTGRES_PORT}/${POSTGRES_DB}?schema=${POSTGRES_SCHEMA}"

   # JWT SECRET
   JWT_SECRET="prodVersion"
   JWT_SECRET_DEV="devVersion"
   JWT_SECRET_REFRESH="prodVersion"
   JWT_SECRET_DEV_REFRESH="devVersion"

   # ENVIRONMENT SETUP
   PRODUCTION="false"
   TIME_TOKEN="60" # For production set it with 5 or 15 minutes
   TIME_REFRESH_TOKEN="7" # The Refresh token is valid by 7 days

   # CORS CONFIGURATION
   CORS_ORIGINS="http://localhost:8000,http://127.0.0.1:8000"

   # API ENDPOINTS
   DOG_BASE_URL="https://dog.ceo/api"

   # VARIABLES POSTGRES
   POSTGRES_NAME="dzigual"
   POSTGRES_USER="dzigualUser"
   POSTGRES_PASSWORD="dzigualPassword"
   POSTGRES_DB="dzigual"
   POSTGRES_SCHEMA="public"
   POSTGRES_PORT="5432"

   # VARIABLES PGADMIN
   PGADMIN_DEFAULT_EMAIL="admin@admin.com"
   PGADMIN_DEFAULT_PASSWORD="admin123"
   PGADMIN_PORT="5050"
   ```

   - Ajuste valores sensíveis como senhas e segredos JWT para produção.
   - Para desenvolvimento, defina `PRODUCTION="false"`.

4. **Configure o Banco de Dados (com Docker)**:

   ```
   npm run docker-up
   ```

   Isso inicia PostgreSQL e PgAdmin. Acesse PgAdmin em `http://localhost:5050`
   com as credenciais do .env.

5. **Aplique Migrações Prisma**:

   ```
   npm run prisma-migrate
   ```

   Ou `npm run prisma-push` para sincronizar o schema sem migrações.

6. **Execute Seeds (opcional)**:
   ```
   npm run seed
   ```
   Isso popula o banco com dados iniciais, como usuários ou recursos.

## Passos para Execução Local

1. **Inicie o servidor**:

   ```
   npm start
   ```

   O servidor roda em `http://localhost:3000` (ou porta configurada).

2. **Monitoramento**:

   - Logs: `npm run docker-logs` para Docker.
   - Pare os containers: `npm run docker-down`.

3. **Testes**:
   - Use ferramentas como Postman ou Insomnia para testar endpoints.
   - Certifique-se de que o banco está rodando e acessível.

## Passos para Execução no Servidor (Produção em Ubuntu 24.04 com Apache como Proxy)

Para deploy em produção, recomendo containerizar todo o aplicativo para
consistência, escalabilidade e facilidade de gerenciamento. Como você mencionou
Ubuntu 24.04 e Apache como proxy reverso, aqui vai uma configuração recomendada:

### Decisões sobre Containerização

- **Banco de Dados (PostgreSQL)**: Sim, rode em Docker. É mais rápido para setup
  inicial, isolado, e fácil de gerenciar volumes para persistência. Use volumes
  nomeados para dados (`postgres_data`) e configure backups regulares (ex.: via
  cron jobs no host).
- **Node.js App**: Recomendo rodar em Docker também. Isso evita dependências
  nativas no host (como versões específicas de Node), facilita deploys com zero
  downtime (via Docker Compose ou Kubernetes), e mantém tudo em um único
  `docker-compose.yml`. Se preferir nativo, use PM2 para gerenciamento de
  processos, mas Docker é mais "rápido" em termos de portabilidade e isolamento.
- **PgAdmin**: Em produção, evite expor PgAdmin publicamente; use apenas
  localmente ou via VPN. Para produção, remova do compose ou restrinja acesso.

### Passos de Deploy

1. **Prepare o Servidor Ubuntu 24.04**:

   - Atualize o sistema: `sudo apt update && sudo apt upgrade`.
   - Instale Docker: `sudo apt install docker.io docker-compose`.
   - Instale Apache: `sudo apt install apache2`.
   - Habilite mods Apache: `sudo a2enmod proxy proxy_http ssl rewrite` (para
     HTTPS se aplicável).
   - Crie usuário não-root para rodar Docker: `sudo usermod -aG docker $USER`.

2. **Containerize a App Node**:

   - Crie um `Dockerfile` na raiz:

     ```
     FROM node:18-alpine

     WORKDIR /app

     COPY package*.json ./
     RUN npm install

     COPY . .

     RUN npx prisma generate

     EXPOSE 3000

     CMD ["npm", "start"]
     ```

   - Atualize `docker-compose.yml` para incluir o serviço Node:

     ```
     services:
       postgres:
         image: postgres:17
         container_name: ${POSTGRES_NAME}
         restart: always
         env_file:
           - .env
         environment:
           POSTGRES_USER: ${POSTGRES_USER}
           POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
           POSTGRES_DB: ${POSTGRES_DB}
         ports:
           - '${POSTGRES_PORT}:5432'
         volumes:
           - postgres_data:/var/lib/postgresql/data

       app:
         build: .
         container_name: node-app
         restart: always
         env_file:
           - .env
         environment:
           PRODUCTION: "true"
           DATABASE_URL: "postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${POSTGRES_DB}?schema=${POSTGRES_SCHEMA}"
         ports:
           - '3000:3000'
         depends_on:
           - postgres
         volumes:
           - .:/app

       pgadmin:
         # ... (mesmo que antes, mas considere remover para prod)

     volumes:
       postgres_data:
       pgadmin_data:
     ```

     - Note: Ajuste `DATABASE_URL` para apontar para o container `postgres` em
       vez de `127.0.0.1`.

3. **Deploy no Servidor**:

   - Copie o projeto para o servidor (via Git ou SCP).
   - Defina `PRODUCTION="true"` no .env e ajuste segredos JWT.
   - Build e inicie: `docker-compose up -d --build`.
   - Aplique migrações: `docker-compose exec app npm run prisma-migrate`.

4. **Configure Apache como Proxy Reverso**:

   - Crie um VirtualHost em `/etc/apache2/sites-available/000-default.conf`:

     ```
     <VirtualHost *:80>
         ServerName seu-dominio.com

         ProxyPreserveHost On
         ProxyPass / http://localhost:3000/
         ProxyPassReverse / http://localhost:3000/

         ErrorLog ${APACHE_LOG_DIR}/error.log
         CustomLog ${APACHE_LOG_DIR}/access.log combined
     </VirtualHost>
     ```

   - Habilite site: `sudo a2ensite 000-default`.
   - Reinicie Apache: `sudo systemctl restart apache2`.
   - Para HTTPS, use Certbot: `sudo apt install certbot python3-certbot-apache`,
     então `sudo certbot --apache`.

5. **Monitoramento e Manutenção**:
   - Logs: `docker-compose logs -f app`.
   - Backups: Use `pg_dump` via cron para o banco.
   - Scaling: Para mais instâncias, use Docker Swarm ou Kubernetes.
   - Segurança: Restrinja portas (ex.: firewall com UFW:
     `sudo ufw allow 80,443`).

## Descrição dos Endpoints

Assumindo que os endpoints estão montados em `/api/resources` (ajuste conforme
sua configuração de rotas principal). Todos os endpoints requerem autenticação
JWT (header: `Authorization: Bearer <token>`).

### 1. GET /api/resources

- **Descrição**: Retorna uma lista paginada de raças de cães.
- **Parâmetros (Query)**:
  - `page` (number, opcional, default: 1): Número da página.
  - `limit` (number, opcional, default: 5): Itens por página.
- **Exemplo de Requisição**:
  ```
  GET /api/resources?page=2&limit=3
  ```
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "items": ["breed4", "breed5", "breed6"],
    "total": 10,
    "page": 2,
    "limit": 3,
    "totalPages": 4
  }
  ```
- **Erros**:
  - 400: Parâmetros inválidos ou erro no servidor.
  - 401: Não autenticado.

### 2. GET /api/resources/:id

- **Descrição**: Retorna detalhes de uma raça específica (incluindo países
  associados).
- **Parâmetros (Path)**:
  - `id` (string, obrigatório): Nome da raça (case-insensitive).
- **Exemplo de Requisição**:
  ```
  GET /api/resources/labradoodle
  ```
- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "breed": "labradoodle",
    "countries": ["Australia", "United States"]
  }
  ```
  Ou se não encontrado:
  ```json
  {
    "breed": "labradoodle",
    "message": "NOT_FOUND_country_race"
  }
  ```
- **Erros**:
  - 400: Raça não encontrada ou erro no servidor.
  - 401: Não autenticado.

Outros endpoints (ex.: autenticação de usuários) não estão detalhados aqui, mas
podem ser inferidos do código (ex.: login/register via getByEmail e JWT).

## Observações sobre Decisões Técnicas e Pontos de Melhoria

### Decisões Técnicas

- **Autenticação JWT**: Escolhida por ser stateless e escalável. Separação de
  segredos dev/prod para segurança.
- **Validação com Celebrate/Joi**: Garante inputs sanitizados, prevenindo
  injeções.
- **Segurança**: Helmet para headers, XSS-Clean/HPP para proteção, Rate Limit
  para DoS.
- **Paginação**: Implementada de forma simples para listas grandes, usando uma
  função utilitária.
- **Integração Externa**: Axios para dog.ceo API, cacheável no futuro.
- **Docker**: Facilita setup local/prod, com volumes para persistência.
- **Prisma**: ORM moderno, com migrações e seeds para gerenciamento de DB.

### Pontos de Melhoria

- **Testes**: Adicionar unit/integration tests com Jest/Supertest.
- **Logging**: Integrar Winston ou Pino para logs estruturados.
- **Caching**: Usar Redis para cache de API externa e queries frequentes.
- **CI/CD**: Configurar GitHub Actions para builds/deploys automáticos.
- **Monitoramento**: Adicionar Prometheus/Grafana para métricas.
- **Autenticação Avançada**: Implementar OAuth ou refresh tokens com rotação.
- **Erros Personalizados**: Expandir MessageMap para mais códigos de erro.
- **Deploy**: Se optar por nativo para Node, use PM2 (`pm2 start server.js`) e
  systemd para serviço. Mas Docker é preferível para consistência com o DB.
- **Produção**: Em Ubuntu, monitore recursos (CPU/RAM) e configure auto-scaling
  se necessário. Para alta disponibilidade, use múltiplos containers.
