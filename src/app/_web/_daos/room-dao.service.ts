import { User } from 'src/app/_models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../../_models/room';

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

  public generateNewRoom(): Observable<Room> {
    return this.httpClient.post<Room>(`rooms`, { responseType: 'json' });
  }

  public addUserToRoom(userId: string, roomId: string): Observable<User> {
    return this.httpClient.put<User>(`rooms/${roomId}/add-user?userId=${userId}`, { responseType: 'json'});
  }

  public getFoundMovie(roomId: string): Observable<number> {
    return this.httpClient.get<number>(`rooms/${roomId}/found-movie-id`);
  }

  public getUsersInRoom(roomId: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`rooms/${roomId}/users`);
  }

}
