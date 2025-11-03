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
suporte a Docker para o banco de dados e PgAdmin para o desenvolvimento. Ele
inclui middlewares para autenticação e proteção contra ataques comuns.

### Tecnologias Principais

- **Node.js & Express.js**: Framework para o servidor HTTP.
- **Prisma**: ORM para interagir com PostgreSQL.
- **PostgreSQL**: Banco de dados relacional.
- **JWT**: Autenticação via tokens.
- **Celebrate/Joi**: Validação de requisições.
- **Docker**: Containerização para banco de dados e PgAdmin(Desenvolvimento).
- **Outras dependências**: Axios (para chamadas API externas), Bcrypt (hash de
  senhas), Helmet, Compression, Rate Limit, XSS-Clean, etc.

## Instruções de Instalação e Configuração

### Pré-requisitos

- Node.js (versão 18+ recomendada).
- Yarn ou NPM para gerenciamento de pacotes.
- Docker e Docker Compose (para banco de dados e PgAdmin).
- Uma conta de e-mail para PgAdmin (configurada via .env).

### Passos de Instalação Local

1. **Clone o repositório**:

   ```
   git clone <URL_DO_REPOSITORIO>
   cd server
   ```

2. **Instale as dependências**:

   ```
   yarn install
   ```

   (Ou `npm install` se preferir npm.)

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
   yarn docker-up
   ```

   Isso inicia PostgreSQL e PgAdmin. Acesse PgAdmin em `http://localhost:5050`
   com as credenciais do .env.

5. **Aplique Migrações Prisma**:

   ```
   yarn prisma-migrate
   ```

   Ou `npm run prisma-push` para sincronizar o schema sem migrações.

6. **Aplique Generate Prisma**:

   ```
   yarn prisma-generate

   Ou `npm run prisma-generate` para gerar as tipagens local do schema Prisma.
   ```

## Passos para Execução Local

1. **Inicie o servidor**:

   ```
   yarn dev
   ```

   O servidor roda em `http://localhost:8000` (ou porta configurada).

2. **Monitoramento**:

   - Logs: `yarn docker-logs` para Docker.
   - Pare os containers: `yarn docker-down`.

3. **Testes**:
   - Use ferramentas como Postman ou Insomnia para testar endpoints.
   - Importe o template Postman no projeto clonado e importe para efetuar testes
     nas rotas.

## Descrição dos Endpoints

Assumindo que os endpoints estão montados sob prefixos como `/api/user` para
operações de usuários, `/api/auth` para autenticação, e `/api/resources` para
recursos (raças de cães).

Todos os endpoints protegidos (como resources e operações de usuário logado)
requerem autenticação via JWT. Endpoints de autenticação (login/create) não
requerem token inicial. Validações são feitas com Celebrate/Joi, e erros seguem
o padrão de MessageMap para mensagens padronizadas.

### Endpoints de Usuários

#### 1. POST /api/user

- **Descrição**: Cria um novo usuário no sistema.
- **Parâmetros (Body)**:
  - `email` (string, obrigatório, único): Email para login.
  - `password` (string, obrigatório): Senha para login (será hasheada com
    Bcrypt).
  - `fullName` (string, obrigatório): Nome completo para identificação.
  - `phoneNumber` (string, opcional): Número de telefone do usuário.
- **Exemplo de Requisição**:

  ```
  POST /api/user
  Content-Type: application/json

  {
    "email": "john@dzigual.com.br",
    "password": "senhaSegura123",
    "fullName": "John Test",
    "phoneNumber": "00000000000"
  }
  ```

- **Exemplo de Resposta (201 Created)**:
  ```json
  {
    "message": "create_operation_successful",
    "user": {
      "id": "45a38b5a-fddc-4b2b-a95c-11c1eb76bfab",
      "email": "john@dzigual.com.br",
      "fullName": "John Test",
      "phoneNumber": "00000000000"
    }
  }
  ```
- **Erros**:
  - 400: Parâmetros inválidos (ex.: email inválido ou senha fraca) ou erro no
    servidor.
  - 409: Email já cadastrado (conflito de unicidade).

#### 2. GET /api/user/

- **Descrição**: Retorna detalhes de um usuário específico por ID (requer
  autenticação; apenas o próprio usuário pode acessar).

- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "id": "408fa876-8a89-48bd-883a-0e111bfbd09a",
    "email": "john@dzigual.com.br",
    "fullName": "John Test",
    "phoneNumber": "00000000000",
    "createdAt": "2025-11-03T03:12:54.036Z",
    "updatedAt": "2025-11-03T03:47:40.359Z",
    "isActive": true
  }
  ```
- **Erros**:
  - 400: ID inválido ou erro no servidor.
  - 401: Não autenticado.
  - 403: Acesso negado (não é o dono do perfil).
  - 404: Usuário não encontrado.

#### 3. PATCH /api/user/

- **Descrição**: Atualiza informações de um usuário existente (requer
  autenticação; apenas o próprio usuário pode atualizar).
- **Parâmetros (Body)**:
  - `newEmail` (string, opcional): Novo Email.
  - `fullName` (string, opcional): Novo nome completo.
  - `phoneNumber` (string, opcional): Novo número de telefone.
  - `password` (string, opcional): Nova senha (será hasheada).
- **Exemplo do Body da Requisição**:

  ```
  {
    "newEmail": "john@dzigual.com.br"
  }
  ```

- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "message": "updated_operation_successful",
    "user": {
      "id": "408fa876-8a89-48bd-883a-0e111bfbd09a",
      "email": "john@dzigual.com.br",
      "fullName": "John Test",
      "phoneNumber": "00000000000",
      "updatedAt": "2025-11-03T03:47:40.359Z",
      "createdAt": "2025-11-03T03:12:54.036Z"
    }
  }
  ```
- **Erros**:
  - 400: Parâmetros inválidos ou erro no servidor.
  - 401: Não autenticado.
  - 403: Acesso negado.
  - 404: Usuário não encontrado.

#### 4. DELETE /api/user/

- **Descrição**: Deletar um usuário do sistema (requer autenticação; apenas o
  próprio usuário).

- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "message": "user_removed_operation_successful"
  }
  ```
- **Erros**:
  - 400: ID inválido ou erro no servidor.
  - 401: Não autenticado.
  - 403: Acesso negado.

### Endpoints de Autenticação

#### 1. POST /api/auth/

- **Descrição**: Autentica um usuário e retorna tokens JWT (access e refresh).
- **Parâmetros (Body)**:
  - `email` (string, obrigatório): Email do usuário.
  - `password` (string, obrigatório): Senha do usuário.
- **Exemplo de Requisição**:

  ```
  {
    "email": "john@dzigual.com.br",
    "password": "senhaSegura123"
  }
  ```

- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "message": "login_operation_successful"
  }
  ```
- **Erros**:
  - 400: Credenciais inválidas ou erro no servidor.
  - 401: Email ou senha incorretos.

#### 2. GET /api/auth/

- **Descrição**: Renova o access token usando o refresh token.
- **Parâmetros (Body)**:

  - `refreshToken` (string, obrigatório): Refresh token válido.

- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "message": "token_create_with_successful"
  }
  ```
- **Erros**:
  - 400: Token inválido ou erro no servidor.
  - 401: Token expirado ou inválido.

#### 3. PUT /api/auth/

- **Descrição**: Invalida o refresh token.

- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "message": "logout_create_with_successful"
  }
  ```
- **Erros**:
  - 400: Token inválido ou erro no servidor.
  - 401: Não autenticado.

### Endpoints de Resources (Raças de Cães)

#### 1. GET /api/resources

- **Descrição**: Retorna uma lista paginada de raças de cães (requer
  autenticação).
- **Parâmetros (Query)**:
  - `page` (number, opcional, default: 1): Número da página.
  - `limit` (number, opcional, default: 5): Itens por página.
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

#### 2. GET /api/resources/:id

- **Descrição**: Retorna detalhes de uma raça específica, incluindo países
  associados e URL de imagem aleatória (requer autenticação).
- **Parâmetros (Path)**:

  - `id` (string, obrigatório): Nome da raça (case-insensitive).

- **Exemplo de Resposta (200 OK)**:
  ```json
  {
    "breed": "labradoodle",
    "imgUrl": "https://dog.ceo/api/breed/labradoodle/images/random",
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
  - 404: Recurso não encontrado (se breed inexistente).

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
- **TypeScript**: Utilizado para desenvolvimento com tipagem estática, reduzindo
  erros em tempo de compilação e melhorando a manutenção do código.
- **Documentação em Código**: Adoção de comentários JSDoc objetivos em cada
  arquivo para descrever módulos, funções, parâmetros e exemplos, facilitando a
  compreensão e colaboração.
- **Estrutura Modular**: Organização do projeto em diretórios separados
  (controllers, services, repositories, routers, etc.), promovendo separação de
  responsabilidades e escalabilidade.

### Pontos de Melhoria

- **Testes**: Adicionar unit/integration tests com Jest/Supertest.
- **Logging**: Integrar Winston ou Pino para logs estruturados.
- **Caching**: Usar Redis para cache de API externa e queries frequentes.
- **CI/CD**: Configurar GitHub Actions para builds/deploys automáticos.
- **Monitoramento**: Adicionar Prometheus/Grafana para métricas.
- **Erros Personalizados**: Expandir MessageMap para mais códigos de erro.
- **GraphQL**: Implantar GraphQL para paginação avançada e queries flexíveis,
  usando Apollo Server.
- **Armazenamento de Tokens**: Migrar token de acesso de cookies para
  localStorage ou memória, facilitando consumo de múltiplos microserviços no
  futuro. RefreshToken segue em cookies com httpOnly.
