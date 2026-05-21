import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService, Language } from '../../../core/services/i18n.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

interface LanguageOption {
  code: Language;
  label: string;
  short: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  template: `
    <div class="relative" (appClickOutside)="isOpen.set(false)">
      <button
        class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
        (click)="isOpen.set(!isOpen())"
        [attr.aria-expanded]="isOpen()"
        aria-haspopup="listbox">
        <span class="text-base">{{ currentFlag() }}</span>
        <span class="hidden sm:block">{{ currentShort() }}</span>
        <svg class="w-3 h-3 transition-transform" [class.rotate-180]="isOpen()"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      @if (isOpen()) {
        <ul
          role="listbox"
          class="absolute right-0 mt-1 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
          @for (lang of languages; track lang.code) {
            <li
              role="option"
              [attr.aria-selected]="i18n.currentLang() === lang.code"
              (click)="select(lang.code)"
              class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-50 text-sm"
              [class.text-blue-600]="i18n.currentLang() === lang.code"
              [class.font-medium]="i18n.currentLang() === lang.code">
              <span class="text-base">{{ flag(lang.code) }}</span>
              <span>{{ lang.label }}</span>
              @if (i18n.currentLang() === lang.code) {
                <svg class="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              }
            </li>
          }
        </ul>
      }
    </div>
  `,
})
export class LanguageSwitcherComponent {
  readonly i18n = inject(I18nService);
  readonly isOpen = signal(false);

  readonly languages: LanguageOption[] = [
    { code: 'es-MX', label: 'Espanol (Mexico)', short: 'ES' },
    { code: 'en-US', label: 'English (US)', short: 'EN' },
  ];

  flag(code: Language): string {
    return code === 'es-MX' ? '🇲🇽' : '🇺🇸';
  }

  currentFlag(): string {
    return this.flag(this.i18n.currentLang());
  }

  currentShort(): string {
    return this.languages.find((l) => l.code === this.i18n.currentLang())?.short ?? 'ES';
  }

  async select(lang: Language): Promise<void> {
    this.isOpen.set(false);
    await this.i18n.switchLanguage(lang);
  }
}
