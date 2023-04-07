import { PlacementPosition } from './placement-position';

export interface DragComponentConfig extends PlacementPosition {
  parentElementContainer: HTMLElement;
}
