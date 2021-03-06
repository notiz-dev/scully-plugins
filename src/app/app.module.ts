import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeoModule } from './components/seo/seo.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScullyLibModule.forRoot({ useTransferState: true, alwaysMonitor: true }),
    SeoModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
