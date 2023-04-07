import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoomContentService {
  private readonly zoom: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  private readonly zoomStep = 0.1;
  readonly currentZoom$: Observable<number> = this.zoom.asObservable();

  increaseZoom(): void {
    if (this.zoom.value < 2){
      this.zoom.next(this.zoom.value + this.zoomStep);
    }
  }

  decreaseZoom(): void {
    if (this.zoom.value > 0.2){
      this.zoom.next(this.zoom.value - this.zoomStep);
    }
  }
}
