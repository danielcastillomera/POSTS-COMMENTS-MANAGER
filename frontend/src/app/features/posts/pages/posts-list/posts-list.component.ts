import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
import { ErrorService } from '../../../../core/services/error.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { BulkUploadComponent } from '../../components/bulk-upload/bulk-upload.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, FormsModule, TranslatePipe,
    LoadingComponent, EmptyStateComponent, PostCardComponent,
    BulkUploadComponent, PaginationComponent,
  ],
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent implements OnInit, OnDestroy {
  private readonly postsService = inject(PostsService);
  private readonly errorService = inject(ErrorService);
  private readonly reload$ = new Subject<{ page: number; limit: number }>();
  private readonly destroy$ = new Subject<void>();

  readonly posts        = signal<Post[]>([]);
  readonly search       = signal('');
  readonly isLoading    = signal(true);
  readonly showBulk     = signal(false);
  readonly currentPage  = signal(1);
  readonly totalPosts   = signal(0);
  readonly limit        = 9;

  readonly filteredPosts = computed(() =>
    this.posts().filter(
      (p) =>
        p.title.toLowerCase().includes(this.search().toLowerCase()) ||
        p.author.toLowerCase().includes(this.search().toLowerCase()),
    ),
  );

  ngOnInit(): void {
    this.reload$
      .pipe(
        switchMap(({ page, limit }) =>
          this.postsService.getAll(page, limit).pipe(
            tap((res) => {
              this.posts.set(res.data);
              this.totalPosts.set(res.meta.total);
              this.currentPage.set(res.meta.page);
              this.isLoading.set(false);
            }),
            catchError((_err) => { this.isLoading.set(false); return of(null); }),
          ),
        ),
      )
      .subscribe();
    this.loadPosts(1);
  }

  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }

  loadPosts(page: number): void {
    this.isLoading.set(true);
    this.search.set('');
    this.reload$.next({ page, limit: this.limit });
  }

  onSearch(value: string): void { this.search.set(value); }

  onPostDeleted(id: string): void {
    this.postsService.remove(id).pipe(
      tap(() => {
        this.posts.update((prev) => prev.filter((p) => p._id !== id));
        this.totalPosts.update((n) => n - 1);
        this.errorService.show('success', 'Publicación eliminada correctamente.');
      }),
      catchError((_err) => of(null)),
    ).subscribe();
  }

  onBulkUploaded(): void { this.showBulk.set(false); this.loadPosts(1); }
  onPageChange(page: number): void { this.loadPosts(page); }
}
