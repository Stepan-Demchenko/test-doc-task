import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ZoomContentService } from '../../../../shared/services/zoom-content.service';
import { Observable } from 'rxjs';
import { DocumentService } from '../../../../shared/services/document.service';
import { PictureDocument } from '../../../../shared/models/picture-document';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-docs-list',
  templateUrl: './docs-list.component.html',
  styleUrls: ['./docs-list.component.scss']
})
export class DocsListComponent implements AfterViewInit {
  @ViewChild('documentsContainer', {static: false, read: ElementRef}) private readonly documentsContainerRef!: ElementRef;
  private readonly zoomService: ZoomContentService = inject(ZoomContentService);
  private readonly documentService: DocumentService = inject(DocumentService);
  private readonly router: Router = inject(Router);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly scale$: Observable<number> = this.zoomService.currentZoom$;
  readonly docImagesUrls$: Observable<PictureDocument[]> = this.documentService.getDocuments();

  ngAfterViewInit() {
    const {id} = this.activatedRoute.snapshot.queryParams;
    this.scrollToDocument(id);
  }

  private scrollToDocument(id: string): void {
    setTimeout(()=> {
      const element = this.documentsContainerRef.nativeElement.querySelector(`[id='${id}']`);
      element.scrollIntoView({behavior: 'smooth'});
    },100)
  }

  visibleDocumentChanged(id: number) {
    void this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {id},
        queryParamsHandling: 'merge',
      });
  }
}
