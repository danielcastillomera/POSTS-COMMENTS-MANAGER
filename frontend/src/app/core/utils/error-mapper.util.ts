import { HttpErrorResponse } from '@angular/common/http';

export function mapErrorToMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const body = error.error as Record<string, unknown> | null;

    if (body && typeof body['message'] === 'string') {
      return body['message'];
    }

    switch (error.status) {
      case 0:
        return 'No se pudo conectar con el servidor. Verifique su conexión.';
      case 400:
        return 'Solicitud inválida. Verifique los datos enviados.';
      case 404:
        return 'El recurso solicitado no fue encontrado.';
      case 409:
        return 'Conflicto: el recurso ya existe.';
      case 422:
        return 'Los datos enviados no son válidos.';
      case 500:
        return 'Error interno del servidor. Intente de nuevo más tarde.';
      default:
        return `Error inesperado (${error.status}). Intente de nuevo.`;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocurrió un error inesperado.';
}
