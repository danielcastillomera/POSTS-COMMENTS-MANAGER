# Posts & Comments Manager - Documentacion

## Descripcion general

Posts & Comments Manager es una aplicacion web full-stack para administrar publicaciones y comentarios. El sistema ofrece una interfaz CRUD completa respaldada por una API REST en NestJS conectada a MongoDB, con una aplicacion de pagina unica en Angular 18+ como frontend.

## Objetivos del proyecto

- Demostrar arquitectura modular limpia en backend y frontend
- Aplicar patrones reactivos de Angular 18+: Signals, estado computado y formularios reactivos
- Implementar manejo robusto de errores en cada capa
- Entregar una interfaz responsiva accesible desde cualquier dispositivo

## Estructura del repositorio

| Directorio | Descripcion |
|------------|-------------|
| `backend/` | API REST en NestJS con Mongoose |
| `frontend/` | SPA en Angular 18+ con Tailwind CSS |
| `docs/` | Documentacion del proyecto |
| `sample-data/` | Datos de ejemplo para operaciones masivas |
| `postman/` | Coleccion de Postman para pruebas de API |

## Accesos rapidos

- [Arquitectura del sistema](architecture.md)
- [Guia de despliegue](deployment.md)
- [Internacionalizacion](i18n.md)
- [Accesibilidad](accessibility.md)

## Resumen tecnologico

### Backend

- **NestJS 10** con arquitectura modular
- **Mongoose 8** para modelado de datos en MongoDB
- **class-validator** para validacion de DTOs
- **Filtro global de excepciones** para respuestas de error estandarizadas
- Clase utilitaria **ApiResponse** para formato de respuesta consistente

### Frontend

- **Angular 18+** con componentes independientes
- **Angular Signals** para gestion reactiva del estado
- **RxJS** para flujos de datos asincronos
- **Formularios reactivos** con validadores integrados
- **Tailwind CSS** para estilos utilitarios
- **Servicio i18n personalizado** compatible con es-MX y en-US

## Inicio rapido

Consultar el [README](../README.md) para instrucciones de instalacion y ejecucion.
