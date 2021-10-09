import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDaoService {

constructor(
  private httpClient: HttpClient
) { }

  public getUser(userId: string): Observable<User> {
    return this.httpClient.get<User>(`users/${userId}`);
  }

  public generateNewUser(userName: string): Observable<User> {
    return this.httpClient.post<User>(`users`, { userName: `${userName}` }, { responseType: 'json' });
  }

  public rateMovie(userId: string, movieId: string, rating: number): Observable<boolean> {
    return this.httpClient.post<boolean>(`users/${userId}/rate-movie?movieId=${movieId}&rating=${rating}`, { responseType: 'json' });
  }

}
