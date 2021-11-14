import Logo from '../logo/logo';
import Footer from '../footer/footer';
import MovieList from '../movie-list/movie-list';
import GenreList from '../genre-list/genre-list';
import {Films} from '../../types/film';
import {useHistory, Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {AppRoute, AuthorizationStatus} from '../../const';
import {connect, ConnectedProps} from 'react-redux';
import {Dispatch} from 'redux';
import {Actions} from '../../types/action';
import {changeGenre, loadFilms, showMoreFilms} from '../../store/action';
import {State} from '../../types/state';
import ShowMore from '../show-more/show-more';

const mapStateToProps = ({films, genre, count, authorizationStatus, userEmail}: State) => ({
  films,
  genre,
  count,
  authorizationStatus,
  userEmail,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onComponentLoad(films: Films) {
    dispatch(loadFilms(films));
  },
  onUserClick(genreName: string) {
    dispatch(changeGenre(genreName));
  },
  onShowMoreClick() {
    dispatch(showMoreFilms());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Main(props: PropsFromRedux): JSX.Element {
  const {films, genre, count, authorizationStatus, userEmail, onComponentLoad, onUserClick, onShowMoreClick} = props;
  const history = useHistory();
  const [filteredFilms, setFilteredFilms] = useState(films);

  useEffect(() => {onComponentLoad(films);});

  useEffect(() => {
    const isAllGenresTab = genre === 'All genres';
    const tempFilteredFilms = isAllGenresTab ? [...films] : films.filter((film) => film.genre === genre);
    if (count < tempFilteredFilms.length) {
      setFilteredFilms(tempFilteredFilms.slice(0, count));
    } else {
      setFilteredFilms(tempFilteredFilms);
    }
  }, [genre, count, films]);

  return (
    <div>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
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
              {authorizationStatus === AuthorizationStatus.Auth ? <a className="user-block__link" href="/">{userEmail}</a> : <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>}
            </li>
          </ul>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={films[1].poster_image} alt={films[1].name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{films[1].name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{films[1].genre}</span>
                <span className="film-card__year">{films[1].released}</span>
              </p>

              <div className="film-card__buttons">
                <button
                  className="btn btn--play film-card__button"
                  type="button"
                  onClick={() => history.push(AppRoute.Player)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use href="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button
                  className="btn btn--list film-card__button"
                  type="button"
                  onClick={() => history.push(AppRoute.MyList)}
                >
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use href="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={films} genre={genre} onUserClick={onUserClick}/>

          <MovieList films={filteredFilms}/>

          {count <= filteredFilms.length && <ShowMore onShowMoreClick={onShowMoreClick}/>}

        </section>

        <Footer />

      </div>
    </div>
  );
}

export {Main};
export default connector(Main);
