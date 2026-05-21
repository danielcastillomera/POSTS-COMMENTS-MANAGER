# Deployment Guide

## Frontend - Vercel

The frontend is a static Angular SPA and deploys to Vercel with zero configuration.

### Steps

1. Push the repository to GitHub (already public at `github.com/danielcastillomera/POSTS-COMMENTS-MANAGER`).
2. Import the repository on [vercel.com](https://vercel.com).
3. Set the root directory to `frontend`.
4. Vercel detects Angular and runs `npm run build` automatically.
5. Set the environment variable (or update `environment.prod.ts`) with your backend URL.

The `vercel.json` at the project root handles SPA routing rewrites.

### Environment Variable

Before deploying, update `frontend/src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.com/api/v1',
};
```

## Backend - Docker

### Prerequisites

- Docker >= 24
- Docker Compose >= 2

### Run with Docker Compose

```bash
cd backend
cp .env.example .env
# Edit .env if needed
docker-compose up -d
```

This starts two containers:
- `posts-manager-api` on port `3000`
- `posts-manager-db` (MongoDB 7) on port `27017`

### Build only the API image

```bash
cd backend
docker build -t posts-manager-api .
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://your-mongo-host:27017/posts-manager \
  -e FRONTEND_URL=https://your-frontend.vercel.app \
  posts-manager-api
```

## Backend - Railway / Render (alternative)

Both Railway and Render support NestJS deployments directly from GitHub.

1. Connect your GitHub repository.
2. Set root directory to `backend`.
3. Set build command: `npm install && npm run build`.
4. Set start command: `npm run start:prod`.
5. Add environment variables: `MONGODB_URI`, `FRONTEND_URL`, `PORT`.

## Updating CORS After Deployment

After the frontend is deployed, update the `FRONTEND_URL` environment variable on the backend to match the Vercel URL (e.g. `https://posts-comments-manager.vercel.app`).
