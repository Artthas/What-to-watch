import {useState} from 'react';
import {Films} from '../../types/film';
import {Link} from 'react-router-dom';
import PreviewPlayer from '../preview-player/preview-player';

type MovieListProps = {
  films: Films
}

function MovieList({films}: MovieListProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<number | null>(null);

  return (
    <div className="catalog__films-list">
      {films.map((film) =>
        (
          <article
            onMouseOver={() => {
              function setActiveFilmIdTime() {
                if (film.id !== null) {
                  setActiveFilmId(film.id);
                }
              }
              setTimeout(setActiveFilmIdTime, 1000);
            }}
            onMouseOut={() => {
              function setActiveFilmIdTime() {
                setActiveFilmId(null);
              }
              setTimeout(setActiveFilmIdTime, 1000);
            }}
            className="small-film-card catalog__films-card"
            key={film.id}
          >
            <div className="small-film-card__image">
              {activeFilmId === film.id
                ? <PreviewPlayer film={film}/>
                : <img src={film.preview_image} alt={film.name} width="280" height="175" />}
            </div>
            <h3 className="small-film-card__title">
              <Link className="small-film-card__link" to={`/movie-page/${film.id}`}>{film.name}</Link>
            </h3>
          </article>
        ),
      )}
    </div>
  );
}

export default MovieList;
