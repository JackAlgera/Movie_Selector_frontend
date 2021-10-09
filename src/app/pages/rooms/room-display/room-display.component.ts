import { UserService } from './../../../_services/user.service';
import { User } from 'src/app/_models/user';
import { RoutingService } from './../../../_utils/routing.service';
import { RoomDaoService } from './../../../_web/_daos/room-dao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from './../../../_services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-display',
  templateUrl: './room-display.component.html',
  styleUrls: ['./room-display.component.css']
})
export class RoomDisplayComponent implements OnInit {

  roomId: string = null;

  constructor(
    private titleService: TitleService,
    private roomDaoService: RoomDaoService,
    private userService: UserService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    this.titleService.setDataWithRoute(this.route);
    this.checkIfRoomExists();
  }

  private checkIfRoomExists() : void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId');

      this.roomDaoService.getRoom(this.roomId).subscribe(
        _ => {
          this.roomDaoService.getFoundMovie(this.roomId).subscribe((movieId: number) => {
            console.log(movieId);
            if (movieId > 0) {
              this.routingService.routeToMovieFoundPage(this.roomId);
            }
          })

          var user: User = this.userService.getUser();
          if (user && !user.roomId) {
            this.roomDaoService.addUserToRoom(user.userId, this.roomId).subscribe(_ => this.userService.setRoomId(this.roomId));
          }
        },
        error => this.routingService.routeToRoomNotFoundPage(params.get('roomId'))
      )
    });
  }
}
