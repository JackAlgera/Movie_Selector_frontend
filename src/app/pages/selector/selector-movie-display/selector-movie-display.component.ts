import { Movie } from './../../../_models/movie';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selector-movie-display',
  templateUrl: './selector-movie-display.component.html',
  styleUrls: ['./selector-movie-display.component.scss']
})
export class SelectorMovieDisplayComponent implements OnInit {

  @Input() displayedMovie: Movie;

  constructor() { }

  ngOnInit() {
  }

}
