import { Movie } from './movie';
export class MovieSelection {
  shouldPickRatedMovies: boolean;

  page: number;
  currentMovieIndex: number;
  moviesToDisplayQueue: Movie[];

  constructor() {
    this.shouldPickRatedMovies = false;
    this.page = 1;
    this.currentMovieIndex = -1;
    this.moviesToDisplayQueue = [];
  }

  public reset(): void {
    this.currentMovieIndex = -1;
  }

  public changedGenres(): void {
    this.page = 1;
    this.shouldPickRatedMovies = false;
  }
}
