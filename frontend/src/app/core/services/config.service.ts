import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

interface AppConfig {
  apiUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly http = inject(HttpClient);
  private _apiUrl = environment.apiUrl;

  /** URL base de la API. Disponible tras llamar a load() en APP_INITIALIZER. */
  get apiUrl(): string {
    return this._apiUrl;
  }

  async load(): Promise<void> {
    try {
      const config = await firstValueFrom(
        this.http.get<AppConfig>('/assets/config.json'),
      );
      // Usar el valor de config.json solo si no es el placeholder de ejemplo
      if (
        config.apiUrl &&
        !config.apiUrl.includes('REEMPLAZA-CON-TU-URL') &&
        !config.apiUrl.includes('your-backend-url')
      ) {
        this._apiUrl = config.apiUrl.replace(/\/$/, ''); // elimina barra final si existe
      }
    } catch {
      // Si config.json no existe o falla, usa el valor de environment.ts
      console.warn('[ConfigService] config.json no disponible, usando environment.apiUrl');
    }
  }
}
