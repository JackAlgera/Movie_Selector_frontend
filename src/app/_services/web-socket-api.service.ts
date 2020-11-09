import { ChatMessageDto } from '../_models/chatMessageDto';
import { AppComponent } from '../app.component';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

export class WebSocketAPI {
    webSocketEndPoint = 'ws://localhost:8080/api/selection';

    webSocket: WebSocket;

    constructor(){
    }

    public openWebSocket(): void {
      this.webSocket = new WebSocket(this.webSocketEndPoint);

      this.webSocket.onopen = (event) => {
        console.log('Open: ', event);
      };

      this.webSocket.onmessage = (event) => {
        const chatMessageDto = JSON.parse(event.data);

      };

      this.webSocket.onclose = (event) => {
        console.log('Close: ', event);
      };
    }

    public sendMessage(chatMessageDto: ChatMessageDto){
      this.webSocket.send(JSON.stringify(chatMessageDto));
    }

    public closeWebSocket() {
      this.webSocket.close();
    }

}
