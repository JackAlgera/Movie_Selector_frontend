import { HttpErrorResponse } from '@angular/common/http';
import { FilterTypes } from './../../../_models/filter-types.enum';
import { UserDaoService } from './../../../_web/_daos/user-dao.service';
import { Genre } from './../../../_models/genre';
import { RoutingService } from './../../../_utils/routing.service';
import { User } from './../../../_models/user';
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

  displayedMovie: Movie;
  moviesToDisplayQueue: Movie[];
  shouldRateOtherUsersMovies: Boolean = false;

  @Input() roomId: string;
  user: User;

  constructor(
    private movieDaoService: MovieDaoService,
    private userService: UserService,
    private userDaoService: UserDaoService,
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser();

    this.movieDaoService.getAllGenres().subscribe((genres: Genre[]) => {
      this.allGenres = genres;
    });

    this.updateMoviesToDisplay();
  }

  public updateMoviesToDisplay() : void {
    if (this.shouldRateOtherUsersMovies) {
      this.movieDaoService.getOtherUsersUnratedMovies(this.user.userId).subscribe((movies: Movie[]) => {
        if (!movies || movies.length === 0) {
          this.shouldRateOtherUsersMovies = !this.shouldRateOtherUsersMovies;
          this.updateMoviesToDisplay();
        } else {
          this.moviesToDisplayQueue = movies;
          this.showNextMovie();
        }
      })
    } else {
      this.movieDaoService.getUnratedMoviesForUser(
            this.user.userId,
            new Filter(FilterTypes.GENRE, this.selectedGenre ? this.selectedGenre.id.toString() : null),
            new Filter(FilterTypes.PRIMARY_RELEASE_DATE_GTE, '2021'),
            new Filter(FilterTypes.SORT_BY, 'popularity.desc')
          ).subscribe((movies: Movie[]) => {
        this.moviesToDisplayQueue = movies;
        this.showNextMovie();
      });
    }
  }

  private showNextMovie() : void {
    if (this.moviesToDisplayQueue.length === 0) {
      this.shouldRateOtherUsersMovies = !this.shouldRateOtherUsersMovies;
      this.updateMoviesToDisplay();
    } else {
      this.displayedMovie = this.moviesToDisplayQueue.pop();
      this.movieDaoService.addMoviePoster(this.displayedMovie);
    }
  }

  public rateMovie(likeRating : number) : void {
    this.userDaoService.rateMovie(this.user.userId, this.displayedMovie.id, likeRating).subscribe(
      _ => this.showNextMovie(),
      (error: HttpErrorResponse) => {
        console.log(error);
        console.log(this.user);
        if (error.status === 409) {
          this.routingService.routeToMovieFoundPage(this.user.roomId)
        }
      }
    );
  }
}
