import { TitleService } from './../../../_services/title.service';
import { MovieDaoService } from './../../../_web/_daos/movie-dao.service';
import { RoutingService } from './../../../_utils/routing.service';
import { ActivatedRoute } from '@angular/router';
import { RoomDaoService } from './../../../_web/_daos/room-dao.service';
import { Movie } from './../../../_models/movie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room-movie-found',
  templateUrl: './room-movie-found.component.html',
  styleUrls: ['./room-movie-found.component.scss']
})
export class RoomMovieFoundComponent implements OnInit {

  selectedMovie: Movie = null;

  constructor(
    private roomDaoService: RoomDaoService,
    private movieDaoService: MovieDaoService,
    private titleService: TitleService,
    private route: ActivatedRoute,
    public routingService: RoutingService
  ) { }

  ngOnInit() {
    this.titleService.setDataWithRoute(this.route);

    this.route.paramMap.subscribe(params => {
      this.roomDaoService.getRoom(params.get('roomId')).subscribe(
        _ => {
          this.roomDaoService.getFoundMovie(params.get('roomId')).subscribe(
            (movieId: number) => {
              this.movieDaoService.getMovie(movieId).subscribe((movie: Movie) => {
                  this.selectedMovie = movie;
                  this.movieDaoService.addMoviePoster(this.selectedMovie);
                },
                error => this.routingService.routeToHome())
            },
            error => this.routingService.routeToHome())
        },
        error => this.routingService.routeToRoomNotFoundPage(params.get('roomId')))
    });
  }
}
