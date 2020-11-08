import { RestInterceptorService } from './_services/rest-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { RoomsWidgetComponent } from './_components/rooms-widget/rooms-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RoomsWidgetComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RestInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
