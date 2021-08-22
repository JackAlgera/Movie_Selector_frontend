import { Room } from './../../../_models/room';
import { RoomDaoService } from './../../../_web/_daos/room-dao.service';
import { User } from 'src/app/_models/user';
import { UserService } from './../../../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  user: User;
  rooms: Room[];

  constructor(
    private userService: UserService,
    private roomDaoService: RoomDaoService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();

    setInterval(() =>
    this.roomDaoService.getAllRooms().subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      })
    , 3000)
  }

  public getConnectedUsersString(room: Room) : string {
    var connectedUsersStr = '';
    room.connectedUsers.forEach((user: User) => {
      connectedUsersStr += `${user.userName}: ${user.userId} +`;
    });
    return connectedUsersStr;
  }

}
