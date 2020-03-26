import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { DocsComponent } from './docs.component';
import { DocModule } from '../doc/doc.module';

@NgModule({
  declarations: [DocsComponent],
  imports: [CommonModule, DocsRoutingModule, DocModule]
})
export class DocsModule {}
