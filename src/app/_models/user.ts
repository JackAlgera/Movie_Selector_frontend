export class User {
  userName: string;
  userId: string;
  roomId: string;

  constructor(userName: string, userId: string, roomId: string) {
    this.userId = userId;
    this.userName = userName;
    this.roomId = roomId;
  }
}
