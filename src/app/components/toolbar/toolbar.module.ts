import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, SidebarModule, RouterModule],
  exports: [ToolbarComponent]
})
export class ToolbarModule {}
