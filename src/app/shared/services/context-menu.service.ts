import { ComponentRef, EventEmitter, Injectable, ViewContainerRef } from '@angular/core';
import { ContextMenuComponent } from '../components/context-menu/context-menu.component';
import { first } from 'rxjs';
import { ContextMenu } from '../models/context-menu';

@Injectable()
export class ContextMenuService {
  private contextMenuRef!: ComponentRef<any>;

  open<T>(mouseEvent: MouseEvent,
          menuList: ContextMenu<T>[],
          container: ViewContainerRef): EventEmitter<T> {
    mouseEvent.preventDefault();
    container.clear();
    const position = {x: `${mouseEvent.offsetX}px`, y: `${mouseEvent.offsetY}px`};
    this.contextMenuRef = container.createComponent(ContextMenuComponent<T>);
    this.contextMenuRef.instance.positions = position;
    this.contextMenuRef.instance.menuItems = menuList;
    this.contextMenuRef.instance.close
      .pipe(first())
      .subscribe(()=> this.close(container))
    return this.contextMenuRef.instance.selectedAction;
  }

  close(container: ViewContainerRef): void {
    container.clear();
    this.contextMenuRef.destroy();
  }
}
