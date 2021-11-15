import React, {useState, ChangeEvent} from 'react';
import Logo from '../logo/logo';
import {useParams, Link} from 'react-router-dom';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {FormEvent} from 'react';
import {CommentPost} from '../../types/comment';
import {ThunkAppDispatch} from '../../types/action';
import {postCommentAction} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getEmail} from '../../services/email';

type AddReviewParams = {
  movieId: string;
}

const mapStateToProps = ({films, authorizationStatus}: State) => ({
  films,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(movieId: string, {rating, comment}: CommentPost) {
    dispatch(postCommentAction(movieId, {rating, comment}));
  },
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function AddReview(props: PropsFromRedux): JSX.Element {
  const {films, authorizationStatus, onSubmit} = props;
  const { movieId } = useParams<AddReviewParams>();
  const film = films.find((item) => item.id === parseInt(movieId, 10));

  const userEmail = getEmail();

  const [review, setReview] = useState({'rating': 0, 'comment': ''});

  const ratingHandler = (rating: number) => {
    setReview((prevState) => ({...prevState, 'rating': rating}));
  };

  const commentHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    setReview((prevState) => ({...prevState, 'comment': evt.target.value}));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(movieId, {
      rating: review.rating,
      comment: review.comment,
    });
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.background_image} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Logo />
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{film?.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="/">Add review</a>
              </li>
            </ul>
          </nav>

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

        <div className="film-card__poster film-card__poster--small">
          <img src={film?.poster_image} alt={film?.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form
          action="#"
          className="add-review__form"
          onSubmit={handleSubmit}
        >
          <div className="rating">
            <div className="rating__stars">
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((idx) => {
                const component = (
                  <React.Fragment key={idx}>
                    <input onClick={() => ratingHandler(idx)} className="rating__input" id={`star-${idx}`} type="radio" name="rating" value={idx}/>
                    <label className="rating__label" htmlFor={`star-${idx}`}>{`Rating ${idx}`}</label>
                  </React.Fragment>
                );
                return component;
              })}
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => commentHandler(evt)}
            >
            </textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
              >
              Post
              </button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export {AddReview};
export default connector(AddReview);
