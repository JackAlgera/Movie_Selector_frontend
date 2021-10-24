import { User } from 'src/app/_models/user';
import { RoutingService } from './../_utils/routing.service';
import { UserDaoService } from './../_web/_daos/user-dao.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private user: User = null;

constructor(
  private userDaoService: UserDaoService,
  private routingService: RoutingService
) { }

  // TODO : use a cookie instead / or as local cache
  public setUser(userName: string): Observable<User> {
    const request = this.userDaoService.generateNewUser(userName);

    request.subscribe((user: User) => {
      if (!this.user) {
        this.user = new User(user.userName, user.userId, user.roomId);
      } else {
        this.user.userName  = user.userName;
        this.user.userId    = user.userId;
        this.user.roomId    = user.roomId;
      }
    });

    return request;
  }

  public getUser(): User {
    if (!this.checkIfUserSet()) {
      this.routingService.routeToHome();
    }
    return this.user;
  }

  private checkIfUserSet(): boolean {
    return (this.user && this.user.userId !== '');
  }

  public setRoomId(roomId: string): void {
    this.user.roomId = roomId;
  }
}
