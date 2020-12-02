import { User } from './user';

export class Room {

  roomId: string;
  connectedUsers: Map<string, User>;

  constructor(roomId: string) {
    this.roomId = roomId;
  }

}
