import {useState} from 'react';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import PreviewPlayer from '../preview-player/preview-player';

type MovieCardProps = {
  film: Film
}

function MovieCard({film}: MovieCardProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<number | null>(null);
  let timeOutId: ReturnType<typeof setTimeout>;

  function setActiveFilmIdDelayed(filmData: Film) {
    timeOutId = setTimeout(() => setActiveFilmId(filmData.id), 1000);
  }

  function removeActiveFilmId() {
    clearTimeout(timeOutId);
    setActiveFilmId(null);
  }

  return (
    <article
      onMouseOver={() => setActiveFilmIdDelayed(film)}
      onMouseOut={removeActiveFilmId}
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        {activeFilmId === film.id
          ? <PreviewPlayer film={film}/>
          : <img src={film.preview_image} alt={film.name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/movie-page/${film.id}`} onClick={removeActiveFilmId}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default MovieCard;
