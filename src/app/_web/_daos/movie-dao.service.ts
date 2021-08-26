import { Movie } from './../../_models/movie';
import { Filter } from './../../_models/filter';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDaoService {

  private MOVIE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';
  private API_KEY = "096873bdfea4d97d0af6b7ab7faa38bb";

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllMovies(): Observable<Movie[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Movie[]>(`movies`, JSON.stringify([new Filter('primary_release_date.gte', '2021')]), { headers: headers });
  }

  public getMoviePoster(movie: Movie) : Observable<Blob> {
    return this.httpClient.get(`${this.MOVIE_POSTER_URL}${movie.poster_path}?api_key=${this.API_KEY}`, { responseType: 'blob', headers: { SKIP_INTERCEPTOR: '' } });
  }
}
