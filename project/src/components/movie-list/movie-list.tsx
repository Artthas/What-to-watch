import Card from '../card/card';
import {Films} from '../../types/film';

type MovieListProps = {
  films: Films
}

function MovieList({films}: MovieListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {[...Array(20).keys()].map((item) => <Card key={item} film={films[item]}/>)}
    </div>
  );
}

export default MovieList;
