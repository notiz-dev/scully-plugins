import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { NizToolbarModule, NizFooterModule } from '@notiz/ngx-design';
import { SeoModule } from './components/seo/seo.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule.forRoot({ useTranferState: true, alwaysMonitor: true }),
    NizToolbarModule,
    NizFooterModule,
    SeoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
