import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

constructor(
  private router: Router
) { }

  public routeToHome(): void {
    console.log('routing home');
    this.router.navigateByUrl('');
  }

  public routeToMovieFoundPage(roomId: string): void {
    this.router.navigateByUrl(`/rooms/${roomId}/found-movie`);
  }

  public routeToRoomNotFoundPage(roomId: string): void {
    this.router.navigateByUrl(`/rooms/${roomId}/not-found`);
  }
}
