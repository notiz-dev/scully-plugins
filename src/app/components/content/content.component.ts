import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'no-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  mobileMenuToggled = false;
  constructor() {}

  ngOnInit(): void {}
}
