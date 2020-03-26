import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { NizToolbarModule } from '@notiz/ngx-design';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule.forRoot({ useTranferState: true, alwaysMonitor: true }),
    NizToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
