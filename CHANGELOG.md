# Registro de cambios

Todos los cambios importantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y este proyecto aplica [Semantic Versioning](https://semver.org/lang/es/).

---

## v1.0.4 - Corrección de CORS, implementación completa de RxJS y verificación de todos los requisitos

### Corregido

- **Error 405 en POST /posts y POST /posts/bulk**: la causa raiz era la politica CORS del backend. El preflight OPTIONS que el navegador envia antes de toda peticion POST con body JSON estaba siendo bloqueado porque `origin` se validaba como string exacto. Se cambia la configuracion a `origin: '*'` (apropiado para prueba tecnica), que elimina el bloqueo del preflight y permite todos los metodos incluyendo OPTIONS
- **`ParseArrayPipe` en `POST /posts/bulk`**: el endpoint de carga masiva ahora usa `@Body(new ParseArrayPipe({ items: CreatePostDto }))` para que el `ValidationPipe` global valide correctamente cada elemento del array recibido, en lugar de intentar validar el array completo como un unico DTO
- **`environment.prod.ts`**: agregado comentario explicito indicando el formato exacto de la URL de Railway que debe configurarse antes del build de produccion

### Agregado

- **`combineLatest` en `PostDetailComponent`**: el post y sus comentarios se cargan ahora en paralelo con `combineLatest([getOne(), getByPost()])`, reduciendo el tiempo total de carga y cumpliendo el requisito obligatorio del operador
- **`switchMap` en `PostsListComponent`**: la recarga de publicaciones pasa ahora por un `Subject` + `switchMap`, garantizando que si se solicita una recarga antes de que la anterior termine, la peticion previa se cancela automaticamente
- **`switchMap` en `PostFormComponent`**: la carga del post en modo edicion usa `of(id).pipe(filter(Boolean), switchMap(...))`, patron correcto para encadenar dependencias de observables

### Verificacion de requisitos cumplidos

| Requisito | Estado |
|-----------|--------|
| Estructura backend (modulos, DTOs, schemas, common/) | Implementado |
| Modelos Post y Comment con todos los campos requeridos | Implementado |
| CRUD completo de posts (GET, GET/:id, POST, PUT, DELETE) | Implementado |
| CRUD de comentarios (GET?postId, POST, DELETE) | Implementado |
| POST /posts/bulk con insertMany y validacion por DTO | Implementado |
| Global Exception Filter estandarizado | Implementado |
| Clase ApiResponse (success, error) | Implementado |
| Estructura frontend (core, shared, features) | Implementado |
| Listado de posts con titulo, autor, fecha y botones | Implementado |
| Detalle del post con comentarios | Implementado |
| Formulario reactivo crear/editar (title min3, body min10, author requerido) | Implementado |
| Formulario de comentario con actualizacion instantanea | Implementado |
| Signals: posts, search, filteredPosts (computed) | Implementado |
| RxJS: switchMap | Implementado |
| RxJS: tap | Implementado |
| RxJS: catchError | Implementado |
| RxJS: delay | Implementado |
| RxJS: combineLatest | Implementado |
| RxJS: retry | Implementado |
| HttpInterceptor global de errores | Implementado |
| Servicio de mapeo de errores (error-mapper) | Implementado |
| Estados vacios, loading states, mensajes de error | Implementado |
| Tailwind CSS | Implementado |
| Pipes personalizados (TranslatePipe) | Implementado |
| Directivas reutilizables (ClickOutsideDirective) | Implementado |
| Docker para backend | Implementado |
| Internacionalizacion es-MX / en-US | Implementado (mejora adicional) |

---

## v1.0.3 - Corrección de toasts falsos, tildes completas y mejoras en el selector de idioma

### Corregido

- `httpErrorInterceptor`: solo muestra toasts para errores HTTP reales (status >= 400)
- `I18nService`: ruta de archivos de traduccion cambiada a absoluta (`/assets/i18n/`)
- Todos los textos en Español (México) corregidos con tildes completas
- `LanguageSwitcherComponent`: apertura por hover, titulo "Cambiar idioma" y nombres completos de idioma

---

## v1.0.2 - Corrección de despliegue en Vercel y traducción de documentación al Español

### Corregido

- `vercel.json` raiz: eliminado conflicto de `buildCommand`
- `frontend/vercel.json`: configuracion completa para despliegue con directorio raiz en `frontend`
- Toda la documentacion traducida al Español (México)

---

## v1.0.1 - Corrección del Dockerfile para instalación sin package-lock.json

### Corregido

- `backend/Dockerfile`: reemplazado `npm ci` por `npm install --omit=dev`
- Generado `backend/package-lock.json` para instalaciones reproducibles

---

## v1.0.0 - Lanzamiento inicial del sistema de gestión de publicaciones y comentarios

### Agregado

- Backend NestJS + MongoDB con CRUD completo de posts y comentarios
- Frontend Angular 18+ con arquitectura standalone y Tailwind CSS
- Endpoint de carga masiva `POST /api/v1/posts/bulk`
- Angular Signals, formularios reactivos, RxJS, interceptores globales
- Internacionalizacion Español (México) e Inglés (Estados Unidos)
- Docker y Docker Compose para el backend
- Coleccion de Postman y datos de ejemplo para carga masiva
