# Registro de cambios

Todos los cambios importantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y este proyecto aplica [Semantic Versioning](https://semver.org/lang/es/).

---

## v1.0.5 - Autenticación JWT, paginación real, extras completos y corrección de errores de compilación

### Corregido

- **Error de compilación en Vercel**: `post-detail.component.html` referenciaba `isLoadingPost()` e `isLoadingComments()` que ya no existían tras la refactorización a `combineLatest` en v1.0.4. Ahora usa la señal unificada `isLoading()`
- **Error 404 en la URL raíz de Railway**: la API respondía con `404 Cannot GET /` porque el prefijo global `api/v1` no cubría la ruta raíz. Se agregó una ruta de estado en `/` que retorna información de la API sin interferir con el prefijo global

### Agregado

- **Autenticación JWT**: módulo `AuthModule` en NestJS con `POST /api/v1/auth/login`. Credenciales configurables mediante variables de entorno (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`). Las rutas de escritura (POST, PUT, DELETE) están protegidas con `@UseGuards(JwtAuthGuard)`. El frontend incluye página de inicio de sesión, `AuthService` con señales, `authInterceptor` que agrega el token `Bearer` a cada petición, y `authGuard` para proteger rutas en Angular
- **Paginación real**: `GET /posts` acepta parámetros `page` y `limit` (predeterminado: 9 por página). El backend retorna un campo `meta` con `total`, `totalPages`, `hasNext` y `hasPrev`. El frontend incluye el componente `PaginationComponent` integrado en la lista de publicaciones. La paginación se oculta automáticamente cuando el usuario activa el filtro de búsqueda
- **Interceptor de respuesta en Angular** (`responseInterceptor`): registra en consola las respuestas de la API con `success: false` para facilitar la depuración sin mostrar toasts innecesarios
- **Pipe `DateAgoPipe`**: convierte fechas a formato relativo ("hace 2 días", "hace 1 hora") con soporte para es-MX y en-US. Registrado como `standalone` y marcado como `pure: false` para actualizarse automáticamente
- **Pipe `TruncatePipe`**: trunca textos largos a un límite de caracteres configurable con sufijo personalizable
- **Directiva `AutoFocusDirective`**: aplica foco automático a un elemento del DOM al montarse, con retraso configurable en milisegundos mediante la propiedad de entrada `[appAutoFocus]`
- **Pruebas unitarias de backend** (`posts.service.spec.ts`): cubren `findAll`, `create`, `findOne` y `bulkCreate` con mocks de Mongoose usando Jest
- **Pruebas unitarias de frontend** (`posts.service.spec.ts`): cubren `getAll`, `create` y `remove` con `HttpClientTestingModule` de Angular

### Notas sobre variables de entorno

Las variables de entorno en Angular se compilan en el bundle durante el build (`environment.prod.ts`). Vercel **no requiere** configurar variables de entorno para el frontend: el valor de `apiUrl` se fija en el archivo `frontend/src/environments/environment.prod.ts` antes de hacer el commit y push. Railway sí requiere variables de entorno en tiempo de ejecución para el backend (`MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `FRONTEND_URL`, `PORT`).

---

## v1.0.4 - Corrección de CORS, implementación completa de RxJS y verificación de todos los requisitos

### Corregido

- Error 405 en `POST /posts` y `POST /posts/bulk`: CORS cambiado a `origin: '*'` para eliminar bloqueo del preflight OPTIONS
- `ParseArrayPipe` en `POST /posts/bulk` para validar cada elemento del arreglo correctamente
- `environment.prod.ts`: comentario explícito sobre el formato de la URL de Railway

### Agregado

- `combineLatest` en `PostDetailComponent`: carga de post y comentarios en paralelo
- `switchMap` en `PostsListComponent` y `PostFormComponent` con patrones correctos de cancelación

---

## v1.0.3 - Corrección de toasts falsos, tildes completas y mejoras en el selector de idioma

### Corregido

- `httpErrorInterceptor`: solo muestra toasts para errores con status >= 400
- `I18nService`: ruta de archivos de traducción cambiada a absoluta (`/assets/i18n/`)
- Todos los textos en Español (México) corregidos con tildes completas

### Agregado

- `LanguageSwitcherComponent`: apertura por hover, título "Cambiar idioma" y nombres completos de idioma con banderas

---

## v1.0.2 - Corrección de despliegue en Vercel y traducción de documentación al Español

### Corregido

- `vercel.json` raíz: eliminado conflicto de `buildCommand`
- `frontend/vercel.json`: configuración completa para despliegue con directorio raíz en `frontend`
- Toda la documentación traducida al Español (México)

---

## v1.0.1 - Corrección del Dockerfile para instalación sin package-lock.json

### Corregido

- `backend/Dockerfile`: reemplazado `npm ci` por `npm install --omit=dev`
- Generado `backend/package-lock.json` para instalaciones reproducibles

---

## v1.0.0 - Lanzamiento inicial del sistema de gestión de publicaciones y comentarios

### Agregado

- Backend NestJS + MongoDB con CRUD completo de publicaciones y comentarios
- Frontend Angular 18+ con arquitectura standalone y Tailwind CSS
- Endpoint de carga masiva `POST /api/v1/posts/bulk`
- Angular Signals, formularios reactivos, RxJS, interceptores globales
- Internacionalización Español (México) e Inglés (Estados Unidos)
- Docker y Docker Compose para el backend
- Colección de Postman y datos de ejemplo para carga masiva
