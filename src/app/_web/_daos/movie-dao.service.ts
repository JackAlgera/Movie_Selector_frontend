import { Genre } from './../../_models/genre';
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

  public getAllMovies(...filters: Filter[]): Observable<Movie[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.post<Movie[]>(`movies`, JSON.stringify(filters.filter(f => f.val)), { headers: headers });
  }

  public getAllGenres(): Observable<Genre[]> {
    return this.httpClient.get<Genre[]>(`genres`)
  }

  public addMoviePoster(movie: Movie) {
    this.httpClient.get(`${this.MOVIE_POSTER_URL}${movie.poster_path}?api_key=${this.API_KEY}`, { responseType: 'blob', headers: { SKIP_INTERCEPTOR: '' } })
                    .subscribe(data => this.createImageFromBlob(data, movie));
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
