# Posts & Comments Manager

A full-stack web application for managing posts and comments, built with Angular 18+ and NestJS backed by MongoDB.

## Technology Stack

- **Frontend**: Angular 18+, TypeScript, Tailwind CSS, Angular Signals, RxJS
- **Backend**: NestJS 10, TypeScript, Mongoose, class-validator
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Repository Structure

```
POSTS-COMMENTS-MANAGER/
├── backend/          # NestJS REST API
├── frontend/         # Angular 18+ SPA
├── docs/             # Project documentation
├── sample-data/      # Sample JSON files for bulk operations
└── postman/          # API collection for testing
```

## Prerequisites

- Node.js >= 20.x
- npm >= 10.x
- MongoDB >= 6.x (or Docker)
- Angular CLI >= 18.x (global install optional)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/danielcastillomera/POSTS-COMMENTS-MANAGER.git
cd POSTS-COMMENTS-MANAGER
```

### 2. Backend setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and preferred port
npm install
npm run start:dev
```

The API will be available at `http://localhost:3000/api/v1`.

### 3. Frontend setup

```bash
cd frontend
npm install
npm run start
```

The application will be available at `http://localhost:4200`.

### 4. Using Docker (backend only)

```bash
cd backend
docker-compose up -d
```

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/posts-manager` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:4200` |

### Frontend (`frontend/src/environments/`)

Update `environment.ts` for development and `environment.prod.ts` for production with the correct backend API URL.

## API Reference

Base URL: `http://localhost:3000/api/v1`

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/posts` | List all posts |
| GET | `/posts/:id` | Get a single post |
| POST | `/posts` | Create a post |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |
| POST | `/posts/bulk` | Bulk create posts |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/comments?postId={id}` | List comments by post |
| POST | `/comments` | Create a comment |
| DELETE | `/comments/:id` | Delete a comment |

## Bulk Upload

Use the sample file at `sample-data/bulk-posts.json` to test bulk post creation via `POST /api/v1/posts/bulk`.

## Deployment

See [docs/deployment.md](docs/deployment.md) for detailed deployment instructions.

## Internationalization

The application supports English (en-US) and Spanish (es-MX). Language selection is persistent via localStorage. See [docs/i18n.md](docs/i18n.md) for details.

## Architecture

See [docs/architecture.md](docs/architecture.md) for a detailed architecture overview.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
