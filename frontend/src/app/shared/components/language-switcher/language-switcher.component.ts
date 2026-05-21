import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nService, Language } from '../../../core/services/i18n.service';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  template: `
    <div
      class="relative"
      (mouseenter)="isOpen.set(true)"
      (mouseleave)="isOpen.set(false)"
      (appClickOutside)="isOpen.set(false)">

      <!-- Trigger -->
      <button
        class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600
               hover:bg-slate-100 border border-slate-200 transition-colors select-none"
        (click)="isOpen.set(!isOpen())"
        [attr.aria-expanded]="isOpen()"
        aria-haspopup="listbox">
        <span class="text-base leading-none">{{ currentOption().flag }}</span>
        <span class="hidden sm:block text-slate-700">{{ currentOption().label }}</span>
        <svg
          class="w-3 h-3 text-slate-400 transition-transform duration-200"
          [class.rotate-180]="isOpen()"
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <!-- Dropdown -->
      @if (isOpen()) {
        <div
          class="absolute right-0 mt-1 w-52 bg-white border border-slate-200 rounded-xl shadow-lg
                 py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          role="listbox"
          [attr.aria-label]="headerLabel()">

          <!-- Titulo del dropdown -->
          <div class="px-3 py-2 border-b border-slate-100">
            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              {{ headerLabel() }}
            </p>
          </div>

          @for (option of languages; track option.code) {
            <button
              role="option"
              class="w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-slate-50
                     transition-colors text-left"
              [class.text-blue-600]="i18n.currentLang() === option.code"
              [class.font-semibold]="i18n.currentLang() === option.code"
              [class.text-slate-700]="i18n.currentLang() !== option.code"
              [attr.aria-selected]="i18n.currentLang() === option.code"
              (click)="select(option.code)">
              <span class="text-xl leading-none">{{ option.flag }}</span>
              <span class="flex-1">{{ option.label }}</span>
              @if (i18n.currentLang() === option.code) {
                <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                </svg>
              }
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class LanguageSwitcherComponent {
  readonly i18n = inject(I18nService);
  readonly isOpen = signal(false);

  readonly languages: LanguageOption[] = [
    { code: 'es-MX', label: 'Español (México)',          flag: '🇲🇽' },
    { code: 'en-US', label: 'Inglés (Estados Unidos)',   flag: '🇺🇸' },
  ];

  currentOption(): LanguageOption {
    return (
      this.languages.find((l) => l.code === this.i18n.currentLang()) ??
      this.languages[0]
    );
  }

  headerLabel(): string {
    return this.i18n.currentLang() === 'es-MX' ? 'Cambiar idioma' : 'Change language';
  }

  async select(lang: Language): Promise<void> {
    this.isOpen.set(false);
    await this.i18n.switchLanguage(lang);
  }
}
