import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'no-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() mobileMenuToggled = new EventEmitter<boolean>();

  isOpen = false;

  constructor() {}

  ngOnInit(): void {}

  toogleMobileMenu() {
    this.isOpen = !this.isOpen;
    this.mobileMenuToggled.emit(this.isOpen);
  }
}
