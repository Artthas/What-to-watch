import React, {useState, ChangeEvent} from 'react';
import Logo from '../logo/logo';
import {useParams} from 'react-router-dom';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {useRef, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import {CommentPost} from '../../types/comment';
import {ThunkAppDispatch} from '../../types/action';
import {postCommentAction} from '../../store/api-actions';
import {AppRoute} from '../../const';

type AddReviewParams = {
  movieId: string;
}

const mapStateToProps = ({films}: State) => ({
  films,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(movieId: string, {rating, comment}: CommentPost) {
    dispatch(postCommentAction(movieId, {rating, comment}));
  },
});


const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function AddReview(props: PropsFromRedux): JSX.Element {
  const {onSubmit} = props;
  const {films} = props;
  const { movieId } = useParams<AddReviewParams>();
  const film = films.find((item) => item.id === parseInt(movieId, 10));

  const [, setReview] = useState({'rating': 0, 'comment': ''});

  const ratingHandler = (rating: number) => {
    setReview((prevState) => ({...prevState, 'rating': rating}));
  };

  const commentHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    setReview((prevState) => ({...prevState, 'comment': evt.target.value}));
  };

  const ratingRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);

  const history = useHistory();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (ratingRef.current !== null && commentRef.current !== null) {
      onSubmit(movieId, {
        rating: ratingRef.current.value,
        comment: commentRef.current.value,
      });
    }
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
              <a className="user-block__link" href="/">Sign out</a>
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
                    <input onClick={() => ratingHandler(idx)} className="rating__input" id={`star-${idx}`} type="radio" name="rating" value={idx} ref={ratingRef}/>
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
              ref={commentRef}
            >
            </textarea>
            <div className="add-review__submit">
              <button
                className="add-review__btn"
                type="submit"
                onClick={() => history.push(AppRoute.Root)}
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
