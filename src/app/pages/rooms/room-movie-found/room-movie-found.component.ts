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

  roomId: string;
  selectedMovie: Movie = null;

  constructor(
    private roomDaoService: RoomDaoService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.roomDaoService.getRoom(params.get('roomId')).subscribe(
        _ => {
          this.roomId = params.get('roomId');
          this.roomDaoService.getFoundMovie(this.roomId).subscribe(
            (movie: Movie) => {
              this.selectedMovie = movie;
            },
            error => {
              this.routingService.routeToHome();
            });
        },
        error => {
          this.routingService.routeToRoomNotFoundPage(params.get('roomId'));
        })
    });
  }

}
