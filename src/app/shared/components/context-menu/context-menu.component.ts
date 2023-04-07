import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenu } from '../../models/context-menu';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { PlacementPosition } from '../../models/placement-position';
import { Event } from '@angular/router';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuComponent<T> {
  @Input() menuItems: ContextMenu<T>[] = [];
  @Input() positions: PlacementPosition = {x: '0', y: '0'};
  @Output() close: EventEmitter<unknown> = new EventEmitter<unknown>();
  @Output() selectedAction: EventEmitter<T> = new EventEmitter<T>();

  clickOnAction(event: MouseEvent, action: any) {
    event.stopPropagation();
    this.selectedAction.emit(action);
  }
}
