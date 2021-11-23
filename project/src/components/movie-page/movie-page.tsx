import Footer from '../footer/footer';
import {Film} from '../../types/film';
import {useCallback, useState, useEffect} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import MoviePageOverview from '../movie-page-overview/movie-page-overview';
import MoviePageDetails from '../movie-page-details/movie-page-details';
import MoviePageReviews from '../movie-page-reviews/movie-page-reviews';
import MovieList from '../movie-list/movie-list';
import {ThunkAppDispatch} from '../../types/action';
import {fetchMyFilmsAction, fetchCommentAction, fetchSimilarFilmsAction,fetchCurrentFilmAction, postMyFilmAction} from '../../store/api-actions';
import {store} from '../../index';
import {AuthorizationStatus} from '../../const';
import Header from '../header/header';
import {getCurrentFilm, getSimilarFilms} from '../../store/films-data/selectors';
import {getComments} from '../../store/films-other-data/selectors';
import {getAuthorizationStatus} from '../../store/user-data/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {MouseEvent} from 'react';

type MoviePageParams = {
  movieId: string;
};

function MoviePage(): JSX.Element {
  const currentFilm = useSelector(getCurrentFilm);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const comments = useSelector(getComments);
  const similarFilms = useSelector(getSimilarFilms);


  const history = useHistory();

  const dispatch = useDispatch();

  const onFavoriteClick = (movieId: string, status: number) => {
    dispatch(postMyFilmAction(movieId, status));
    dispatch(fetchCurrentFilmAction(movieId));
    dispatch(fetchMyFilmsAction());
  };

  const { movieId } = useParams<MoviePageParams>();

  const [component, setComponent] = useState<string>('Overview');

  useEffect(() => {
    (store.dispatch as ThunkAppDispatch)(fetchCommentAction(movieId));
    (store.dispatch as ThunkAppDispatch)(fetchSimilarFilmsAction(movieId));
    (store.dispatch as ThunkAppDispatch)(fetchCurrentFilmAction(movieId));
  }, [movieId]);

  const handleClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    currentFilm.is_favorite ? onFavoriteClick(movieId, 0) : onFavoriteClick(movieId, 1);
  };

  const getComponentByType = (type: string | null, filmData: Film | undefined) => {
    switch (type) {
      case 'Overview':
        return <MoviePageOverview film={filmData}/>;
      case 'Details':
        return <MoviePageDetails film={filmData}/>;
      case 'Reviews':
        return <MoviePageReviews comments={comments}/>;
    }
  };

  const onTabClick = useCallback((evt) => {
    evt.preventDefault();
    setComponent(evt.currentTarget.innerText);
  },[]);

  return (
    <div>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={currentFilm.background_image} alt={currentFilm.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header isMyList={false} isSignIn={false} headerTitle={'film-card__head'}/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{currentFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{currentFilm.genre}</span>
                <span className="film-card__year">{currentFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={() => history.push(`/player/${currentFilm.id}`)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use href="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={handleClick}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use href={`#${currentFilm.is_favorite ? 'in-list' : 'add'}`}></use>
                  </svg>
                  <span>My list</span>
                </button>
                {authorizationStatus === AuthorizationStatus.Auth ? <Link className="btn film-card__button" to={`/films/${currentFilm.id}/review`}>Add review</Link> : ''}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={currentFilm.poster_image} alt={currentFilm.name} width="218" height="327" />
            </div>
            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className={`film-nav__item${component === 'Overview' || null ? ' film-nav__item--active' : ''}`}>
                    <a
                      href="/"
                      className="film-nav__link"
                      onClick={onTabClick}
                    >Overview
                    </a>
                  </li>
                  <li className={`film-nav__item${component === 'Details' ? ' film-nav__item--active' : ''}`}>
                    <a
                      href="/"
                      className="film-nav__link"
                      onClick={onTabClick}
                    >Details
                    </a>
                  </li>
                  <li className={`film-nav__item${component === 'Reviews' ? ' film-nav__item--active' : ''}`}>
                    <a
                      href="/"
                      className="film-nav__link"
                      onClick={onTabClick}
                    >Reviews
                    </a>
                  </li>
                </ul>
              </nav>
              {getComponentByType(component, currentFilm)}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MovieList films={similarFilms} isSimilarFilm/>

        </section>

        <Footer />

      </div>
    </div>
  );
}

export default MoviePage;
