import { MovieDaoService } from './../../../_web/_daos/movie-dao.service';
import { Movie } from './../../../_models/movie';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector-handler',
  templateUrl: './selector-handler.component.html',
  styleUrls: ['./selector-handler.component.scss']
})
export class SelectorHandlerComponent implements OnInit {

  moviesToDisplayQueue: Movie[];
  currentMovieIndex: number;

  displayedMovie: Movie;

  constructor(
    private movieDaoService: MovieDaoService
  ) { }

  ngOnInit() {
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
      this.movieDaoService.getMoviePoster(this.displayedMovie).subscribe(data => {
        this.createImageFromBlob(data, this.displayedMovie);
      });
      return ;
    }
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
