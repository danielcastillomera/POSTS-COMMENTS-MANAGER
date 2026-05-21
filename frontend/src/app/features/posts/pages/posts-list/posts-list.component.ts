import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
import { ErrorService } from '../../../../core/services/error.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { BulkUploadComponent } from '../../components/bulk-upload/bulk-upload.component';

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    TranslatePipe,
    LoadingComponent,
    EmptyStateComponent,
    PostCardComponent,
    BulkUploadComponent,
  ],
  templateUrl: './posts-list.component.html',
})
export class PostsListComponent implements OnInit {
  private readonly postsService = inject(PostsService);
  private readonly errorService = inject(ErrorService);

  readonly posts = signal<Post[]>([]);
  readonly search = signal<string>('');
  readonly isLoading = signal(true);
  readonly showBulkUpload = signal(false);

  readonly filteredPosts = computed(() =>
    this.posts().filter(
      (p) =>
        p.title.toLowerCase().includes(this.search().toLowerCase()) ||
        p.author.toLowerCase().includes(this.search().toLowerCase()),
    ),
  );

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.isLoading.set(true);
    this.postsService
      .getAll()
      .pipe(
        tap((res) => {
          this.posts.set(res.data);
          this.isLoading.set(false);
        }),
        catchError((_err) => {
          this.isLoading.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  onSearch(value: string): void {
    this.search.set(value);
  }

  onPostDeleted(id: string): void {
    this.postsService
      .remove(id)
      .pipe(
        tap(() => {
          this.posts.update((prev) => prev.filter((p) => p._id !== id));
          this.errorService.show('success', 'Publicación eliminada correctamente.');
        }),
        catchError((_err) => of(null)),
      )
      .subscribe();
  }

  onBulkUploaded(): void {
    this.showBulkUpload.set(false);
    this.loadPosts();
  }
}
