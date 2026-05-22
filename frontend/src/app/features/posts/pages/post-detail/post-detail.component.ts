import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { combineLatest, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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
  readonly isLoading = signal(true);

  ngOnInit(): void {
    this.loadAll();
  }

  // combineLatest: carga el post y sus comentarios en paralelo.
  // Ambas peticiones se disparan simultaneamente; el pipe continua cuando AMBAS completan.
  loadAll(): void {
    this.isLoading.set(true);
    combineLatest([
      this.postsService.getOne(this.id),
      this.commentsService.getByPost(this.id),
    ])
      .pipe(
        tap(([postRes, commentsRes]) => {
          this.post.set(postRes.data);
          this.comments.set(commentsRes.data);
          this.isLoading.set(false);
        }),
        catchError((_err) => {
          this.isLoading.set(false);
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
    const lang = localStorage.getItem('app_lang') ?? 'es-MX';
    const msg =
      lang === 'en-US'
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
    const lang = localStorage.getItem('app_lang') ?? 'es-MX';
    return new Date(date).toLocaleDateString(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
