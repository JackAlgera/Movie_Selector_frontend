import { PageNotFoundComponent } from './pages/_global/page-not-found/page-not-found.component';
import { RoomNotFoundComponent } from './pages/rooms/room-not-found/room-not-found.component';
import { RouterModule } from '@angular/router';
import { TestingComponent } from './pages/_global/testing/testing.component';
import { TopTitleComponent } from './pages/_global/top-title/top-title.component';
import { AppRoutingModule } from './pages/_global/app-routing.module';
import { MovieDaoService } from './_services/movie-dao.service';
import { RestInterceptorService } from './_web/rest-interceptor.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomepageComponent } from './pages/home/homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    TopTitleComponent,
    TestingComponent,
    RoomNotFoundComponent,
    PageNotFoundComponent
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
