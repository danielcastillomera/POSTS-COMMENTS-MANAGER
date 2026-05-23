import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '../../../core/services/config.service';
import { ApiResponse, Comment, CreateCommentPayload } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private readonly http   = inject(HttpClient);
  private readonly config = inject(ConfigService);

  private get baseUrl(): string {
    return `${this.config.apiUrl}/comments`;
  }

  getByPost(postId: string): Observable<ApiResponse<Comment[]>> {
    return this.http.get<ApiResponse<Comment[]>>(this.baseUrl, { params: { postId } });
  }

  create(payload: CreateCommentPayload): Observable<ApiResponse<Comment>> {
    return this.http
      .post<ApiResponse<Comment>>(this.baseUrl, payload)
      .pipe(tap(() => console.debug('[CommentsService] Comentario creado')));
  }

  remove(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
