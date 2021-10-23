import { Genre } from './genre';
export class Movie {
  id: string;
  title: string;
  overview: string;
  releaseDate: string;
  genres: Genre[];
  posterPath: string;

  currentMoviePoster: any;
}
