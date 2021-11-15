import {useState} from 'react';
import Logo from '../logo/logo';
import Footer from '../footer/footer';
import {AppRoute, AuthorizationStatus} from '../../const';
import {Link} from 'react-router-dom';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {getEmail} from '../../services/email';

const mapStateToProps = ({films, authorizationStatus}: State) => ({
  films,
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MyList(props: PropsFromRedux): JSX.Element {
  const {films, authorizationStatus} = props;
  const [, setFilm] = useState(0);

  const userEmail = getEmail();

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
          {films.map((film) =>
            (
              <article
                onMouseOver={() => {
                  setFilm(film.id);
                }}
                className="small-film-card catalog__films-card"
                key={film.id}
              >
                <div className="small-film-card__image">
                  <img src={film.preview_image} alt={film.name} width="280" height="175" />
                </div>
                <h3 className="small-film-card__title">
                  <a className="small-film-card__link" href="film-page.html">{film.name}</a>
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


export {MyList};
export default connector(MyList);

