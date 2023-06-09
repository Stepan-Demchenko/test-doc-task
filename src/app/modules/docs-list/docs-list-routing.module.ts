import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsListComponent } from './containers/docs-list/docs-list.component';

const routes: Routes = [
  {
    path: '',
    component: DocsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsListRoutingModule { }
