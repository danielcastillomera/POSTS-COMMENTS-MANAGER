# Arquitectura del sistema

## Vision general

La aplicacion sigue una arquitectura cliente-servidor con separacion clara de responsabilidades entre el frontend y el backend.

```
Navegador (Angular SPA)
        |
        | HTTP/REST (JSON)
        |
API NestJS (puerto 3000)
        |
        | Mongoose ODM
        |
MongoDB (puerto 27017)
```

## Arquitectura del backend

El backend en NestJS sigue una arquitectura modular por capas:

```
src/
  app.module.ts          - Modulo raiz, conecta dependencias
  main.ts                - Bootstrap, pipes y filtros globales
  posts/
    posts.module.ts      - Modulo de la funcionalidad
    posts.controller.ts  - Manejadores de rutas, capa HTTP
    posts.service.ts     - Logica de negocio
    dto/                 - Objetos de transferencia de datos con validacion
    schemas/             - Esquemas de documentos Mongoose
  comments/              - Misma estructura que posts
  common/
    filters/             - Filtro global de excepciones
    interceptors/        - Transformacion de respuestas
    responses/           - Clase utilitaria ApiResponse
```

### Decisiones de diseno

- El **filtro global de excepciones** captura todos los errores no controlados y normaliza las respuestas al formato `{ success, message, status }`.
- El **ResponseInterceptor** envuelve las respuestas exitosas que no estan en formato API.
- El **ValidationPipe** es global con `whitelist: true` para eliminar propiedades desconocidas y prevenir inyecciones.
- La ruta `POST /posts/bulk` se declara **antes** de `GET /posts/:id` en el controlador para evitar conflictos de enrutamiento.

## Arquitectura del frontend

El frontend Angular usa componentes independientes organizados por funcionalidad:

```
src/app/
  core/
    interceptors/        - Interceptor HTTP de errores (funcional)
    services/            - I18nService, ErrorService
    utils/               - Mapeador de errores
  shared/
    components/          - Componentes de interfaz reutilizables
    pipes/               - TranslatePipe
    directives/          - ClickOutsideDirective
  features/
    posts/
      pages/             - Componentes de pagina con enrutamiento
      components/        - Componentes presentacionales de la funcionalidad
      services/          - PostsService, CommentsService
      models/            - Interfaces TypeScript
  app.config.ts          - Configuracion raiz de la aplicacion
  app.routes.ts          - Definicion de rutas con carga diferida
```

### Patron de gestion del estado

Se usan Signals para todo el estado local de los componentes:

```typescript
readonly posts = signal<Post[]>([]);
readonly search = signal<string>('');
readonly filteredPosts = computed(() =>
  posts().filter(p =>
    p.title.toLowerCase().includes(search().toLowerCase())
  )
);
```

### Flujo de manejo de errores

```
Solicitud HTTP
    -> HttpClient
    -> httpErrorInterceptor (captura HttpErrorResponse)
    -> ErrorService.handle()
    -> mapErrorToMessage() (mapeo por codigo de estado)
    -> ToastComponent (notificacion visible al usuario)
```

## Contrato de respuesta de la API

Todas las respuestas de la API siguen este formato:

Exito:
```json
{ "success": true, "message": "OK", "data": { ... } }
```

Error:
```json
{ "success": false, "message": "Descripcion del error", "status": 404 }
```
