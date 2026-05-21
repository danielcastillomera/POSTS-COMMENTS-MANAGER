import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { ApiResponse, Comment, CreateCommentPayload } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class CommentsService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/comments`;

  getByPost(postId: string): Observable<ApiResponse<Comment[]>> {
    return this.http.get<ApiResponse<Comment[]>>(this.baseUrl, {
      params: { postId },
    });
  }

  create(payload: CreateCommentPayload): Observable<ApiResponse<Comment>> {
    return this.http
      .post<ApiResponse<Comment>>(this.baseUrl, payload)
      .pipe(tap(() => console.debug('Comment created')));
  }

  remove(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/${id}`);
  }
}
