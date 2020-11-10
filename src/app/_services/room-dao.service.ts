import { Movie } from '../_models/movie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../_models/room';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class RoomDaoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllRooms(): Observable<Room[]> {
    return this.httpClient.get<Room[]>(`rooms`);
  }

  public addNewRoom(): Observable<Room> {
    return this.httpClient.post<Room>(`rooms`, { responseType: 'json' });
  }

  public addUserToRoom(userName: string, roomId: string): Observable<User> {
    return this.httpClient.post<User>(`rooms/${roomId}/users?userName=${userName}`, { responseType: 'json'});
  }

}
