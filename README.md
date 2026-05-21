# Posts & Comments Manager

Aplicacion web full-stack para administrar publicaciones y comentarios, construida con Angular 18+ y NestJS respaldada por MongoDB.

## Tecnologias

- **Frontend**: Angular 18+, TypeScript, Tailwind CSS, Angular Signals, RxJS
- **Backend**: NestJS 10, TypeScript, Mongoose, class-validator
- **Base de datos**: MongoDB (Atlas en produccion)
- **Contenedores**: Docker, Docker Compose

## Estructura del repositorio

```
POSTS-COMMENTS-MANAGER/
├── backend/          # API REST en NestJS
├── frontend/         # SPA en Angular 18+
├── docs/             # Documentacion del proyecto
├── sample-data/      # Archivos JSON de ejemplo para operaciones masivas
└── postman/          # Coleccion de Postman para pruebas de API
```

## Prerequisitos

- Node.js >= 20.x
- npm >= 10.x
- MongoDB >= 6.x (o Docker)

## Inicio rapido

### 1. Clonar el repositorio

```bash
git clone https://github.com/danielcastillomera/POSTS-COMMENTS-MANAGER.git
cd POSTS-COMMENTS-MANAGER
```

### 2. Configurar el backend

```bash
cd backend
cp .env.example .env
# Editar .env con la URI de MongoDB y el puerto deseado
npm install
npm run start:dev
```

La API estara disponible en `http://localhost:3000/api/v1`.

### 3. Configurar el frontend

```bash
cd frontend
npm install
npm run start
```

La aplicacion estara disponible en `http://localhost:4200`.

### 4. Usar Docker (solo backend)

```bash
cd backend
docker-compose up -d
```

## Variables de entorno

### Backend (`backend/.env`)

| Variable | Descripcion | Valor por defecto |
|----------|-------------|-------------------|
| `PORT` | Puerto del servidor | `3000` |
| `MONGODB_URI` | Cadena de conexion a MongoDB | `mongodb://localhost:27017/posts-manager` |
| `FRONTEND_URL` | Origen permitido por CORS | `http://localhost:4200` |
| `NODE_ENV` | Entorno de ejecucion | `development` |

### Frontend (`frontend/src/environments/`)

Actualizar `environment.prod.ts` con la URL del backend antes de desplegar en produccion.

## Referencia de la API

URL base: `http://localhost:3000/api/v1`

### Publicaciones

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/posts` | Listar todas las publicaciones |
| GET | `/posts/:id` | Obtener una publicacion |
| POST | `/posts` | Crear una publicacion |
| PUT | `/posts/:id` | Actualizar una publicacion |
| DELETE | `/posts/:id` | Eliminar una publicacion |
| POST | `/posts/bulk` | Crear publicaciones en masa |

### Comentarios

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/comments?postId={id}` | Listar comentarios de una publicacion |
| POST | `/comments` | Crear un comentario |
| DELETE | `/comments/:id` | Eliminar un comentario |

## Carga masiva

Usar el archivo `sample-data/bulk-posts.json` como referencia para la operacion `POST /api/v1/posts/bulk`.

## Despliegue

Consultar [docs/deployment.md](docs/deployment.md) para instrucciones detalladas de despliegue en Railway y Vercel.

## Internacionalizacion

La aplicacion soporta Espanol (Mexico) e Ingles (Estados Unidos). La seleccion persiste en `localStorage`. Ver [docs/i18n.md](docs/i18n.md) para detalles.

## Licencia

Este proyecto esta bajo la licencia MIT. Ver [LICENSE](LICENSE) para mas informacion.
