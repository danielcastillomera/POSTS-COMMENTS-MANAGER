# Politica de seguridad

## Versiones soportadas

| Version | Soporte activo |
|---------|----------------|
| 1.0.x   | Si             |

## Reportar una vulnerabilidad

Si descubres una vulnerabilidad de seguridad en este proyecto, no abras un issue publico. En su lugar, envia un reporte detallado al propietario del repositorio mediante la funcion de reporte privado de vulnerabilidades de GitHub o por correo electronico.

El reporte debe incluir:

- Descripcion de la vulnerabilidad
- Pasos para reproducirla
- Evaluacion del impacto potencial
- Sugerencia de correccion, si la tienes disponible

Recibiras una respuesta en un plazo maximo de 72 horas confirmando la recepcion. Si la vulnerabilidad se confirma, se priorizara un parche de acuerdo con la severidad del problema.

## Practicas de seguridad aplicadas en este proyecto

### Backend

- Validacion de entrada con `class-validator` en todos los DTOs
- `ValidationPipe` configurado con `whitelist: true` y `forbidNonWhitelisted: true` para eliminar campos no esperados
- CORS configurado para permitir unicamente el origen declarado del frontend
- Variables de entorno para toda la configuracion sensible (sin secretos en el codigo fuente)
- El filtro global de excepciones evita que trazas de error o detalles internos lleguen al cliente en produccion

### Frontend

- El interceptor HTTP sanitiza las respuestas de error antes de mostrarlas en la interfaz
- No se almacena informacion sensible en `localStorage`, unicamente la preferencia de idioma
- Las URLs de la API por entorno evitan exponer datos de produccion durante el desarrollo

### Gestion de dependencias

- Ejecutar `npm audit` periodicamente en ambos proyectos
- Mantener `@nestjs/*`, `@angular/*` y `mongoose` actualizados a sus versiones estables mas recientes

## Aviso

Este proyecto fue entregado como prueba tecnica. Para uso en produccion real se recomienda aplicar medidas adicionales como: limitacion de tasa de solicitudes, autenticacion y autorizacion, HTTPS forzado y cabeceras de seguridad HTTP.
