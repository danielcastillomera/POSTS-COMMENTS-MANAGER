import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommentsService } from '../../services/comments.service';
import { Comment } from '../../models/comment.model';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-comment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslatePipe],
  template: `
    <div class="card p-5 space-y-4">
      <h3 class="text-sm font-semibold text-slate-700">{{ 'comments.form.title' | translate }}</h3>
      <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label for="name" class="form-label">{{ 'comments.form.name' | translate }} *</label>
            <input id="name" type="text" formControlName="name" class="form-field"
              [placeholder]="'comments.form.namePlaceholder' | translate" />
            @if (hasError('name', 'required')) {
              <p class="form-error">{{ 'validation.required' | translate }}</p>
            }
          </div>
          <div>
            <label for="email" class="form-label">{{ 'comments.form.email' | translate }} *</label>
            <input id="email" type="email" formControlName="email" class="form-field"
              [placeholder]="'comments.form.emailPlaceholder' | translate" />
            @if (hasError('email', 'required')) {
              <p class="form-error">{{ 'validation.required' | translate }}</p>
            } @else if (hasError('email', 'email')) {
              <p class="form-error">{{ 'validation.email' | translate }}</p>
            }
          </div>
        </div>
        <div>
          <label for="body" class="form-label">{{ 'comments.form.body' | translate }} *</label>
          <textarea id="body" formControlName="body" rows="3" class="form-field resize-none"
            [placeholder]="'comments.form.bodyPlaceholder' | translate"></textarea>
          @if (hasError('body', 'required')) {
            <p class="form-error">{{ 'validation.required' | translate }}</p>
          } @else if (hasError('body', 'minlength')) {
            <p class="form-error">{{ 'validation.minLength5' | translate }}</p>
          }
        </div>
        <button type="submit" class="btn-primary" [disabled]="isSaving()">
          @if (isSaving()) {
            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          }
          {{ 'comments.form.submit' | translate }}
        </button>
      </form>
    </div>
  `,
})
export class CommentFormComponent {
  @Input({ required: true }) postId!: string;
  @Output() readonly commentAdded = new EventEmitter<Comment>();

  private readonly fb = inject(FormBuilder);
  private readonly commentsService = inject(CommentsService);

  readonly isSaving = signal(false);

  readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    body: ['', [Validators.required, Validators.minLength(5)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving.set(true);
    const { name, email, body } = this.form.getRawValue();
    this.commentsService
      .create({ postId: this.postId, name, email, body })
      .pipe(
        tap((res) => {
          this.commentAdded.emit(res.data);
          this.form.reset();
          this.isSaving.set(false);
        }),
        catchError(() => {
          this.isSaving.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  hasError(field: 'name' | 'email' | 'body', error: string): boolean {
    const ctrl = this.form.controls[field];
    return ctrl.hasError(error) && ctrl.touched;
  }
}
