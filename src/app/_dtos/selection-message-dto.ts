export class SelectionMessageDto {

  userId: string;
  movieId: string;
  roomId: string;

  constructor(userId: string, movieId: string, roomId: string) {
    this.userId = userId;
    this.movieId = movieId;
    this.roomId = roomId;
  }

}
