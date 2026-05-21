import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { PostsService } from '../../services/posts.service';
import { ErrorService } from '../../../../core/services/error.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, TranslatePipe, LoadingComponent],
  templateUrl: './post-form.component.html',
})
export class PostFormComponent implements OnInit {
  @Input() id?: string;

  private readonly fb = inject(FormBuilder);
  private readonly postsService = inject(PostsService);
  private readonly errorService = inject(ErrorService);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly isLoadingPost = signal(false);
  readonly isEditMode = signal(false);

  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(10)]],
    author: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.id) {
      this.isEditMode.set(true);
      this.loadPost();
    }
  }

  private loadPost(): void {
    this.isLoadingPost.set(true);
    this.postsService
      .getOne(this.id!)
      .pipe(
        tap((res) => {
          this.form.patchValue({
            title: res.data.title,
            body: res.data.body,
            author: res.data.author,
          });
          this.isLoadingPost.set(false);
        }),
        catchError(() => {
          this.isLoadingPost.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const payload = this.form.getRawValue();
    const request$ = this.isEditMode()
      ? this.postsService.update(this.id!, payload)
      : this.postsService.create(payload);

    request$
      .pipe(
        tap(() => {
          const msg = this.isEditMode()
            ? 'Post actualizado correctamente.'
            : 'Post creado correctamente.';
          this.errorService.show('success', msg);
          this.router.navigate(['/posts']);
        }),
        catchError(() => {
          this.isLoading.set(false);
          return of(null);
        }),
      )
      .subscribe();
  }

  hasError(field: 'title' | 'body' | 'author', error: string): boolean {
    const ctrl = this.form.controls[field];
    return ctrl.hasError(error) && ctrl.touched;
  }
}
