import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocComponent } from './doc.component';
import { ContentModule } from '../components/content/content.module';
import { ScullyContentModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [DocComponent],
  imports: [CommonModule, ScullyContentModule, ContentModule]
})
export class DocModule {}
