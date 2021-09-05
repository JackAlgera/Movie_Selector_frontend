import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../../_models/room';
import { User } from '../../_models/user';
import { Movie } from '../../_models/movie';

@Injectable({
  providedIn: 'root'
})
export class RoomDaoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getRoom(roomId: string): Observable<Room> {
    return this.httpClient.get<Room>(`rooms/${roomId}`);
  }

  public getAllRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`rooms`);
  }

  public createNewRoom(): Observable<Room> {
    return this.httpClient.post<Room>(`rooms`, { responseType: 'json' });
  }

  public addUserToRoom(userName: string, userId: string, roomId: string): Observable<User> {
    return this.httpClient.post<User>(`rooms/${roomId}/users?userName=${userName}&userId=${userId}`, { responseType: 'json'});
  }

  public likeMovie(roomId: string, movieId: string, userId: string, likeRating: number): Observable<boolean> {
    return this.httpClient.post<boolean>(`rooms/${roomId}/movies/${movieId}/like?userId=${userId}&likeRating=${likeRating}`, { responseType: 'json' });
  }

  public removeUserFromRoom(userId: string, roomId: string): Observable<User> {
    return this.httpClient.delete<User>(`rooms/${roomId}/users/${userId}`, { responseType: 'json'});
  }

  public getFoundMovie(roomId: string): Observable<Movie> {
    return this.httpClient.get<Movie>(`rooms/${roomId}/foundMovie`);
  }

}
