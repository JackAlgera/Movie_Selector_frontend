import { MovieChoiceService } from './_services/movie-choice.service';
import { WebSocketAPI } from './_services/web-socket-api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private webSocketAPI: WebSocketAPI,
    public movieChoiceService: MovieChoiceService
  ) { }

  ngOnInit(): void {
    this.webSocketAPI.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketAPI.closeWebSocket();
  }

}
