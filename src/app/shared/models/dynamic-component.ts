import { DragComponentConfig } from './drag-component-config';
import { ElementRef, EventEmitter } from '@angular/core';

export interface DynamicComponent {
  container: ElementRef;
  type: string;
  config: DragComponentConfig;
  removeComponent: EventEmitter<unknown>;
  content: string;
  onClickOutsideAnnotation: ()=> void;
}
