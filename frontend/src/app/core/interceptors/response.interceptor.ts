import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const body = event.body as Record<string, unknown> | null;
        if (body && body['success'] === false) {
          console.warn('[API] Respuesta con success=false:', body['message'], req.url);
        }
      }
    }),
  );
};
