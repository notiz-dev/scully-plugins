import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [ContentComponent],
  imports: [CommonModule, ToolbarModule, SidebarModule],
  exports: [ContentComponent]
})
export class ContentModule {}
