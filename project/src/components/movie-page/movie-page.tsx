import Logo from '../logo/logo';
import Footer from '../footer/footer';
import {films} from '../../mocks/films';
import {Film} from '../../types/film';
import {useState} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import MoviePageOverview from '../movie-page-overview/movie-page-overview';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';
import MovieList from '../movie-list/movie-list';

type MoviePageParams = {
  movieId: string;
};

function MoviePage(): JSX.Element {
  const history = useHistory();

  const { movieId } = useParams<MoviePageParams>();
  const film = films.find((_, index) => index === parseInt(movieId, 10));

  const filteredFilms = films.filter((theFilm) => film?.genre === theFilm.genre);

  const [component, setComponent] = useState<string>('Overview');

  const getComponentByType = (type: string | null, theFilm: Film | undefined) => {
    switch (type) {
      case 'Overview':
        return <MoviePageOverview film={theFilm}/>;
      case 'Details':
        return <MoviePageDetails film={theFilm}/>;
      case 'Reviews':
        return <MoviePageReviews film={theFilm}/>;
    }
  };

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.background_image} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header film-card__head">
            <div className="logo">
              <Logo />
            </div>

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link" href="/">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={() => history.push(`/player/${film?.id}`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use href="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use href="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <Link className="btn film-card__button" to={`/add-review/${film?.id}`}>Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film?.poster_image} alt={film?.name} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className={`film-nav__item${component === 'Overview' || null ? ' film-nav__item--active' : ''}`}>
                    <a
                      style={{cursor: 'pointer'}}
                      className="film-nav__link"
                      onClick={(evt) => {
                        setComponent(evt.currentTarget.innerText);
                      }}
                    >Overview
                    </a>
                  </li>
                  <li className={`film-nav__item${component === 'Details' ? ' film-nav__item--active' : ''}`}>
                    <a
                      style={{cursor: 'pointer'}}
                      className="film-nav__link"
                      onClick={(evt) => {
                        setComponent(evt.currentTarget.innerText);
                      }}
                    >Details
                    </a>
                  </li>
                  <li className={`film-nav__item${component === 'Reviews' ? ' film-nav__item--active' : ''}`}>
                    <a
                      style={{cursor: 'pointer'}}
                      className="film-nav__link"
                      onClick={(evt) => {
                        setComponent(evt.currentTarget.innerText);
                      }}
                    >Reviews
                    </a>
                  </li>
                </ul>
              </nav>
              {getComponentByType(component, film)}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MovieList films={filteredFilms}/>

        </section>

        <Footer />

      </div>
    </div>
  );
}

export default MoviePage;
