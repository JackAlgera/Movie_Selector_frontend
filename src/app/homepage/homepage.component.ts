import { ERoomEvents } from './../room-handler/room-handler-events';
import { MovieChoiceService } from './../_services/movie-choice.service';
import { Movie } from './../_models/movie';
import { MovieDaoService } from './../_services/movie-dao.service';
import { Component, OnInit } from '@angular/core';
import { RoomHandlerService } from '../room-handler/room-handler.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  currentMovie: Movie;
  isImageLoading: boolean = true;

  constructor(
    private movieDaoService: MovieDaoService,
    private movieChoiceService: MovieChoiceService,
    public roomHandlerService: RoomHandlerService
  ) { }

  ngOnInit(): void {
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

}
