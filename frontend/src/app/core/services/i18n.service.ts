import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type Language = 'es-MX' | 'en-US';

type TranslationMap = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);
  private readonly _lang = signal<Language>('es-MX');
  private _translations: TranslationMap = {};

  readonly currentLang = this._lang.asReadonly();

  async initialize(): Promise<void> {
    const saved = localStorage.getItem('app_lang') as Language | null;
    const lang: Language = saved === 'en-US' ? 'en-US' : 'es-MX';
    await this.loadLanguage(lang);
  }

  async switchLanguage(lang: Language): Promise<void> {
    await this.loadLanguage(lang);
    localStorage.setItem('app_lang', lang);
  }

  translate(key: string): string {
    const parts = key.split('.');
    let node: unknown = this._translations;
    for (const part of parts) {
      if (typeof node !== 'object' || node === null) return key;
      node = (node as Record<string, unknown>)[part];
    }
    return typeof node === 'string' ? node : key;
  }

  private async loadLanguage(lang: Language): Promise<void> {
    try {
      // Ruta absoluta para garantizar resolucion correcta en produccion (Vercel).
      const data = await firstValueFrom(
        this.http.get<TranslationMap>(`/assets/i18n/${lang}.json`),
      );
      this._translations = data;
      this._lang.set(lang);
    } catch {
      console.error(`No se pudo cargar el idioma: ${lang}`);
    }
  }
}
