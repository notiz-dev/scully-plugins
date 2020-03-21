import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, SidebarModule],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}
