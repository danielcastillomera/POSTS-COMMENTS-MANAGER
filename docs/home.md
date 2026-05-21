# Posts & Comments Manager - Documentation

## Overview

Posts & Comments Manager is a full-stack web application built to manage posts and comments. The system provides a complete CRUD interface backed by a NestJS REST API connected to MongoDB, with an Angular 18+ single-page application as the frontend.

## Project Goals

- Demonstrate clean, modular architecture across both backend and frontend
- Apply Angular 18+ reactive patterns: Signals, computed state, and reactive forms
- Implement robust error handling at every layer
- Deliver a production-ready, responsive UI accessible on any device

## Repository Structure

| Directory | Description |
|-----------|-------------|
| `backend/` | NestJS REST API with Mongoose |
| `frontend/` | Angular 18+ SPA with Tailwind CSS |
| `docs/` | Project documentation (this wiki) |
| `sample-data/` | JSON fixtures for bulk operations |
| `postman/` | Postman collection for API testing |

## Quick Links

- [Architecture Overview](architecture.md)
- [Deployment Guide](deployment.md)
- [Internationalization](i18n.md)
- [Accessibility](accessibility.md)

## Technology Summary

### Backend

- **NestJS 10** with modular architecture
- **Mongoose 8** for MongoDB object modeling
- **class-validator** for DTO validation
- **Global Exception Filter** for standardized error responses
- **ApiResponse** utility for consistent response shape

### Frontend

- **Angular 18+** standalone components
- **Angular Signals** for reactive state management
- **RxJS** for asynchronous data flows
- **Reactive Forms** with built-in validators
- **Tailwind CSS** for utility-first styling
- Custom **i18n service** supporting es-MX and en-US

## Getting Started

See the [README](../README.md) for setup instructions.
