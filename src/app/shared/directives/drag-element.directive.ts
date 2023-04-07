import { AfterViewInit, Directive, ElementRef, inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { fromEvent, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appDragElement]',
  standalone: true
})
export class DragElementDirective implements OnDestroy, AfterViewInit {
  @Input() parentContainer!: HTMLElement;

  private element!: HTMLElement;
  private readonly destroy$: Subject<unknown> = new Subject<unknown>();
  private readonly elementRef: ElementRef = inject(ElementRef);
  private readonly renderer: Renderer2 = inject(Renderer2);
  private readonly document: Document = inject(DOCUMENT);

  ngAfterViewInit() {
    this.element = this.elementRef.nativeElement;
    if (!this.parentContainer) {
      throw new Error("Please set parent parentContainer");
    }
    this.initialize();
  }

  private initialize(): void {
    const dragStart$ = fromEvent<MouseEvent>(this.element, 'mousedown');
    const dragEnd$ = fromEvent<MouseEvent>(this.document, 'mouseup');
    const drag$ = fromEvent<MouseEvent>(this.document, 'mousemove').pipe(
      takeUntil(dragEnd$)
    );

    let offset = { x: 0, y: 0 };

    dragStart$
      .pipe(
        tap((event: MouseEvent)=> {
        offset.x = event.clientX - this.element.offsetLeft;
        offset.y = event.clientY - this.element.offsetTop;
      }),
        switchMap(()=> {
          return drag$;
        }),
        tap((event: MouseEvent)=> {
          event.preventDefault();
          let x: number = event.clientX - offset.x;
          let y: number = event.clientY - offset.y;
          let maxX: number = this.parentContainer.clientWidth - this.element.offsetWidth;
          let maxY: number = this.parentContainer.clientHeight - this.element.offsetHeight;
          x = Math.max(0, Math.min(x, maxX));
          y = Math.max(0, Math.min(y, maxY));
          this.renderer.setStyle(this.element, 'left', `${x}px`);
          this.renderer.setStyle(this.element, 'top', `${y}px`);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    dragEnd$
      .pipe(
        tap(()=> {
          offset = { x: 0, y: 0 };
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.unsubscribe();
  }
}
