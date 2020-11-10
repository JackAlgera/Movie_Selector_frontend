import { User } from './user';

export class Room {

  roomId: string;
  connectedUsers: User[];

  constructor(roomId: string) {
    this.roomId = roomId;
  }

}
