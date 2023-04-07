import { DynamicComponent } from './dynamic-component';

export interface DynamicComponentStore {
  id: string;
  documentId: number;
  component: DynamicComponent;
}
