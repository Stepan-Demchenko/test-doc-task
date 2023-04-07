import { Directive, HostListener, Output, EventEmitter, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<void>();
  private readonly elementRef: ElementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  onClick(target: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
