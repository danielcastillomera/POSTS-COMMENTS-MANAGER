import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { responseInterceptor } from './core/interceptors/response.interceptor';
import { I18nService } from './core/services/i18n.service';

function initializeI18n(i18n: I18nService) {
  return () => i18n.initialize();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        authInterceptor,      // 1. Agrega Bearer token si existe
        responseInterceptor,  // 2. Registra respuestas en consola
        httpErrorInterceptor, // 3. Muestra toast solo para errores >= 400
      ]),
    ),
    provideAnimations(),
    { provide: APP_INITIALIZER, useFactory: initializeI18n, deps: [I18nService], multi: true },
  ],
};
