import { Directive, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromIntersectionObserver } from './from-intersection-observer';
import { Subject, takeUntil } from 'rxjs';

@Directive({
  selector: '[appVisibleDocument]',
  standalone: true
})
export class VisibleDocumentDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 0;
  @Input() intersectionRoot!: HTMLElement;
  @Input() threshold = 0.2;
  @Output() visibilityChange: EventEmitter<Element> = new EventEmitter<Element>();


  private readonly elementRef = inject(ElementRef);
  private destroy$ = new Subject();

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    const config = {
      root: this.intersectionRoot,
      rootMargin: '0px',
      threshold: this.threshold
    };

    fromIntersectionObserver(
      element,
      config,
      this.debounceTime
    ).pipe(
      takeUntil(this.destroy$)
    ).subscribe((element: Element) => {
      this.visibilityChange.emit(element);
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
  }
}
