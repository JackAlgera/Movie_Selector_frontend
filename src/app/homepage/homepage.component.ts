import { MovieChoiceService } from './../_services/movie-choice.service';
import { Movie } from './../_models/movie';
import { MovieDaoService } from './../_services/movie-dao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  currentMovie: Movie;
  isImageLoading: boolean;

  constructor(
    private movieDaoService: MovieDaoService,
    private movieChoiceService: MovieChoiceService
  ) { }

  ngOnInit(): void {
    this.movieChoiceService.updateMovieList();
    this.currentMovie = this.movieChoiceService.getCurrentMovie();
  }

  public nextMovie(): void {
    this.currentMovie = this.movieChoiceService.nextMovie();
  }

}
