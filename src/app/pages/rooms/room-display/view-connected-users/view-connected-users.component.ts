import { RoomDaoService } from './../../../../_web/_daos/room-dao.service';
import { User } from 'src/app/_models/user';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-connected-users',
  templateUrl: './view-connected-users.component.html',
  styleUrls: ['./view-connected-users.component.scss']
})
export class ViewConnectedUsersComponent implements OnInit {

  @Input() roomId: string;
  connectedUsers: User[];

  constructor(
    private roomDaoService: RoomDaoService
  ) { }

  ngOnInit() {
    setInterval(() => this.roomDaoService.getUsersInRoom(this.roomId).subscribe(
        (connectedUsers: User[]) => this.connectedUsers = connectedUsers), 3000)
  }
}
