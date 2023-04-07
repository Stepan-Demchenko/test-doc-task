import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  inject,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuService } from '../../../../shared/services/context-menu.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ContextMenuActions } from '../../enums/context-menu-actions';
import { PasteDynamicComponentService } from '../../../../shared/services/paste-dynamic-component.service';
import { TextComponent } from '../../../../shared/components/text-component/text.component';
import { PictureDocument } from '../../../../shared/models/picture-document';
import { MENU_LIST } from '../../constants/menu-list';

@Component({
  selector: 'app-doc-page',
  standalone: true,
  imports: [CommonModule, TextComponent],
  providers: [ContextMenuService],
  templateUrl: './doc-page.component.html',
  styleUrls: ['./doc-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocPageComponent implements OnDestroy {
  @ViewChild('contextMenuRef', {read: ViewContainerRef}) private readonly contextRef!: ViewContainerRef;
  @ViewChild('dynamicComponentsRef', {read: ViewContainerRef}) private readonly dynamicsComponentsRef!: ViewContainerRef;
  @ViewChild('container', {read: ElementRef}) private readonly containerRef!: ElementRef;
  @Input() pictureDocument!: PictureDocument;
  private readonly contextMenuService = inject(ContextMenuService);
  private readonly pasteDynamicComponentService = inject(PasteDynamicComponentService);
  private readonly destroy: Subject<unknown> = new Subject<unknown>();

  openContextMenu(event: MouseEvent): void {
    this.contextMenuService.open(event, MENU_LIST, this.contextRef)
      .pipe(
        tap((selectedAction: ContextMenuActions)=> {
          this.contextMenuService.close(this.contextRef);
          this.pasteDynamicComponentService.createComponent(
            selectedAction,
            event,
            this.dynamicsComponentsRef,
            this.containerRef.nativeElement,
            this.pictureDocument.id);
        }),
        takeUntil(this.destroy)
      ).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next(undefined);
    this.destroy.unsubscribe();
  }
}
