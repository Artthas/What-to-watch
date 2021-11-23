import {useState} from 'react';
import {Film} from '../../types/film';
import {Link, useHistory} from 'react-router-dom';
import PreviewPlayer from '../preview-player/preview-player';

type MovieCardProps = {
  film: Film,
  isSimilarFilm: boolean
}

function MovieCard({film, isSimilarFilm}: MovieCardProps): JSX.Element {
  const [isActive, setIsActive] = useState(Boolean);
  let timeOutId: ReturnType<typeof setTimeout>;

  function setIsActiveDelayed() {
    timeOutId = setTimeout(() => setIsActive(true), 1000);
  }

  function removeIsActive() {
    clearTimeout(timeOutId);
    setIsActive(false);
  }

  const history = useHistory();

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseOver={setIsActiveDelayed}
      onMouseOut={removeIsActive}
      onClick={() => {
        removeIsActive();
        history.push(`${!isSimilarFilm ? 'films/' : ''}${film.id}`);
      }}
    >
      <div className="small-film-card__image">
        {isActive
          ? <PreviewPlayer film={film}/>
          : <img src={film.preview_image} alt={film.name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${film.id}`} onClick={removeIsActive}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default MovieCard;
