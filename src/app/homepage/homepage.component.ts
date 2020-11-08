import { Movie } from './../_models/movie';
import { MovieDaoService } from './../_services/movie-dao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  movies: Movie[] = [];

  constructor(
    private movieDaoService: MovieDaoService
  ) { }

  ngOnInit(): void {
    this.updateMovieList();
  }

  private updateMovieList(): void {
    this.movieDaoService.getAllMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
  }

}
