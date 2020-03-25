import { Component, OnInit, Input } from '@angular/core';
import { ScullyRoutesService, ScullyRoute } from '@scullyio/ng-lib';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'no-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() mobileMenuToggled: boolean;

  menu$: Observable<ScullyRoute[]>;

  constructor(private scully: ScullyRoutesService) {}

  ngOnInit(): void {
    this.menu$ = this.scully.available$.pipe(
      map(routeList =>
        routeList.filter((route: ScullyRoute) =>
          route.route.startsWith(`/docs/`)
        )
      )
    );
  }
}
