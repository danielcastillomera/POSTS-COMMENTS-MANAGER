import { Injectable, signal } from '@angular/core';
import { mapErrorToMessage } from '../utils/error-mapper.util';

export interface ToastMessage {
  id: number;
  type: 'error' | 'success' | 'info' | 'warning';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private _counter = 0;
  readonly toasts = signal<ToastMessage[]>([]);

  handle(error: unknown): void {
    const message = mapErrorToMessage(error);
    this.show('error', message);
  }

  show(type: ToastMessage['type'], message: string, duration = 5000): void {
    const id = ++this._counter;
    this.toasts.update((prev) => [...prev, { id, type, message }]);
    setTimeout(() => this.dismiss(id), duration);
  }

  dismiss(id: number): void {
    this.toasts.update((prev) => prev.filter((t) => t.id !== id));
  }
}
