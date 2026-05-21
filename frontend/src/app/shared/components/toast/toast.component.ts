import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService, ToastMessage } from '../../../core/services/error.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80"
      aria-live="assertive"
      aria-atomic="true">
      @for (toast of errorService.toasts(); track toast.id) {
        <div
          class="flex items-start gap-3 p-4 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300"
          [class]="toastClass(toast)">
          <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="iconPath(toast.type)" />
          </svg>
          <span class="flex-1">{{ toast.message }}</span>
          <button
            (click)="errorService.dismiss(toast.id)"
            class="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      }
    </div>
  `,
})
export class ToastComponent {
  readonly errorService = inject(ErrorService);

  toastClass(toast: ToastMessage): string {
    const map = {
      error: 'bg-red-50 border-red-200 text-red-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
    };
    return map[toast.type];
  }

  iconPath(type: ToastMessage['type']): string {
    const map = {
      error: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    };
    return map[type];
  }
}
