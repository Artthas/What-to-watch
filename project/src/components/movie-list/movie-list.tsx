import {Films} from '../../types/film';
import MovieCard from '../movie-card/movie-card';

type MovieListProps = {
  films: Films,
  isSimilarFilm: boolean
}

function MovieList({films, isSimilarFilm}: MovieListProps): JSX.Element {

  return (
    <div className="catalog__films-list">
      {films.map((film) => <MovieCard isSimilarFilm={isSimilarFilm} film={film} key={film.id} />)}
    </div>
  );
}

export default MovieList;
