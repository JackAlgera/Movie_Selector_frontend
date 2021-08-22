import { MovieChoiceService } from './_services/movie-choice.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    public movieChoiceService: MovieChoiceService
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }

}
