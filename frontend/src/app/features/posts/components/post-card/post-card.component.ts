import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Post } from '../../models/post.model';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe],
  template: `
    <article class="card p-5 flex flex-col gap-3">
      <div class="flex-1">
        <h2 class="font-semibold text-slate-900 line-clamp-2 leading-snug mb-2">
          {{ post.title }}
        </h2>
        <p class="text-sm text-slate-500 line-clamp-3 leading-relaxed">{{ post.body }}</p>
      </div>

      <div class="pt-2 border-t border-slate-100 space-y-3">
        <div class="flex items-center justify-between text-xs text-slate-400">
          <span class="flex items-center gap-1 font-medium text-slate-600">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            {{ post.author }}
          </span>
          <time [dateTime]="post.createdAt">{{ formatDate(post.createdAt) }}</time>
        </div>
        <div class="flex gap-2">
          <a [routerLink]="['/posts', post._id]" class="btn-primary flex-1 text-xs py-1.5">
            {{ 'common.view' | translate }}
          </a>
          <a [routerLink]="['/posts', post._id, 'edit']" class="btn-secondary flex-1 text-xs py-1.5">
            {{ 'common.edit' | translate }}
          </a>
          <button
            class="btn-danger text-xs py-1.5 px-3"
            (click)="onDelete()"
            [attr.aria-label]="'common.delete' | translate">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `,
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  @Output() readonly deleted = new EventEmitter<string>();

  onDelete(): void {
    if (confirm(`Eliminar el post "${this.post.title}"?`)) {
      this.deleted.emit(this.post._id);
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
