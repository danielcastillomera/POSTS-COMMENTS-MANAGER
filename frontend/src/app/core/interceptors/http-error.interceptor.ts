import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((err) => {
      // Solo notificar al usuario por errores HTTP reales (4xx y 5xx).
      // Errores de parseo JSON sobre respuestas 2xx no deben mostrarse como toast.
      if (err instanceof HttpErrorResponse && err.status >= 400) {
        errorService.handle(err);
      }
      return throwError(() => err);
    }),
  );
};
