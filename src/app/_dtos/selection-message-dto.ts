export class SelectionMessageDto {

  userId: string;
  movieId: number;
  roomId: string;

  constructor(userId: string, movieId: number, roomId: string) {
    this.userId = userId;
    this.movieId = movieId;
    this.roomId = roomId;
  }

}
