import { RoutingService } from './../../../_utils/routing.service';
import { User } from './../../../_models/user';
import { RoomDaoService } from './../../../_web/_daos/room-dao.service';
import { UserService } from './../../../_services/user.service';
import { MovieDaoService } from './../../../_web/_daos/movie-dao.service';
import { Movie } from './../../../_models/movie';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector-handler',
  templateUrl: './selector-handler.component.html',
  styleUrls: ['./selector-handler.component.scss']
})
export class SelectorHandlerComponent implements OnInit {

  moviesToDisplayQueue: Movie[];
  currentMovieIndex: number;

  displayedMovie: Movie;

  @Input() roomId: string;
  user: User;

  constructor(
    private movieDaoService: MovieDaoService,
    private userService: UserService,
    private roomDaoService: RoomDaoService,
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    console.log("here");
    this.user = this.userService.getUser();

    this.currentMovieIndex = -1;

    this.movieDaoService.getAllMovies().subscribe((movies: Movie[]) => {
      this.moviesToDisplayQueue = movies;
      this.showNextMovie();
    })
  }

  private showNextMovie() : void {
    this.currentMovieIndex += 1;

    if (this.moviesToDisplayQueue.length <= 0 || this.currentMovieIndex >= this.moviesToDisplayQueue.length) {
        this.movieDaoService.getAllMovies().subscribe((movies: Movie[]) => {
          this.moviesToDisplayQueue = movies;
          this.currentMovieIndex = -1;
        },
        _ => {},
        () => {
          this.showNextMovie();
        }
      )
    } else {
      this.displayedMovie = this.moviesToDisplayQueue[this.currentMovieIndex];
      this.movieDaoService.getMoviePoster(this.displayedMovie.poster_path).subscribe(data => {
        this.createImageFromBlob(data, this.displayedMovie);
      });
      return ;
    }
  }

  public rateLikeMovie(likeRating : number) : void {
    this.roomDaoService.likeMovie(this.roomId, this.displayedMovie.id, this.user.userId, likeRating).subscribe((foundMovie: boolean) => {
      if (foundMovie) {
        this.routingService.routeToMovieFoundPage(this.roomId);
      } else {
        this.showNextMovie();
      }
    });
  }

  private createImageFromBlob(image: Blob, movie: Movie) : void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      movie.currentMoviePoster = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }
}
