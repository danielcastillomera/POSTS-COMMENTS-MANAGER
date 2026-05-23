import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfigService } from '../../../core/services/config.service';

interface LoginResponse {
  success: boolean;
  message: string;
  data: { token: string; expiresIn: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http   = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly config = inject(ConfigService);
  private readonly TOKEN_KEY = 'auth_token';
  private readonly _isAuthenticated = signal(false);

  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  constructor() {
    this._isAuthenticated.set(!!localStorage.getItem(this.TOKEN_KEY));
  }

  login(email: string, password: string): Observable<void> {
    return this.http
      .post<LoginResponse>(`${this.config.apiUrl}/auth/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem(this.TOKEN_KEY, res.data.token);
          this._isAuthenticated.set(true);
        }),
        map(() => void 0),
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
