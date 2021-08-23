import { MovieDaoService } from '../_web/_daos/movie-dao.service';
import { Movie } from './../_models/movie';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieChoiceService {
/*
  messageEmitter: EventEmitter<string>;

  movies: Movie[];
  currentMovie: Movie;
  private currentMoviePos: number;

  public finalSelectedMovie: Movie = null;

  constructor(
    private movieDaoService: MovieDaoService
  ) {
    this.messageEmitter = new EventEmitter<string>();
    this.movies = [];
    this.currentMoviePos = 0;
  }

  public updateMovieList(): void {
    this.movieDaoService.getAllMovies().subscribe((movies: Movie[]) => {
      console.log('here movie size:', movies.length);
      this.movies = movies;
      this.currentMoviePos = -1;
      this.nextMovie();
    });
  }

  public nextMovie(): Movie {
    this.messageEmitter.emit(ERoomEvents.CHANGED_IMAGE);
    this.currentMoviePos = this.currentMoviePos + 1;

    if (this.movies.length > 0 && this.currentMoviePos < this.movies.length) {
      this.currentMovie = this.movies[this.currentMoviePos];

      if (this.currentMovie.currentMoviePoster == null || this.currentMovie.currentMoviePoster === undefined) {
        let path = null;
        if (this.currentMovie.poster_path != null) {
          path = this.currentMovie.poster_path;
        } else if (this.currentMovie.backdrop_path != null) {
          path = this.currentMovie.backdrop_path;
        }

        if (path != null) {
          this.movieDaoService.getMoviePoster(this.currentMovie.poster_path).subscribe(data => {
            this.createImageFromBlob(data, this.currentMovie);
            this.messageEmitter.emit(ERoomEvents.LOADED_IMAGE);
          });
        }
      }

      this.currentMovie = this.movies[this.currentMoviePos];
      this.messageEmitter.emit(ERoomEvents.NEW_MOVIE);
      return this.currentMovie;
    }
    // else {
    //   this.updateMovieList();
    // }

    return null;
  }

  public createImageFromBlob(image: Blob, movie: Movie): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      movie.currentMoviePoster = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }
*/
}
