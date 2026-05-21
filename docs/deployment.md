# Guia de despliegue

## Arquitectura de produccion recomendada

| Capa | Servicio | Costo |
|------|----------|-------|
| Base de datos | MongoDB Atlas (M0) | Gratuito |
| Backend (NestJS) | Railway | Gratuito (credito mensual) |
| Frontend (Angular) | Vercel | Gratuito |

---

## Paso 1 — MongoDB Atlas (base de datos)

1. Crear cuenta en [cloud.mongodb.com](https://cloud.mongodb.com).
2. Crear un nuevo proyecto y dentro de el un cluster **M0 Free**.
3. En **Database Access**, crear un usuario con contrasena segura. Guardar las credenciales.
4. En **Network Access**, agregar la entrada `0.0.0.0/0` (permitir acceso desde cualquier IP). Esto es necesario para que Railway pueda conectarse.
5. En el cluster, click en **Connect** > **Drivers**. Copiar el string de conexion y reemplazar `<password>` con la contrasena creada. Agregar el nombre de la base de datos antes del signo `?`:

```
mongodb+srv://usuario:contrasena@cluster.xxxxx.mongodb.net/posts-manager?retryWrites=true&w=majority
```

Este valor es el `MONGODB_URI` que se usara en Railway.

---

## Paso 2 — Backend en Railway

1. Crear cuenta en [railway.app](https://railway.app) con GitHub.
2. Crear nuevo proyecto > **Deploy from GitHub repo** > seleccionar el repositorio.
3. En el servicio creado > **Settings** > **Root Directory**: escribir `backend`.
4. En la pestana **Variables**, agregar las siguientes:

| Variable | Valor |
|----------|-------|
| `MONGODB_URI` | String de conexion de Atlas (Paso 1) |
| `PORT` | `3000` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | Agregar despues con la URL de Vercel |

5. En **Settings** > **Networking** > **Generate Domain**. Copiar la URL generada (ejemplo: `https://posts-manager-api.up.railway.app`). Esta es la URL del backend.
6. Verificar en **Deploy Logs** que aparezca `Application running on port 3000`.

### Solucion al error de IP en MongoDB Atlas

Si Railway muestra el error `MongooseServerSelectionError: Could not connect to any servers`:

1. Ir a MongoDB Atlas > **Network Access**.
2. Click en **Add IP Address**.
3. Seleccionar **Allow Access from Anywhere** o ingresar `0.0.0.0/0` manualmente.
4. Guardar. Railway reintentara la conexion automaticamente.

---

## Paso 3 — Configurar la URL del backend en el frontend

Antes de desplegar el frontend, actualizar el archivo `frontend/src/environments/environment.prod.ts` con la URL de Railway obtenida en el Paso 2:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://posts-manager-api.up.railway.app/api/v1',
};
```

Hacer commit y push:

```bash
git add frontend/src/environments/environment.prod.ts
git commit -m "chore: configurar URL de API en produccion"
git push
```

---

## Paso 4 — Frontend en Vercel

### Opcion A: desplegar desde la raiz del repositorio (recomendado)

1. Crear cuenta en [vercel.com](https://vercel.com) con GitHub.
2. Click en **Add New Project** > importar el repositorio.
3. **No cambiar** el directorio raiz (dejarlo en la raiz del repositorio).
4. Vercel leera el `vercel.json` de la raiz automaticamente, que ya contiene:

```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist/frontend/browser",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

5. Click en **Deploy**.

### Opcion B: desplegar con directorio raiz en `frontend`

1. En la configuracion del proyecto en Vercel, establecer **Root Directory** en `frontend`.
2. Vercel usara el `frontend/vercel.json` que contiene:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/frontend/browser",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

3. Click en **Deploy**.

---

## Paso 5 — Actualizar CORS en Railway

Una vez que Vercel asigne la URL del frontend (ejemplo: `https://posts-comments-manager.vercel.app`), volver a Railway y actualizar la variable:

| Variable | Valor |
|----------|-------|
| `FRONTEND_URL` | `https://posts-comments-manager.vercel.app` |

Railway redespliega automaticamente con el nuevo valor de CORS.

---

## Verificacion final

```
# 1. El backend responde correctamente
GET https://posts-manager-api.up.railway.app/api/v1/posts

# 2. El frontend carga sin errores
https://posts-comments-manager.vercel.app

# 3. Crear una publicacion desde la interfaz y verificar que aparece en la lista
```
