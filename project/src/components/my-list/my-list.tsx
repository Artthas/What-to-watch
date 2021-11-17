import {useState} from 'react';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {getMyFilms} from '../../store/films-data/selectors';
import {getAuthorizationStatus, getUserEmail} from '../../store/user-data/selectors';
import {useSelector} from 'react-redux';
import {Film} from '../../types/film';
import PreviewPlayer from '../preview-player/preview-player';

function MyList(): JSX.Element {
  const myFilms = useSelector(getMyFilms);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userEmail = useSelector(getUserEmail);

  const [activeFilmId, setActiveFilmId] = useState<number | null>(null);
  let timeOutId: ReturnType<typeof setTimeout>;

  function setActiveFilmIdDelayed(film: Film) {
    timeOutId = setTimeout(() => setActiveFilmId(film.id), 1000);
  }

  function removeActiveFilmId() {
    clearTimeout(timeOutId);
    setActiveFilmId(null);
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Logo />
        </div>

        <h1 className="page-title user-page__title">My list</h1>

        <ul className="user-block">
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            {authorizationStatus === AuthorizationStatus.Auth ? <a className="user-block__link" href="/">{userEmail}</a> : <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>}
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {myFilms.map((film) =>
            (
              <article
                onMouseOver={() => setActiveFilmIdDelayed(film)}
                onMouseOut={removeActiveFilmId}
                className="small-film-card catalog__films-card"
                key={film.id}
              >
                <div className="small-film-card__image">
                  {activeFilmId === film.id
                    ? <PreviewPlayer film={film}/>
                    : <img src={film.preview_image} alt={film.name} width="280" height="175" />}
                </div>
                <h3 className="small-film-card__title">
                  <Link className="small-film-card__link" to={`/movie-page/${film.id}`} onClick={() => removeActiveFilmId()}>{film.name}</Link>
                </h3>
              </article>
            ),
          )}
        </div>
      </section>

      <Footer />

    </div>
  );
}


export default MyList;

