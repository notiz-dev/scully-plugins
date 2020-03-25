import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogs$: Observable<ScullyRoute[]> = this.srs.available$.pipe(
    map(routeList =>
      routeList.filter((route: ScullyRoute) => route.route.startsWith(`/blog/`))
    ),
    map(blogs => blogs.sort((a, b) => (a.date < b.date ? -1 : 1)))
  );

  constructor(private srs: ScullyRoutesService) {}

  ngOnInit() {}
}
