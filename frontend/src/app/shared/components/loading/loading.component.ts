import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClass" role="status" aria-live="polite" aria-label="Loading">
      <svg
        class="animate-spin text-blue-600"
        [class]="sizeClass"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      @if (label) {
        <span class="text-sm text-slate-500">{{ label }}</span>
      }
    </div>
  `,
})
export class LoadingComponent {
  @Input() label = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() center = true;

  get sizeClass(): string {
    return { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }[this.size];
  }

  get containerClass(): string {
    const base = 'flex flex-col items-center gap-3';
    return this.center ? `${base} justify-center py-12` : `${base}`;
  }
}
