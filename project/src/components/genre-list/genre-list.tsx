import {Films} from '../../types/film';

type GenreListProps = {
  onUserClick(genreName: string): void,
  films: Films,
  genre: string,
}

function GenreList(props: GenreListProps): JSX.Element {
  const {films, genre, onUserClick} = props;

  const filmsGenres = films.map((film) => film.genre);

  const uniqeFilmsGenres = [...new Set(filmsGenres)];

  return (
    <ul className="catalog__genres-list">
      <li
        className={`catalog__genres-item ${genre === 'All genres' ? 'catalog__genres-item--active' : ''}`}
        onClick={(evt: any) => {
          evt.preventDefault();
          onUserClick(evt.target.textContent);
        }}
      >
        <a href="/" className="catalog__genres-link">All genres</a>
      </li>
      {uniqeFilmsGenres.map((currentGenre, index, array) =>
        (
          <li
            className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}
            key={array[index]}
            onClick={(evt: any) => {
              evt.preventDefault();
              onUserClick(evt.target.textContent);
            }}
          >
            <a href="/" className="catalog__genres-link">{currentGenre}</a>
          </li>
        ),
      )}
    </ul>
  );
}

export default GenreList;
