import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DynamicComponent } from '../../models/dynamic-component';
import { DragComponentConfig } from '../../models/drag-component-config';
import { DynamicComponentWrapperComponent } from '../dynamic-component-wrapper/dynamic-component-wrapper.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-component',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  standalone: true,
  imports: [
    DynamicComponentWrapperComponent,
    FormsModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextComponent implements DynamicComponent {
  disabledInput = false;
  content = '';
  @ViewChild('containerRef', {read: ElementRef}) container!: ElementRef;
  @Input() config!: DragComponentConfig;
  @Output() removeComponent: EventEmitter<unknown> = new EventEmitter<unknown>();
  public readonly type = 'Text';

  completeTypeText(): void {
    if (this.content.length) {
      this.disabledInput = true;
    }
  }
}
