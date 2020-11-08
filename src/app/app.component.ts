import { ChatMessageDto } from './_models/chatMessageDto';
import { WebSocketAPI } from './_services/web-socket-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'video-selector';

  name: string;
  webSocketAPI: WebSocketAPI;

  constructor(
  ) { }

  ngOnInit(): void {
    this.webSocketAPI = new WebSocketAPI();
    this.webSocketAPI.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketAPI.closeWebSocket();
  }

  sendMessage(sendForm: NgForm){
    const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
    this.webSocketAPI.sendMessage(chatMessageDto);
    sendForm.controls.message.reset();
  }

}
