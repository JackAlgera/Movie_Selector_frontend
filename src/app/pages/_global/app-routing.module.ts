import { RoomMovieFoundComponent } from './../rooms/room-movie-found/room-movie-found.component';
import { RoomNotFoundComponent } from './../rooms/room-not-found/room-not-found.component';
import { RoomDisplayComponent } from './../rooms/room-display/room-display.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../home/homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, data: { title: "Movie Selector", message: "" } },
  { path: 'rooms/:roomId', component: RoomDisplayComponent, data: { title: "Movie Selector", message: "" } },
  { path: 'rooms/:roomId/not-found', component: RoomNotFoundComponent, data: { title: "Movie Selector", message: "Room not found" } },
  { path: 'rooms/:roomId/found-movie', component: RoomMovieFoundComponent, data: { title: "Movie Selector", message: "" } },

  { path: '**', component: PageNotFoundComponent, data: { title: "Movie Selector", message: "Looks like the page doesn't exist... yet !" } }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
