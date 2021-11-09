import {Films} from '../../types/film';
import { MouseEvent } from 'react';

type GenreListProps = {
  onUserClick(genreName: string | null): void,
  films: Films,
  genre: string,
}

function GenreList(props: GenreListProps): JSX.Element {
  const {films, genre, onUserClick} = props;

  const filmsGenres = films.map((film) => film.genre);

  const uniqeFilmsGenres = [...new Set(filmsGenres)];

  function onUserClickWrapper(evt: MouseEvent<HTMLLIElement>): void {
    evt.preventDefault();
    onUserClick((evt.target as HTMLLIElement).textContent);
  }

  return (
    <ul className="catalog__genres-list">
      <li
        className={`catalog__genres-item ${genre === 'All genres' ? 'catalog__genres-item--active' : ''}`}
        onClick={onUserClickWrapper}
      >
        <a href="/" className="catalog__genres-link">All genres</a>
      </li>
      {uniqeFilmsGenres.map((currentGenre) =>
        (
          <li
            className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}
            key={currentGenre}
            onClick={onUserClickWrapper}
          >
            <a href="/" className="catalog__genres-link">{currentGenre}</a>
          </li>
        ),
      )}
    </ul>
  );
}

export default GenreList;
