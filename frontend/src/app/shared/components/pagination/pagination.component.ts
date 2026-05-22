import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    @if (totalPages > 1) {
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
        <p class="text-sm text-slate-500">
          {{ 'pagination.showing' | translate }} {{ from }}–{{ to }}
          {{ 'pagination.of' | translate }} {{ total }}
        </p>
        <div class="flex items-center gap-1">
          <button class="btn-secondary px-3 py-1.5 text-xs" (click)="go(currentPage - 1)"
            [disabled]="currentPage === 1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          @for (p of pages; track p) {
            <button
              class="min-w-[2rem] px-2 py-1.5 rounded-lg text-xs font-medium transition-colors"
              [class.bg-blue-600]="p === currentPage"
              [class.text-white]="p === currentPage"
              [class.text-slate-600]="p !== currentPage"
              [class.hover:bg-slate-100]="p !== currentPage"
              (click)="go(p)">
              {{ p }}
            </button>
          }

          <button class="btn-secondary px-3 py-1.5 text-xs" (click)="go(currentPage + 1)"
            [disabled]="currentPage === totalPages">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    }
  `,
})
export class PaginationComponent implements OnChanges {
  @Input({ required: true }) total = 0;
  @Input({ required: true }) currentPage = 1;
  @Input() limit = 9;
  @Output() readonly pageChange = new EventEmitter<number>();

  totalPages = 1;
  pages: number[] = [];
  from = 1;
  to = 1;

  ngOnChanges(): void {
    this.totalPages = Math.max(1, Math.ceil(this.total / this.limit));
    this.from = (this.currentPage - 1) * this.limit + 1;
    this.to = Math.min(this.currentPage * this.limit, this.total);

    // Mostrar maximo 5 paginas centradas en la actual
    const half = 2;
    let start = Math.max(1, this.currentPage - half);
    let end   = Math.min(this.totalPages, start + 4);
    start     = Math.max(1, end - 4);
    this.pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  go(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageChange.emit(page);
  }
}
