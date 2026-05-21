import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';
import { ErrorService } from '../../../../core/services/error.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { CommentFormComponent } from '../../components/comment-form/comment-form.component';
import { CommentCardComponent } from '../../components/comment-card/comment-card.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TranslatePipe,
    LoadingComponent,
    CommentFormComponent,
    CommentCardComponent,
  ],
  templateUrl: './post-detail.component.html',
})
export class PostDetailComponent implements OnInit {
  @Input() id!: string;

  private readonly postsService = inject(PostsService);
  private readonly commentsService = inject(CommentsService);
  private readonly errorService = inject(ErrorService);
  private readonly router = inject(Router);

  readonly post = signal<Post | null>(null);
  readonly comments = signal<Comment[]>([]);
  readonly isLoadingPost = signal(true);
  readonly isLoadingComments = signal(false);

  ngOnInit(): void {
    this.loadPost();
  }

  loadPost(): void {
    this.isLoadingPost.set(true);
    this.postsService
      .getOne(this.id)
      .pipe(
        tap((res) => {
          this.post.set(res.data);
          this.isLoadingPost.set(false);
          this.loadComments();
        }),
        catchError((_err) => {
          this.isLoadingPost.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  loadComments(): void {
    this.isLoadingComments.set(true);
    this.commentsService
      .getByPost(this.id)
      .pipe(
        tap((res) => {
          this.comments.set(res.data);
          this.isLoadingComments.set(false);
        }),
        catchError((_err) => {
          this.isLoadingComments.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  onCommentAdded(comment: Comment): void {
    this.comments.update((prev) => [comment, ...prev]);
    this.errorService.show('success', 'Comentario publicado correctamente.');
  }

  onCommentDeleted(id: string): void {
    this.commentsService
      .remove(id)
      .pipe(
        tap(() => {
          this.comments.update((prev) => prev.filter((c) => c._id !== id));
          this.errorService.show('success', 'Comentario eliminado.');
        }),
        catchError((_err) => of(null)),
      )
      .subscribe();
  }

  deletePost(): void {
    const msg =
      this.i18nLang() === 'en-US'
        ? 'Are you sure you want to delete this post?'
        : '¿Confirmas que deseas eliminar esta publicación?';
    if (!confirm(msg)) return;
    this.postsService
      .remove(this.id)
      .pipe(
        tap(() => {
          this.errorService.show('success', 'Publicación eliminada.');
          this.router.navigate(['/posts']);
        }),
        catchError((_err) => of(null)),
      )
      .subscribe();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // Acceso al idioma activo para mensajes confirm()
  private i18nLang(): string {
    return localStorage.getItem('app_lang') ?? 'es-MX';
  }
}
