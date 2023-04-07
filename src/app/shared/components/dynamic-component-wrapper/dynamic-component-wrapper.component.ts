import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { DragComponentConfig } from '../../models/drag-component-config';
import { DragElementDirective } from '../../directives/drag-element.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-component-wrapper',
  templateUrl: './dynamic-component-wrapper.component.html',
  standalone: true,
  styleUrls: ['./dynamic-component-wrapper.component.scss'],
  imports: [
    CommonModule,
    DragElementDirective,
  ]
})
export class DynamicComponentWrapperComponent {
  @Input() config!:DragComponentConfig;
  @Input() completeEdit: boolean = false;
  @Output() close: EventEmitter<unknown> = new EventEmitter<unknown>();
  }
