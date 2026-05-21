import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, LanguageSwitcherComponent, TranslatePipe],
  template: `
    <header class="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="flex items-center justify-between h-16">
          <a routerLink="/" class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <span class="font-bold text-slate-900 text-sm hidden sm:block">Posts & Comments</span>
          </a>

          <nav class="hidden md:flex items-center gap-1">
            <a routerLink="/posts" routerLinkActive="text-blue-600 bg-blue-50"
               [routerLinkActiveOptions]="{exact: true}"
               class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              {{ 'nav.posts' | translate }}
            </a>
            <a routerLink="/posts/new" routerLinkActive="text-blue-600 bg-blue-50"
               class="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors">
              {{ 'nav.newPost' | translate }}
            </a>
          </nav>

          <div class="flex items-center gap-3">
            <app-language-switcher />
            <button
              class="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              (click)="menuOpen.set(!menuOpen())"
              [attr.aria-expanded]="menuOpen()"
              aria-label="Toggle menu">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  [attr.d]="menuOpen() ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"/>
              </svg>
            </button>
          </div>
        </div>

        @if (menuOpen()) {
          <nav class="md:hidden py-2 border-t border-slate-100">
            <a routerLink="/posts" routerLinkActive="text-blue-600 bg-blue-50"
               (click)="menuOpen.set(false)"
               class="flex px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
              {{ 'nav.posts' | translate }}
            </a>
            <a routerLink="/posts/new" routerLinkActive="text-blue-600 bg-blue-50"
               (click)="menuOpen.set(false)"
               class="flex px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100">
              {{ 'nav.newPost' | translate }}
            </a>
          </nav>
        }
      </div>
    </header>
  `,
})
export class NavbarComponent {
  readonly menuOpen = signal(false);
}
