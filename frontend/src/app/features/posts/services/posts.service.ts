import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, retry, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiResponse, CreatePostPayload, Post, UpdatePostPayload } from '../models/post.model';

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number; hasNext: boolean; hasPrev: boolean };
}

@Injectable({ providedIn: 'root' })
export class PostsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/posts`;

  getAll(page = 1, limit = 9): Observable<PaginatedResponse<Post>> {
    return this.http
      .get<PaginatedResponse<Post>>(this.baseUrl, { params: { page, limit } })
      .pipe(delay(150), retry({ count: 2, delay: 1000 }));
  }

  getOne(id: string): Observable<ApiResponse<Post>> {
    return this.http
      .get<ApiResponse<Post>>(`${this.baseUrl}/${id}`)
      .pipe(retry({ count: 1, delay: 500 }));
  }

  create(payload: CreatePostPayload): Observable<ApiResponse<Post>> {
    return this.http
      .post<ApiResponse<Post>>(this.baseUrl, payload)
      .pipe(tap(() => console.debug('[PostsService] Publicación creada')));
  }

  update(id: string, payload: UpdatePostPayload): Observable<ApiResponse<Post>> {
    return this.http
      .put<ApiResponse<Post>>(`${this.baseUrl}/${id}`, payload)
      .pipe(tap(() => console.debug('[PostsService] Publicación actualizada:', id)));
  }

  remove(id: string): Observable<ApiResponse<null>> {
    return this.http
      .delete<ApiResponse<null>>(`${this.baseUrl}/${id}`)
      .pipe(tap(() => console.debug('[PostsService] Publicación eliminada:', id)));
  }

  bulkCreate(posts: CreatePostPayload[]): Observable<{ success: boolean; message: string; data: { inserted: number; total: number } }> {
    return this.http.post<{ success: boolean; message: string; data: { inserted: number; total: number } }>(
      `${this.baseUrl}/bulk`, posts,
    );
  }
}
