import { UserService } from '../../../_services/user.service';
import { User } from 'src/app/_models/user';
import { RoutingService } from '../../../_utils/routing.service';
import { RoomDaoService } from '../../../_web/_daos/room-dao.service';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../../../_services/title.service';
import { Component, OnInit } from '@angular/core';
import { SharedVariableService } from '../../../_services/shared-variable.service';

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
    private routingService: RoutingService,
    public sharedVariableService: SharedVariableService
  ) { }

  ngOnInit(): void {
    this.titleService.setDataWithRoute(this.route);
    this.checkIfRoomExists();
  }

  private checkIfRoomExists(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = params.get('roomId');

      this.roomDaoService.getRoom(this.roomId).subscribe(
        () => {
          this.roomDaoService.getFoundMovie(this.roomId).subscribe((movieId: number) => {
            console.log(movieId);
            if (movieId > 0) {
              this.routingService.routeToMovieFoundPage(this.roomId);
            }
          });

          const user: User = this.userService.getUser();
          if (user && !user.roomId) {
            this.roomDaoService.addUserToRoom(user.userId, this.roomId).subscribe(() => this.userService.setRoomId(this.roomId));
          }
        },
        () => this.routingService.routeToRoomNotFoundPage(params.get('roomId'))
      );
    });
  }
}
