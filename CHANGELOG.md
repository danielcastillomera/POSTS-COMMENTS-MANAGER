# Registro de cambios

Todos los cambios importantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y este proyecto aplica [Semantic Versioning](https://semver.org/lang/es/).

---

## v1.0.2

### Corregido

- `vercel.json` raiz: eliminado conflicto de `buildCommand` cuando Vercel usa el directorio raiz del repositorio
- `frontend/vercel.json`: agregados `buildCommand` y `outputDirectory` para funcionar correctamente cuando el directorio raiz en Vercel se establece en `frontend`
- Todos los archivos de documentacion traducidos al Espanol (Mexico)

### Agregado

- Descripcion funcional del sistema en espanol en la documentacion

---

## v1.0.1

### Corregido

- `backend/Dockerfile`: reemplazado `npm ci` por `npm install --omit=dev` para evitar el error por falta de `package-lock.json`
- Generado `backend/package-lock.json` para instalaciones reproducibles en CI/CD

---

## v1.0.0

### Agregado

- Lanzamiento inicial de Posts & Comments Manager
- Backend NestJS con MongoDB mediante Mongoose
- Frontend Angular 18+ con arquitectura de componentes independientes
- CRUD completo de publicaciones (crear, leer, actualizar, eliminar)
- Administracion de comentarios por publicacion (crear, listar, eliminar)
- Endpoint de carga masiva `POST /api/v1/posts/bulk`
- Filtro global de excepciones con formato de respuesta estandarizado
- Angular Signals para gestion reactiva del estado (`posts`, `search`, `filteredPosts`)
- Formularios reactivos con validacion del lado del cliente
- Operadores RxJS: `switchMap`, `tap`, `catchError`, `delay`, `retry`
- `HttpInterceptor` funcional para manejo global de errores de API
- Servicio de mapeo de errores con mensajes comprensibles para el usuario
- Soporte de internacionalizacion: Espanol (Mexico) e Ingles (Estados Unidos)
- Selector de idioma con persistencia en `localStorage`
- Interfaz responsiva con Tailwind CSS
- Estados de carga y estados vacios en todas las vistas
- Sistema de notificaciones tipo toast
- Configuracion de Docker y Docker Compose para el backend
- Configuracion de despliegue en Vercel para el frontend
- Coleccion de Postman con todos los endpoints configurados
- Archivo JSON de ejemplo para carga masiva de publicaciones
- Pipe personalizado `TranslatePipe`
- Directiva reutilizable `ClickOutsideDirective`
- Clase utilitaria `ApiResponse` para respuestas estandarizadas
- `HttpExceptionFilter` para normalizacion de errores en el backend
