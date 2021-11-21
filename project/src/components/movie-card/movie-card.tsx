import {useState} from 'react';
import {Film} from '../../types/film';
import {Link} from 'react-router-dom';
import PreviewPlayer from '../preview-player/preview-player';

type MovieCardProps = {
  film: Film
}

function MovieCard({film}: MovieCardProps): JSX.Element {
  const [isActive, setIsActive] = useState(Boolean);
  let timeOutId: ReturnType<typeof setTimeout>;

  function setIsActiveDelayed() {
    timeOutId = setTimeout(() => setIsActive(true), 1000);
  }

  function removeIsActive() {
    clearTimeout(timeOutId);
    setIsActive(false);
  }

  return (
    <article
      onMouseOver={setIsActiveDelayed}
      onMouseOut={removeIsActive}
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        {isActive
          ? <PreviewPlayer film={film}/>
          : <img src={film.preview_image} alt={film.name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/movie-page/${film.id}`} onClick={removeIsActive}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default MovieCard;
