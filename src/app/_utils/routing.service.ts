import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

constructor(
  private router: Router
) { }

  public routeToHome() {
    console.log('routing home');
    this.router.navigateByUrl('');
  }

  public routeToMovieFoundPage(roomId: string) {
    this.router.navigateByUrl(`/rooms/${roomId}/found-movie`);
  }

  public routeToRoomNotFoundPage(roomId: string) {
    this.router.navigateByUrl(`/rooms/${roomId}/not-found`);
  }

}
