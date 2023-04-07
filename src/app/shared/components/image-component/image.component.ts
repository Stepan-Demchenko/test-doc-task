import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragComponentConfig } from '../../models/drag-component-config';
import { DynamicComponent } from '../../models/dynamic-component';
import { DynamicComponentWrapperComponent } from '../dynamic-component-wrapper/dynamic-component-wrapper.component';

@Component({
  selector: 'app-image-component',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DynamicComponentWrapperComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements DynamicComponent {
  readonly type = 'Image';
  @ViewChild('containerRef', {read: ElementRef}) container!: ElementRef;
  @Input() config!: DragComponentConfig;
  @Output() removeComponent: EventEmitter<unknown> = new EventEmitter<unknown>();
  isCanUploadFile = true;
  content: string = '';
  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  uploadFile(event: any): void {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.content = reader.result as string;
        this.cdr.markForCheck();
      };
      this.isCanUploadFile = false;
    }
  }
}
