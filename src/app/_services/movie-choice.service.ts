import { RoomHandlerService } from './../room-handler/room-handler.service';
import { RoomDaoService } from 'src/app/_services/room-dao.service';
import { ERoomEvents } from './../room-handler/room-handler-events';
import { MovieDaoService } from './movie-dao.service';
import { Movie } from './../_models/movie';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieChoiceService {

  messageEmitter: EventEmitter<string>;

  movies: Movie[];
  private currentMovie: Movie;
  private currentMoviePos: number;

  public finalSelectedMovie: Movie = null;

  constructor(
    private movieDaoService: MovieDaoService,
    private roomDaoService: RoomDaoService,
    private roomHandlerService: RoomHandlerService
  ) {
    this.messageEmitter = new EventEmitter<string>();
    this.movies = [];
    this.currentMoviePos = 0;
  }

  public updateMovieList(): void {
    this.movieDaoService.getAllMovies().subscribe((movies: Movie[]) => {
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

      return this.currentMovie = this.movies[this.currentMoviePos];
    }
    // else {
    //   this.updateMovieList();
    // }

    return null;
  }

  public setFoundMovie(): void {
    this.roomDaoService.getSelectedRoomMovie(this.roomHandlerService.currentRoom.roomId).subscribe((movie: Movie) => {
      this.finalSelectedMovie = movie;
      let path = null;
      if (this.finalSelectedMovie.poster_path != null) {
        path = this.finalSelectedMovie.poster_path;
      } else if (this.finalSelectedMovie.backdrop_path != null) {
        path = this.finalSelectedMovie.backdrop_path;
      }

      if (path != null) {
        this.movieDaoService.getMoviePoster(this.finalSelectedMovie.poster_path).subscribe(data => {
          this.createImageFromBlob(data, this.finalSelectedMovie);
        });
      }
    });

    this.messageEmitter.emit(ERoomEvents.SELECTED_MOVIE);
  }

  public getCurrentMovie(): Movie {
    return this.currentMovie;
  }

  private createImageFromBlob(image: Blob, movie: Movie): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      movie.currentMoviePoster = reader.result;
    }, false);

    if (image) {
       reader.readAsDataURL(image);
    }
  }

}
