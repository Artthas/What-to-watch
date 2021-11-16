import Footer from '../footer/footer';
import MovieList from '../movie-list/movie-list';
import GenreList from '../genre-list/genre-list';
import {useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {AppRoute} from '../../const';
import {changeGenre, showMoreFilms} from '../../store/action';
import ShowMore from '../show-more/show-more';
import Header from '../header/header';
import {getFilms} from '../../store/films-data/selectors';
import {getGenre, getCount} from '../../store/films-other-data/selectors';
import {useSelector, useDispatch} from 'react-redux';

function Main(): JSX.Element {
  const films = useSelector(getFilms);
  const genre = useSelector(getGenre);
  const count = useSelector(getCount);

  const dispatch = useDispatch();

  const onUserClick = (genreName: string) => {
    dispatch(changeGenre(genreName));
  };

  const onShowMoreClick = () => {
    dispatch(showMoreFilms());
  };

  const history = useHistory();
  const [filteredFilms, setFilteredFilms] = useState(films);

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

        <Header />

        {!!films.length &&
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
        </div>}
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

export default Main;
