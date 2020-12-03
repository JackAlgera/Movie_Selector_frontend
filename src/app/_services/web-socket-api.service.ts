import { RoomHandlerService } from './../room-handler/room-handler.service';
import { RoomDaoService } from './room-dao.service';
import { FoundMovieMessageDto } from './../_models/foundMovieMessageDto';
import { MovieChoiceService } from './movie-choice.service';
import { SelectionMessageDto } from './../_dtos/selection-message-dto';
import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketAPI {
    webSocketEndPoint = 'ws://localhost:8080/api/selection';

    webSocket: WebSocket;

    constructor(
        private movieChoiceService: MovieChoiceService,
        private roomDaoService: RoomDaoService,
        private roomHandlerService: RoomHandlerService
      ){ }

    public openWebSocket(): void {
      this.webSocket = new WebSocket(this.webSocketEndPoint);

      this.webSocket.onopen = (event) => {
        console.log('Open: ', event);
      };

      this.webSocket.onmessage = (event) => {
        const selectionMessageDto: FoundMovieMessageDto = JSON.parse(event.data);
        console.log('Received message : ', selectionMessageDto);
        this.movieChoiceService.setFoundMovie();
      };

      this.webSocket.onclose = (event) => {
        if (this.roomHandlerService.currentUser && this.roomHandlerService.currentRoom) {
          this.roomDaoService.removeUserFromRoom(this.roomHandlerService.currentUser.userId,
            this.roomHandlerService.currentRoom.roomId).subscribe(data => {
            this.roomHandlerService.leaveRoom();
          });
        }
      };
    }

    public sendMessage(selectionMessageDto: SelectionMessageDto): void {
      this.webSocket.send(JSON.stringify(selectionMessageDto));
    }

    public closeWebSocket(): void {
      this.webSocket.close();
    }

}
