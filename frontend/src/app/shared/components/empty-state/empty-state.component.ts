import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center py-16 text-center">
      <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      </div>
      <h3 class="text-base font-semibold text-slate-800 mb-1">{{ title }}</h3>
      <p class="text-sm text-slate-500 max-w-xs mb-6">{{ description }}</p>
      @if (actionLabel && actionRoute) {
        <a [routerLink]="actionRoute" class="btn-primary">{{ actionLabel }}</a>
      }
    </div>
  `,
})
export class EmptyStateComponent {
  @Input() title = 'No hay resultados';
  @Input() description = 'No se encontraron elementos para mostrar.';
  @Input() actionLabel = '';
  @Input() actionRoute = '';
}
