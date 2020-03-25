import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocsComponent } from './docs.component';
import { DocComponent } from '../doc/doc.component';

const routes: Routes = [
  { path: '', component: DocsComponent },
  {
    path: ':slug',
    component: DocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule {}
