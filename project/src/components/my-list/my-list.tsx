import Footer from '../footer/footer';
import {getMyFilms} from '../../store/films-data/selectors';
import {useSelector} from 'react-redux';
import MovieCard from '../movie-card/movie-card';
import Header from '../header/header';

function MyList(): JSX.Element {
  const myFilms = useSelector(getMyFilms);

  return (
    <div className="user-page">

      <Header isMyList isSignIn={false} headerTitle={'user-page__head'}/>

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

