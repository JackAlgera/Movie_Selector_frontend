import { User } from './../../_models/user';
import { NgForm } from '@angular/forms';
import { Room } from './../../_models/room';
import { RoomHandlerService } from './../../_services/room-handler.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms-widget',
  templateUrl: './rooms-widget.component.html',
  styleUrls: ['./rooms-widget.component.css']
})
export class RoomsWidgetComponent implements OnInit {

  availableRooms: Room[];

  constructor(
    public roomHandlerService: RoomHandlerService
  ) { }

  ngOnInit(): void {
  }

  public updateRooms(): void {
    this.roomHandlerService.getAllRooms().subscribe((rooms: Room[]) => {
      this.availableRooms = rooms;
    });
  }

  public addNewRoom(): void {
    this.roomHandlerService.addNewRoom().subscribe((room: Room) => {
      this.updateRooms();
    });
  }

  public joinRoom(userForm: NgForm): void {
    const user = new User(userForm.value.userName);
    this.roomHandlerService.addUserToRoom(user.userName, userForm.value.roomId).subscribe((newUser: User) => {
      user.userId = newUser.userId;
    });
  }

}
