# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | Yes       |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, do not open a public issue. Instead, send a detailed report to the repository owner via GitHub's private vulnerability reporting feature or by email.

Please include:

- A description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Any suggested remediation if available

You will receive a response within 72 hours acknowledging receipt of the report. If the vulnerability is confirmed, a patch will be prioritized accordingly.

## Security Practices Applied in This Project

### Backend

- Input validation using `class-validator` on all DTOs
- `ValidationPipe` configured with `whitelist: true` and `forbidNonWhitelisted: true` to strip unexpected fields
- CORS configured to allow only the declared frontend origin
- Environment variables used for all sensitive configuration (no hardcoded secrets)
- Global exception filter prevents leaking stack traces or internal error details in production

### Frontend

- HTTP interceptor sanitizes error responses before displaying them in the UI
- No sensitive data stored in `localStorage` beyond language preference
- Environment-specific API URLs to prevent accidental production data exposure during development

### Dependency Management

- Dependencies should be audited regularly with `npm audit`
- Keep `@nestjs/*`, `@angular/*`, and `mongoose` packages updated to their latest stable versions

## Disclaimer

This project is provided as a technical evaluation deliverable. For production use, additional hardening measures should be applied, including but not limited to: rate limiting, authentication and authorization, HTTPS enforcement, and security headers.
