import Logo from '../logo/logo';
import Footer from '../footer/footer';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {getMyFilms} from '../../store/films-data/selectors';
import {getAuthorizationStatus, getUserAvatarUrl} from '../../store/user-data/selectors';
import {useSelector} from 'react-redux';
import MovieCard from '../movie-card/movie-card';

function MyList(): JSX.Element {
  const myFilms = useSelector(getMyFilms);
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const userAvatarUrl = useSelector(getUserAvatarUrl);

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
              <img src={userAvatarUrl} alt="User avatar" width="63" height="63" />
            </div>
          </li>
          <li className="user-block__item">
            {authorizationStatus === AuthorizationStatus.Auth ? <Link className="user-block__link" to="/">Sign Out</Link> : <Link className="user-block__link" to={AppRoute.SignIn}>Sign in</Link>}
          </li>
        </ul>
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {myFilms.map((film) => <MovieCard film={film} key={film.id} />)}
        </div>
      </section>

      <Footer />

    </div>
  );
}


export default MyList;

