import { AfterViewInit, Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({ selector: '[appAutoFocus]', standalone: true })
export class AutoFocusDirective implements AfterViewInit {
  private readonly el = inject(ElementRef);

  /** Retraso en ms antes de hacer foco. Util cuando el elemento esta dentro de una animacion. */
  @Input() appAutoFocus: number = 100;

  ngAfterViewInit(): void {
    setTimeout(() => {
      const el = this.el.nativeElement as HTMLElement;
      if (typeof (el as HTMLInputElement).focus === 'function') {
        (el as HTMLInputElement).focus();
      }
    }, this.appAutoFocus);
  }
}
