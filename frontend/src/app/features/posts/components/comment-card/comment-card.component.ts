import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment.model';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-comment-card',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-semibold text-slate-800">{{ comment.name }}</p>
          <p class="text-xs text-slate-400">{{ comment.email }}</p>
        </div>
        <div class="flex items-center gap-2">
          <time class="text-xs text-slate-400">{{ formatDate(comment.createdAt) }}</time>
          <button
            class="p-1 rounded text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            (click)="onDelete()"
            [attr.aria-label]="'common.delete' | translate">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>
      </div>
      <p class="text-sm text-slate-600 leading-relaxed">{{ comment.body }}</p>
    </div>
  `,
})
export class CommentCardComponent {
  @Input({ required: true }) comment!: Comment;
  @Output() readonly deleted = new EventEmitter<string>();

  onDelete(): void {
    this.deleted.emit(this.comment._id);
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
