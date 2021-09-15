import { ConfigService } from './../../../_utils/config.service';
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
    private routingService: RoutingService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.selection = new MovieSelection(this.configService.getValue("maxMoviesPerRequest", 10));

    this.movieDaoService.getAllGenres().subscribe((genres: Genre[]) => {
      this.allGenres = genres;
    });

    this.updateMovies(true);
  }

  private showNextMovie() : void {
    if (this.selection.isQueueEmpty()) {
      this.selection.shouldPickRatedMovies = !this.selection.shouldPickRatedMovies;
      this.updateMovies(false);
    } else {
      this.displayedMovie = this.selection.getNextMovieToDisplay();
      this.movieDaoService.addMoviePoster(this.displayedMovie);
    }
  }

  public updateMovies(changedGenre: boolean) {
    if (changedGenre) {
      this.selection.changedGenres();
      this.updateMoviesList();
      return;
    }

    if (this.selection.shouldPickRatedMovies) {
      this.movieDaoService.getUnratedMoviesForUser(this.roomId, this.user.userId).subscribe((movies: Movie[]) => {
        if (!movies || movies.length == 0) {
          this.selection.shouldPickRatedMovies = !this.selection.shouldPickRatedMovies;
          this.updateMovies(false);
        } else {
          this.selection.addMoviesToQueue(movies);
          this.showNextMovie();
        }
      })
    } else {
      if (this.selection.shouldUpdateMoviesWithChosenGenreList()) {
        this.selection.updatedMoviesWithGenreList();
        this.updateMoviesList();
      } else {
        this.selection.addNextMoviesWithChosenGenreToQueue();
        this.showNextMovie();
      }
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

  private updateMoviesList() {
    this.movieDaoService.getAllMovies(
          this.user.userId,
          this.roomId,
          new Filter(FilterTypes.GENRE, this.selectedGenre ? this.selectedGenre.id.toString() : null),
          new Filter(FilterTypes.PRIMARY_RELEASE_DATE_GTE, '2021'),
          new Filter(FilterTypes.SORT_BY, 'popularity.desc'),
          new Filter(FilterTypes.PAGE, this.selection.page.toString())
        ).subscribe((movies: Movie[]) => {
      this.selection.setMoviesWithChosenGenre(movies);
      this.selection.page += 1;
      this.showNextMovie();
    });
  }
}
