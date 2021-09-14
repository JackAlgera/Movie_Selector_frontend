import { MovieSelection } from './../../../_models/movie-selection';
import { FilterTypes } from './../../../_models/filter-types.enum';
import { Genre } from './../../../_models/genre';
import { RoutingService } from './../../../_utils/routing.service';
import { User } from './../../../_models/user';
import { RoomDaoService } from './../../../_web/_daos/room-dao.service';
import { UserService } from './../../../_services/user.service';
import { MovieDaoService } from './../../../_web/_daos/movie-dao.service';
import { Movie } from './../../../_models/movie';
import { Component, Input, OnInit } from '@angular/core';
import { Filter } from 'src/app/_models/filter';

@Component({
  selector: 'app-selector-handler',
  templateUrl: './selector-handler.component.html',
  styleUrls: ['./selector-handler.component.scss']
})
export class SelectorHandlerComponent implements OnInit {

  allGenres: Genre[];
  selectedGenre: Genre = null;

  selection: MovieSelection;
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
    this.user = this.userService.getUser();
    this.selection = new MovieSelection();

    this.movieDaoService.getAllGenres().subscribe((genres: Genre[]) => {
      this.allGenres = genres;
      console.log(this.allGenres);
    });

    this.updateMovies(true);
  }

  private showNextMovie() : void {
    this.selection.currentMovieIndex += 1;

    if (this.selection.moviesToDisplayQueue.length <= 0 || this.selection.currentMovieIndex >= this.selection.moviesToDisplayQueue.length) {
      this.updateMovies(false);
    } else {
      this.displayedMovie = this.selection.moviesToDisplayQueue[this.selection.currentMovieIndex];
      this.movieDaoService.addMoviePoster(this.displayedMovie);
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

  public updateMovies(changedGenre: boolean) {
    console.log(this.roomId);
    this.selection.reset();

    if (changedGenre) {
      this.selection.changedGenres();
    }

    if (this.selection.shouldPickRatedMovies) {
      this.movieDaoService.getUnratedMoviesForUser(this.roomId, this.user.userId).subscribe((movies: Movie[]) => {
        this.selection.shouldPickRatedMovies = false;
        this.selection.moviesToDisplayQueue = movies;
        this.showNextMovie();
      })
    } else {
      this.selection.moviesToDisplayQueue = [];
      this.movieDaoService.getAllMovies(
            this.user.userId,
            this.roomId,
            new Filter(FilterTypes.GENRE, this.selectedGenre ? this.selectedGenre.id.toString() : null),
            new Filter(FilterTypes.PRIMARY_RELEASE_DATE_GTE, '2021'),
            new Filter(FilterTypes.SORT_BY, 'popularity.desc'),
            new Filter(FilterTypes.PAGE, this.selection.page.toString())
          ).subscribe((movies: Movie[]) => {
        this.selection.moviesToDisplayQueue = movies;
        this.selection.page += 1;
        this.selection.shouldPickRatedMovies = true;
        this.showNextMovie();
      })
    }
  }
}
