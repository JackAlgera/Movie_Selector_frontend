import { ERoomEvents } from './room-handler-events';
import { EventEmitter, Injectable } from '@angular/core';
import { Room } from '../_models/room';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class RoomHandlerService {

  currentUser: User;
  currentRoom: Room;

  constructor() {
    this.currentRoom = null;
  }

  public joinRoom(user: User, room: Room): void {
    this.currentUser = user;
    this.currentRoom = room;
  }

}
