# Architecture Overview

## System Architecture

The application follows a client-server architecture with clear separation of concerns between the frontend and backend layers.

```
Browser (Angular SPA)
       |
       | HTTP/REST (JSON)
       |
NestJS API (port 3000)
       |
       | Mongoose ODM
       |
MongoDB (port 27017)
```

## Backend Architecture

The NestJS backend follows a modular, layered architecture:

```
src/
  app.module.ts          - Root module, wires dependencies
  main.ts                - Bootstrap, global pipes and filters
  posts/
    posts.module.ts      - Feature module
    posts.controller.ts  - Route handlers, HTTP layer
    posts.service.ts     - Business logic
    dto/                 - Data Transfer Objects with validation
    schemas/             - Mongoose document schemas
  comments/              - Same structure as posts
  common/
    filters/             - Global exception filter
    interceptors/        - Response transformation
    responses/           - ApiResponse utility
```

### Design Decisions

- **Global Exception Filter** catches all unhandled errors and normalizes responses to `{ success, message, status }`.
- **ResponseInterceptor** wraps successful responses that are not already in API format.
- **ValidationPipe** is global with `whitelist: true` to strip unknown properties and prevent injection.
- The `POST /posts/bulk` route is declared **before** `GET /posts/:id` in the controller to prevent routing conflicts.

## Frontend Architecture

The Angular frontend uses standalone components organized by feature:

```
src/app/
  core/
    interceptors/        - HTTP error interceptor (functional)
    services/            - I18nService, ErrorService
    utils/               - Error mapper
  shared/
    components/          - Reusable UI components
    pipes/               - TranslatePipe
    directives/          - ClickOutsideDirective
  features/
    posts/
      pages/             - Routed page components
      components/        - Feature-specific dumb components
      services/          - PostsService, CommentsService
      models/            - TypeScript interfaces
  app.config.ts          - Root application configuration
  app.routes.ts          - Lazy-loaded route definitions
```

### State Management Pattern

Signals are used for all local component state:

```typescript
// Reactive state with Angular Signals
readonly posts = signal<Post[]>([]);
readonly search = signal<string>('');
readonly filteredPosts = computed(() =>
  posts().filter(p =>
    p.title.toLowerCase().includes(search().toLowerCase())
  )
);
```

### Error Handling Flow

```
HTTP Request
    -> HttpClient
    -> httpErrorInterceptor (catches HttpErrorResponse)
    -> ErrorService.handle()
    -> mapErrorToMessage() (status code mapping)
    -> ToastComponent (user-visible notification)
```

## API Response Contract

All API responses conform to the following shape:

Success:
```json
{ "success": true, "message": "OK", "data": { ... } }
```

Error:
```json
{ "success": false, "message": "Human-readable error", "status": 404 }
```
