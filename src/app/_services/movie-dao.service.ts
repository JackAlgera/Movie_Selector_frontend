import { Movie } from './../_models/movie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDaoService {

  private MOVIE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllMovies(): Observable<Movie[]>  {
    return this.httpClient.get<Movie[]>(`movies`);
  }

  public getMoviePoster(imagePath: string): Observable<Blob> {
    return this.httpClient.get(`${this.MOVIE_POSTER_URL}${imagePath}`, { responseType: 'blob', headers: { SKIP_INTERCEPTOR: '' } });
  }

}
