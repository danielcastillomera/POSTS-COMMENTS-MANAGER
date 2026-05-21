# Registro de cambios

Todos los cambios importantes de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y este proyecto aplica [Semantic Versioning](https://semver.org/lang/es/).

---

## v1.0.3

### Corregido

- `httpErrorInterceptor`: el interceptor ahora solo muestra notificaciones toast para errores HTTP reales (status >= 400). Las respuestas con status 200 que fallaban al parsear JSON (por ejemplo, durante la carga de archivos de traduccion en produccion) ya no generan alertas de error falsas al iniciar la aplicacion
- `I18nService`: la ruta de carga de archivos de traduccion cambiada de relativa (`assets/i18n/`) a absoluta (`/assets/i18n/`) para garantizar resolucion correcta en todos los entornos de produccion
- Todos los textos en Español (México) corregidos con tildes completas en archivos JSON de traduccion y en strings hardcodeados dentro de los componentes (tildes omitidas en v1.0.0 por restricciones del entorno de generacion)
- `LanguageSwitcherComponent`: el desplegable ahora se abre al pasar el cursor por encima (hover) ademas de al hacer click, con soporte completo en dispositivos moviles mediante click
- `LanguageSwitcherComponent`: el encabezado del desplegable muestra "Cambiar idioma" (es-MX) o "Change language" (en-US) segun el idioma activo
- `LanguageSwitcherComponent`: los elementos del desplegable muestran la bandera del pais y el nombre completo del idioma: Español (México) e Inglés (Estados Unidos)
- `LanguageSwitcherComponent`: el boton de activacion muestra la bandera del idioma activo y su nombre completo
- Dialogos de confirmacion de eliminacion adaptados al idioma activo del usuario

### Nota sobre moneda

Esta aplicacion no maneja valores monetarios, por lo que la configuracion de simbolo de moneda no aplica para este sistema.

---

## v1.0.2

### Corregido

- `vercel.json` raiz: eliminado conflicto de `buildCommand` cuando Vercel usa el directorio raiz del repositorio
- `frontend/vercel.json`: agregados `buildCommand` y `outputDirectory` para funcionar correctamente cuando el directorio raiz en Vercel se establece en `frontend`
- Todos los archivos de documentacion traducidos al Español (México)

### Agregado

- Descripcion funcional del sistema en la documentacion

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
- Angular Signals para gestion reactiva del estado
- Formularios reactivos con validacion del lado del cliente
- Operadores RxJS: `switchMap`, `tap`, `catchError`, `delay`, `retry`
- `HttpInterceptor` funcional para manejo global de errores de API
- Servicio de mapeo de errores con mensajes comprensibles para el usuario
- Soporte de internacionalizacion: Español (México) e Inglés (Estados Unidos)
- Selector de idioma con persistencia en `localStorage`
- Interfaz responsiva con Tailwind CSS
- Estados de carga y estados vacios en todas las vistas
- Sistema de notificaciones tipo toast
- Configuracion de Docker y Docker Compose para el backend
- Configuracion de despliegue en Vercel para el frontend
- Coleccion de Postman con todos los endpoints configurados
- Archivo JSON de ejemplo para carga masiva de publicaciones
