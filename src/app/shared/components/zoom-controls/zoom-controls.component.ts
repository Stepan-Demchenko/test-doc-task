import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZoomContentService } from '../../services/zoom-content.service';
import { ZoomPipe } from '../../pipes/zoom.pipe';

@Component({
  selector: 'app-zoom-controls',
  standalone: true,
  imports: [CommonModule, ZoomPipe],
  templateUrl: './zoom-controls.component.html',
  styleUrls: ['./zoom-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZoomControlsComponent {
  private readonly zoomService: ZoomContentService = inject(ZoomContentService);
  currentZoom$ = this.zoomService.currentZoom$;

  increaseZoom(): void {
    this.zoomService.increaseZoom();
  }

  decreaseZoom(): void {
      this.zoomService.decreaseZoom();
  }
}
