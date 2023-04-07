import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DynamicComponentStore } from '../models/dynamic-component-store';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentsStoreService {
  private readonly dynamicComponentsContainerRefs: BehaviorSubject<DynamicComponentStore[]> =
    new BehaviorSubject<DynamicComponentStore[]>([]);


  snapshot(): DynamicComponentStore[] {
    return this.dynamicComponentsContainerRefs.value;
  }

  // save dynamic component instance to store
  addNewContainerRef(data: DynamicComponentStore) {
    const isCanAddNew = !this.snapshot().find((element: DynamicComponentStore)=> element.id === data.id);
    if (isCanAddNew) {
      this.dynamicComponentsContainerRefs.next([...this.snapshot(), data]);
    }
  }

  removeComponent(id: string): void {
    const newStore = this.snapshot().filter((element: DynamicComponentStore) => element.id !== id);
    this.dynamicComponentsContainerRefs.next(newStore);
  }

  showResult(): void {
    if (!this.snapshot().length) {
      console.warn('THERE NO CREATED ANNOTATION IN ANY DOCUMENT!');
      return;
    }
    const result: any[] = [];
    this.snapshot().forEach((element: DynamicComponentStore)=> {
      const y = element.component.container.nativeElement.firstChild.offsetTop;
      const x = element.component.container.nativeElement.firstChild.offsetLeft;
      const width = element.component.container.nativeElement.firstChild.offsetWidth;
      const height = element.component.container.nativeElement.firstChild.offsetHeight;
      result.push({
        page: element.documentId,
        cords: {
          x,
          y
        },
        size: {
          width,
          height
        },
        type: element.component.type,
        content: element.component.content
      });
    });
    console.log(result)
  }
}
