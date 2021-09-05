import { Genre } from './genre';
export class Movie {
  id: string;
  title: string;
  overview: string;
  release_date: string;
  genres: Genre[];
  poster_path: string;

  currentMoviePoster: any;
}
