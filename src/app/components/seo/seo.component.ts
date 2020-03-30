import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../services/seo.service';
import { ScullyRoutesService } from '@scullyio/ng-lib';

@Component({
  selector: 'niz-seo',
  templateUrl: './seo.component.html',
  styleUrls: ['./seo.component.scss']
})
export class SeoComponent implements OnInit {
  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.generateTags();
  }
}
