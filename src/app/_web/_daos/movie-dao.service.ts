import { Filter } from './../../_models/filter';
import { Movie } from '../../_models/movie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDaoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllMovies(): Observable<Movie[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Movie[]>(`movies`, JSON.stringify([new Filter('primary_release_date.gte', '2021')]), { headers: headers });
  }

}
