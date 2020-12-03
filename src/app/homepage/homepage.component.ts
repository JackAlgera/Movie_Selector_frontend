import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketAPI } from './../_services/web-socket-api.service';
import { ERoomEvents } from './../room-handler/room-handler-events';
import { MovieChoiceService } from './../_services/movie-choice.service';
import { Movie } from './../_models/movie';
import { MovieDaoService } from './../_services/movie-dao.service';
import { Component, OnInit } from '@angular/core';
import { RoomHandlerService } from '../room-handler/room-handler.service';
import { SelectionMessageDto } from '../_dtos/selection-message-dto';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  currentMovie: Movie;
  isImageLoading: boolean;

  constructor(
    private movieDaoService: MovieDaoService,
    private movieChoiceService: MovieChoiceService,
    public roomHandlerService: RoomHandlerService,
    private webSocketAPI: WebSocketAPI,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomId');

    if (!this.roomHandlerService.currentUser && !this.roomHandlerService.currentRoom) {
      this.router.navigate(['/rooms']);
    }

    this.isImageLoading = true;

    this.movieChoiceService.messageEmitter.subscribe(roomEvent => {
      switch (roomEvent) {
        case ERoomEvents.LOADED_IMAGE:
          this.isImageLoading = false;
          break;
        case ERoomEvents.CHANGED_IMAGE:
          this.isImageLoading = true;
          break;
        default:
          break;
      }
    });

    this.movieChoiceService.updateMovieList();
    this.currentMovie = this.movieChoiceService.getCurrentMovie();
  }

  public nextMovie(): void {
    this.currentMovie = this.movieChoiceService.nextMovie();
  }

  public likeMovie(): void {
    this.webSocketAPI.sendMessage(new SelectionMessageDto(
      this.roomHandlerService.currentUser.userId,
      this.currentMovie.imdb_id,
      this.roomHandlerService.currentRoom.roomId));
    this.nextMovie();
  }

  public dislikeMovie(): void {
    this.nextMovie();
  }

}
