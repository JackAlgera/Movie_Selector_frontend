import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Room } from 'src/app/_models/room';
import { User } from 'src/app/_models/user';
import { RoomDaoService } from 'src/app/_services/room-dao.service';
import { RoomHandlerService } from '../room-handler.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-rooms-widget',
  templateUrl: './rooms-widget.component.html',
  styleUrls: ['./rooms-widget.component.css']
})
export class RoomsWidgetComponent implements OnInit {

  availableRooms: Room[];

  constructor(
    private roomDaoService: RoomDaoService,
    public roomHandlerService: RoomHandlerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public updateRooms(): void {
    this.roomDaoService.getAllRooms().subscribe((rooms: Room[]) => {
      this.availableRooms = rooms;
    });
  }

  public addNewRoom(userName: string): void {
    if (this.roomHandlerService.currentUser) {
      return;
    }

    if (userName) {
      this.roomDaoService.addNewRoom().subscribe((room: Room) => {
        this.joinRoomWithoutform(userName, room.roomId);
      });
    }
  }

  get objectClass() {
    return Object;
  }

  public leaveRoom(): void {
    this.roomDaoService.removeUserFromRoom(this.roomHandlerService.currentUser.userId,
      this.roomHandlerService.currentRoom.roomId).subscribe(data => {
      this.roomHandlerService.leaveRoom();
      this.updateRooms();
    });
  }

  public joinRoom(userForm: NgForm): void {
    const user = new User(userForm.value.userName);
    this.roomDaoService.addUserToRoom(user.userName, userForm.value.roomId).subscribe((newUser: User) => {
      this.updateRooms();
      user.userId = newUser.userId;
      this.roomHandlerService.joinRoom(user, new Room(userForm.value.roomId));

      this.router.navigate([`/rooms/${this.roomHandlerService.currentRoom.roomId}`]);
    });
  }

  public joinRoomWithoutform(userName: string, roomId: string): void {
    const user = new User(userName);
    this.roomDaoService.addUserToRoom(user.userName, roomId).subscribe((newUser: User) => {
      this.updateRooms();
      user.userId = newUser.userId;
      this.roomHandlerService.joinRoom(user, new Room(roomId));

      this.router.navigate([`/rooms/${this.roomHandlerService.currentRoom.roomId}`]);
    });
  }

}
