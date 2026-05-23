# Registro de cambios

Todos los cambios importantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y este proyecto aplica [Semantic Versioning](https://semver.org/lang/es/).

---

## v1.0.6 - Configuración en tiempo de ejecución, corrección de rutas API y compatibilidad con Dependabot

### Corregido

- **Error "Cannot GET /posts", "Cannot POST /auth/login", "Cannot POST /posts/bulk"**: la causa raíz era que `apiUrl` no incluía el prefijo `/api/v1`. Se implementa `ConfigService` que carga `/assets/config.json` en tiempo de ejecución. Ahora el usuario solo edita `frontend/src/assets/config.json` con su URL de Railway (incluyendo `/api/v1`) sin necesidad de recompilar. Si el archivo no está configurado, el servicio usa `environment.apiUrl` como respaldo
- **Error de Dependabot en Vercel** (`ERESOLVE unable to resolve dependency tree`): Dependabot actualizó `@angular/common` a v21 mientras `@angular/core` permanecía en v18, rompiendo la resolución de dependencias. Se agrega `.github/dependabot.yml` que agrupa todos los paquetes `@angular*` en una sola actualización y bloquea cambios de versión mayor y menor para Angular y NestJS
- **Creación de comentarios sin autenticación**: `POST /comments` era incorrecto al requerir JWT. Los comentarios los crea cualquier visitante; solo la eliminación (`DELETE /comments/:id`) requiere sesión de administrador

### Agregado

- **`ConfigService`** (`core/services/config.service.ts`): servicio de configuración en tiempo de ejecución que carga `assets/config.json` antes de cualquier petición al API. Detecta y descarta valores de ejemplo (`REEMPLAZA-CON-TU-URL`) para usar siempre un valor válido
- **`assets/config.json`**: archivo de configuración editable sin rebuild que contiene la `apiUrl`. Es el único archivo que el usuario debe actualizar al desplegar en Vercel
- **`.github/dependabot.yml`**: configuración de Dependabot con agrupación de paquetes Angular y NestJS y restricción a actualizaciones de parche únicamente

### Pasos para configurar tras el despliegue

1. Obtener la URL pública del backend en Railway > tu servicio > **Settings** > **Networking**
2. Editar `frontend/src/assets/config.json`:
   ```json
   { "apiUrl": "https://tu-servicio.up.railway.app/api/v1" }
   ```
3. Agregar en Railway las variables de entorno para JWT:
   - `JWT_SECRET` → cadena aleatoria de al menos 32 caracteres
   - `JWT_EXPIRES_IN` → `24h`
   - `ADMIN_EMAIL` → correo del administrador
   - `ADMIN_PASSWORD` → contraseña del administrador
4. Hacer commit y push. Vercel redespliega automáticamente

---

## v1.0.5 - Autenticación JWT, paginación real, extras completos y corrección de errores de compilación

### Corregido

- **Error de compilación en Vercel**: `post-detail.component.html` referenciaba `isLoadingPost()` e `isLoadingComments()` que ya no existían. Ahora usa la señal unificada `isLoading()`
- **Error 404 en la URL raíz de Railway**: se agregó ruta de estado en `/` que retorna información de la API

### Agregado

- Autenticación JWT completa (backend + frontend)
- Paginación real con 9 publicaciones por página y componente `PaginationComponent`
- Interceptor de respuesta en Angular (`responseInterceptor`)
- Pipes `DateAgoPipe` y `TruncatePipe`
- Directiva `AutoFocusDirective`
- Pruebas unitarias en backend (Jest) y frontend (Karma)

---

## v1.0.4 - Corrección de CORS, implementación completa de RxJS y verificación de todos los requisitos

### Corregido

- Error 405 en `POST /posts` y `POST /posts/bulk`: CORS cambiado a `origin: '*'`
- `ParseArrayPipe` en `POST /posts/bulk` para validar cada elemento del arreglo

### Agregado

- `combineLatest` en `PostDetailComponent`
- `switchMap` en `PostsListComponent` y `PostFormComponent`

---

## v1.0.3 - Corrección de toasts falsos, tildes completas y mejoras en el selector de idioma

### Corregido

- `httpErrorInterceptor`: solo muestra toasts para errores con status >= 400
- `I18nService`: ruta de archivos de traducción cambiada a absoluta
- Todos los textos en Español (México) corregidos con tildes

### Agregado

- `LanguageSwitcherComponent`: apertura por hover, título y nombres completos de idioma con banderas

---

## v1.0.2 - Corrección de despliegue en Vercel y traducción de documentación al Español

### Corregido

- `vercel.json`: eliminado conflicto de `buildCommand`
- Toda la documentación traducida al Español (México)

---

## v1.0.1 - Corrección del Dockerfile para instalación sin package-lock.json

### Corregido

- `backend/Dockerfile`: reemplazado `npm ci` por `npm install --omit=dev`

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
