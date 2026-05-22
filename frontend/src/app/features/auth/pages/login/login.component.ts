import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, TranslatePipe],
  template: `
    <div class="min-h-[80vh] flex items-center justify-center">
      <div class="w-full max-w-sm">
        <div class="text-center mb-8">
          <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-slate-900">{{ 'auth.title' | translate }}</h1>
          <p class="text-sm text-slate-500 mt-1">{{ 'auth.subtitle' | translate }}</p>
        </div>

        <div class="card p-6">
          <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="space-y-4">
            <div>
              <label for="email" class="form-label">{{ 'auth.email' | translate }}</label>
              <input id="email" type="email" formControlName="email" class="form-field"
                placeholder="admin@posts-manager.com" />
              @if (form.controls.email.invalid && form.controls.email.touched) {
                <p class="form-error">{{ 'validation.email' | translate }}</p>
              }
            </div>
            <div>
              <label for="password" class="form-label">{{ 'auth.password' | translate }}</label>
              <input id="password" type="password" formControlName="password" class="form-field"
                placeholder="••••••••" />
              @if (form.controls.password.invalid && form.controls.password.touched) {
                <p class="form-error">{{ 'validation.required' | translate }}</p>
              }
            </div>
            <button type="submit" class="btn-primary w-full" [disabled]="isLoading()">
              @if (isLoading()) {
                <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              }
              {{ 'auth.submit' | translate }}
            </button>
          </form>
        </div>

        <p class="text-center text-xs text-slate-400 mt-6">
          <a routerLink="/posts" class="hover:text-slate-600 transition-colors">
            {{ 'auth.backToList' | translate }}
          </a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);

  readonly form = this.fb.nonNullable.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.isLoading.set(true);
    const { email, password } = this.form.getRawValue();
    this.auth.login(email, password).pipe(
      tap(() => { this.router.navigate(['/posts']); }),
      catchError((_err) => { this.isLoading.set(false); return of(null); }),
    ).subscribe();
  }
}
