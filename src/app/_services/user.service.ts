import { RoutingService } from './../_utils/routing.service';
import { UserDaoService } from './../_web/_daos/user-dao.service';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

private user: User;

constructor(
  private userDaoService: UserDaoService,
  private routingService: RoutingService
) { }

  // TODO : use a cookie instead / or as local cache
  public setUser(userName: string) : Observable<User> {
    var request = this.userDaoService.generateNewUser(userName);

    request.subscribe((user: User) => {
      if (!this.user) {
        this.user = new User(user.userName, user.userId);
      } else {
        this.user.userName = user.userName;
        this.user.userId = user.userId;
      }
    })

    return request;
  }

  public getUser() : User {
    this.checkIfUserSet();
    return this.user;
  }

  private checkIfUserSet() : void {
    if (this.user && this.user.userId !== '') {
      return;
    }

    this.user = new User('', '');
    this.routingService.routeToHome();
    return;
  }
}
