import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsListRoutingModule } from './docs-list-routing.module';
import { DocsListComponent } from './containers/docs-list/docs-list.component';
import { DocPageComponent } from './components/doc-page/doc-page.component';
import { VisibleDocumentDirective } from '../../shared/directives/visible-document.directive';

@NgModule({
  declarations: [
    DocsListComponent,
  ],
  imports: [
    CommonModule,
    DocsListRoutingModule,
    DocPageComponent,
    VisibleDocumentDirective,
  ]
})
export class DocsListModule { }
