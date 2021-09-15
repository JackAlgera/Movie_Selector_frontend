import { Movie } from './movie';
export class MovieSelection {
  shouldPickRatedMovies: boolean;

  page: number;
  currentMovieIndex: number;
  moviesWithChosenGenre: Movie[];

  movieDisplayQueue: Movie[];
  maxMoviesPerRequest: number;

  constructor(maxMoviesPerRequest: number) {
    this.shouldPickRatedMovies = false;
    this.page = 1;
    this.currentMovieIndex = -1;
    this.moviesWithChosenGenre = [];
    this.movieDisplayQueue = [];
    this.maxMoviesPerRequest = maxMoviesPerRequest;
  }

  public updatedMoviesWithGenreList() {
    this.currentMovieIndex = -1;
    this.moviesWithChosenGenre = [];
    this.movieDisplayQueue = [];
  }

  public changedGenres(): void {
    this.updatedMoviesWithGenreList();
    this.page = 1;
    this.shouldPickRatedMovies = false;
  }

  public setMoviesWithChosenGenre(movies: Movie[]) {
    this.moviesWithChosenGenre = movies;
    this.addMoviesToQueue(this.moviesWithChosenGenre.slice(0, this.maxMoviesPerRequest));
    if (!this.shouldPickRatedMovies) {
      this.currentMovieIndex = this.maxMoviesPerRequest - 1;
    }
  }

  public isQueueEmpty(): boolean {
    return this.movieDisplayQueue.length <= 0;
  }

  public addMoviesToQueue(movies: Movie[]) {
    movies.forEach(movie => this.movieDisplayQueue.push(movie));
  }

  public addNextMoviesWithChosenGenreToQueue() {
    if (this.currentMovieIndex + this.maxMoviesPerRequest >= this.moviesWithChosenGenre.length - 1) {
      this.addMoviesToQueue(this.moviesWithChosenGenre.slice(this.currentMovieIndex + 1, this.moviesWithChosenGenre.length));
      this.currentMovieIndex = this.moviesWithChosenGenre.length - 1;
    } else {
      this.addMoviesToQueue(this.moviesWithChosenGenre.slice(this.currentMovieIndex + 1, this.currentMovieIndex + 1 + this.maxMoviesPerRequest));
      this.currentMovieIndex = this.currentMovieIndex + this.maxMoviesPerRequest;
    }
  }

  public shouldUpdateMoviesWithChosenGenreList(): boolean {
    return this.moviesWithChosenGenre.length <= 0 || (this.currentMovieIndex >= this.moviesWithChosenGenre.length - 1);
  }

  public getNextMovieToDisplay(): Movie {
    return this.movieDisplayQueue.pop();
  }
}
