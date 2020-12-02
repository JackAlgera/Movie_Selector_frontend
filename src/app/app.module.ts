import { WebSocketAPI } from './_services/web-socket-api.service';
import { RoomsWidgetComponent } from './room-handler/rooms-widget/rooms-widget.component';
import { MovieDaoService } from './_services/movie-dao.service';
import { RestInterceptorService } from './_services/rest-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { FoundMovieComponent } from './found-movie/found-movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    RoomsWidgetComponent,
    FoundMovieComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule
  ],
  providers: [
    MovieDaoService,
    WebSocketAPI,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
