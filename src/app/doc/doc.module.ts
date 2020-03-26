import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc.component';
import { ScullyContentModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [DocComponent],
  imports: [CommonModule, ScullyContentModule]
})
export class DocModule {}
