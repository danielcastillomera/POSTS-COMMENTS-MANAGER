import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { httpErrorInterceptor } from './core/interceptors/http-error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { responseInterceptor } from './core/interceptors/response.interceptor';
import { I18nService } from './core/services/i18n.service';
import { ConfigService } from './core/services/config.service';

function initializeApp(config: ConfigService, i18n: I18nService) {
  return async () => {
    await config.load();    // 1. Carga /assets/config.json con la URL del API
    await i18n.initialize(); // 2. Carga /assets/i18n/{lang}.json
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        responseInterceptor,
        httpErrorInterceptor,
      ]),
    ),
    provideAnimations(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService, I18nService],
      multi: true,
    },
  ],
};
