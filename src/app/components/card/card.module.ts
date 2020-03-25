import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule, RouterModule],
  exports: [CardComponent],
  providers: []
})
export class CardModule {}
