import { ComponentRef, inject, Injectable, ViewContainerRef } from '@angular/core';
import { ContextMenuActions } from '../../modules/docs-list/enums/context-menu-actions';
import { DragComponentConfig } from '../models/drag-component-config';
import { TextComponent } from '../components/text-component/text.component';
import { DynamicComponent } from '../models/dynamic-component';
import { first, tap } from 'rxjs';
import { ImageComponent } from '../components/image-component/image.component';
import { DynamicComponentsStoreService } from './dynamic-components-store.service';
import getId from '../functions/get-id';

@Injectable({
  providedIn: 'root'
})
export class PasteDynamicComponentService {
  private readonly dynamicComponentsStoreService: DynamicComponentsStoreService = inject(DynamicComponentsStoreService);

  createComponent(action: ContextMenuActions,
                  mouseEvent: MouseEvent,
                  placementTemplateRef: ViewContainerRef,
                  container: HTMLElement,
                  documentId: number): void {
    const dynamicComponentConfig: DragComponentConfig = {parentElementContainer: container,
      y: `${mouseEvent.offsetY}px`, x: `${mouseEvent.offsetX}px`};
    let createdComponent: ComponentRef<DynamicComponent>;

    switch (action) {
      case ContextMenuActions.ADD_IMAGE:
        createdComponent = placementTemplateRef.createComponent<DynamicComponent>(ImageComponent);
        break;
      case ContextMenuActions.ADD_TEXT:
        createdComponent = placementTemplateRef.createComponent<DynamicComponent>(TextComponent);
        break;
    }
    createdComponent.instance.config = dynamicComponentConfig;
    const componentId: string = getId(); // generate uniq id for the dynamic component
    this.dynamicComponentsStoreService.addNewContainerRef({
      id: componentId,
      documentId,
      component: createdComponent.instance
    });
    createdComponent.instance.removeComponent
      .pipe(
        first(),
        tap(()=> {
          createdComponent.destroy();
          this.dynamicComponentsStoreService.removeComponent(componentId);
        }))
      .subscribe();
  }
}
