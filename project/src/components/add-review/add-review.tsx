import React, {useState, ChangeEvent} from 'react';
import {useParams} from 'react-router-dom';
import {FormEvent} from 'react';
import {CommentPost} from '../../types/comment';
import {postCommentAction} from '../../store/api-actions';
import {AppRoute} from '../../const';
import {useHistory} from 'react-router-dom';
import {getFilms} from '../../store/films-data/selectors';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../header/header';

type AddReviewParams = {
  movieId: string;
}

function AddReview(): JSX.Element {
  const films = useSelector(getFilms);

  const dispatch = useDispatch();

  const onSubmit = (movieId: string, {rating, comment}: CommentPost) => {
    dispatch(postCommentAction(movieId, {rating, comment}));
  };

  const { movieId } = useParams<AddReviewParams>();
  const film = films.find((item) => item.id === parseInt(movieId, 10));

  const [review, setReview] = useState({'rating': 0, 'comment': ''});

  const history = useHistory();

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
    history.push(`${AppRoute.MoviePage}${movieId}`);
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film?.background_image} alt={film?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header isMyList={false} isSignIn={false} headerTitle={'film-card__head'}/>

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

export default AddReview;
