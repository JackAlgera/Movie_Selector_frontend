import { FoundMovieMessageDto } from './../_models/foundMovieMessageDto';
import { MovieChoiceService } from './movie-choice.service';
import { SelectionMessageDto } from './../_dtos/selection-message-dto';
import { Injectable } from '@angular/core';

@Injectable()
export class WebSocketAPI {
    webSocketEndPoint = 'ws://localhost:8080/api/selection';

    webSocket: WebSocket;

    constructor(
        private movieChoiceService: MovieChoiceService
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
        console.log('Close: ', event);
      };
    }

    public sendMessage(selectionMessageDto: SelectionMessageDto): void {
      console.log('sending message: ', JSON.stringify(selectionMessageDto));
      this.webSocket.send(JSON.stringify(selectionMessageDto));
    }

    public closeWebSocket(): void {
      this.webSocket.close();
    }

}
