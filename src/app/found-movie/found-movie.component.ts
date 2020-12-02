import { MovieDaoService } from './../_services/movie-dao.service';
import { RoomDaoService } from 'src/app/_services/room-dao.service';
import { Movie } from './../_models/movie';
import { ERoomEvents } from './../room-handler/room-handler-events';
import { MovieChoiceService } from './../_services/movie-choice.service';
import { Component, OnInit } from '@angular/core';
import { RoomHandlerService } from '../room-handler/room-handler.service';

@Component({
  selector: 'app-found-movie',
  templateUrl: './found-movie.component.html',
  styleUrls: ['./found-movie.component.css']
})
export class FoundMovieComponent implements OnInit {

  constructor(
    public movieChoiceService: MovieChoiceService
  ) { }

  ngOnInit(): void {
  }

}
