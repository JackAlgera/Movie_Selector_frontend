import { Movie } from './../_models/movie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDaoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllMovies(): Observable<Movie[]>  {
    return this.httpClient.get<Movie[]>(`movies`);
  }

}
