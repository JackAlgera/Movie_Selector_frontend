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

  public generateNewUser(userName: string): Observable<User> {
    return this.httpClient.post<User>(`users?userName=${userName}`, { responseType: 'json' });
  }

}
