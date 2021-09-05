import { RoomMovieFoundComponent } from './pages/rooms/room-movie-found/room-movie-found.component';
import { SelectorMovieDisplayComponent } from './pages/selector/selector-movie-display/selector-movie-display.component';
import { SelectorHandlerComponent } from './pages/selector/selector-handler/selector-handler.component';
import { RoomDisplayComponent } from './pages/rooms/room-display/room-display.component';
import { ViewConnectedUsersComponent } from './pages/rooms/room-display/view-connected-users/view-connected-users.component';
import { PageNotFoundComponent } from './pages/_global/page-not-found/page-not-found.component';
import { RoomNotFoundComponent } from './pages/rooms/room-not-found/room-not-found.component';
import { RouterModule } from '@angular/router';
import { TopTitleComponent } from './pages/_global/top-title/top-title.component';
import { AppRoutingModule } from './pages/_global/app-routing.module';
import { MovieDaoService } from './_web/_daos/movie-dao.service';
import { RestInterceptorService } from './_web/rest-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './pages/home/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TopTitleComponent,
    RoomNotFoundComponent,
    PageNotFoundComponent,
    ViewConnectedUsersComponent,
    RoomDisplayComponent,
    SelectorHandlerComponent,
    SelectorMovieDisplayComponent,
    RoomMovieFoundComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    MovieDaoService,
    { provide: HTTP_INTERCEPTORS, useClass: RestInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
