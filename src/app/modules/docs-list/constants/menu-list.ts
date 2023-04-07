import { ContextMenu } from '../../../shared/models/context-menu';
import { ContextMenuActions } from '../enums/context-menu-actions';

export const MENU_LIST: ContextMenu<ContextMenuActions>[] = [
  {
    title: 'Add text',
    action: ContextMenuActions.ADD_TEXT
  },
  {
    title: 'Add picture',
    action: ContextMenuActions.ADD_IMAGE
  }
]
