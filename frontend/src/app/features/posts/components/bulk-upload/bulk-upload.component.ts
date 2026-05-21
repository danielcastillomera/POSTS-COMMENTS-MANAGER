import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { ErrorService } from '../../../../core/services/error.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { CreatePostPayload } from '../../models/post.model';

@Component({
  selector: 'app-bulk-upload',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="card p-5 space-y-4 border-blue-200 bg-blue-50">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-slate-700">{{ 'posts.bulk.title' | translate }}</h3>
        <button class="btn-ghost text-xs py-1" (click)="closed.emit()">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <p class="text-xs text-slate-500">{{ 'posts.bulk.description' | translate }}</p>

      <textarea
        [(ngModel)]="jsonInput"
        rows="8"
        class="form-field font-mono text-xs resize-none bg-white"
        [placeholder]="jsonPlaceholder"
        spellcheck="false">
      </textarea>

      @if (parseError()) {
        <p class="text-xs text-red-600 flex items-center gap-1">
          <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          {{ parseError() }}
        </p>
      }

      <div class="flex gap-3">
        <button class="btn-primary" (click)="upload()" [disabled]="isUploading() || !jsonInput.trim()">
          @if (isUploading()) {
            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          }
          {{ 'posts.bulk.upload' | translate }}
        </button>
        <button class="btn-ghost text-xs" (click)="loadSample()">{{ 'posts.bulk.sample' | translate }}</button>
      </div>
    </div>
  `,
})
export class BulkUploadComponent {
  @Output() readonly uploaded = new EventEmitter<void>();
  @Output() readonly closed = new EventEmitter<void>();

  private readonly postsService = inject(PostsService);
  private readonly errorService = inject(ErrorService);

  jsonInput = '';
  readonly parseError = signal('');
  readonly isUploading = signal(false);

  readonly jsonPlaceholder = `[
  { "title": "Post 1", "body": "Contenido del post 1...", "author": "Usuario 1" },
  { "title": "Post 2", "body": "Contenido del post 2...", "author": "Usuario 2" }
]`;

  loadSample(): void {
    this.jsonInput = `[
  { "title": "Introduccion a NestJS", "body": "NestJS es un framework de Node.js que permite construir aplicaciones escalables y mantenibles del lado del servidor.", "author": "Juan Perez" },
  { "title": "Angular Signals explicado", "body": "Los Signals de Angular son una nueva primitiva de reactividad que permite un control mas fino sobre la deteccion de cambios.", "author": "Maria Lopez" },
  { "title": "MongoDB con Mongoose", "body": "Mongoose es una libreria de modelado de objetos para MongoDB que proporciona una solucion directa basada en esquemas.", "author": "Carlos Ramirez" }
]`;
    this.parseError.set('');
  }

  upload(): void {
    let posts: CreatePostPayload[];
    try {
      const parsed = JSON.parse(this.jsonInput);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        this.parseError.set('El JSON debe ser un arreglo no vacio.');
        return;
      }
      posts = parsed as CreatePostPayload[];
      this.parseError.set('');
    } catch {
      this.parseError.set('JSON invalido. Verifique el formato.');
      return;
    }

    this.isUploading.set(true);
    this.postsService
      .bulkCreate(posts)
      .pipe(
        tap((res) => {
          this.errorService.show('success', res.message);
          this.isUploading.set(false);
          this.jsonInput = '';
          this.uploaded.emit();
        }),
        catchError(() => {
          this.isUploading.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }
}
