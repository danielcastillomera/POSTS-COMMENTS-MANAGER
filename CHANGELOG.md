# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## v1.0.0

### Added

- Initial release of Posts & Comments Manager
- NestJS backend with MongoDB via Mongoose
- Angular 18+ frontend with standalone component architecture
- Complete CRUD operations for posts (create, read, update, delete)
- Comment management per post (create, list, delete)
- Bulk post creation endpoint (`POST /api/v1/posts/bulk`)
- Global exception filter with standardized API response format
- Angular Signals for reactive state management (`posts`, `search`, `filteredPosts`)
- Reactive forms with client-side validation
- RxJS operators: `switchMap`, `tap`, `catchError`, `delay`, `retry`
- HttpInterceptor for global API error handling
- Error mapping service for user-friendly messages
- Internationalization support: English (en-US) and Spanish (es-MX)
- Language switcher with localStorage persistence
- Tailwind CSS responsive UI
- Loading states and empty state components
- Toast notification system
- Docker and Docker Compose configuration for backend
- Vercel deployment configuration for frontend
- Postman collection for API testing
- Sample JSON file for bulk post upload
- Custom translate pipe
- Click-outside directive
- `ApiResponse` utility class for standardized responses
- `HttpExceptionFilter` for backend error normalization
