import React, {useState, ChangeEvent} from 'react';
import {useParams} from 'react-router-dom';
import {FormEvent} from 'react';
import {CommentPost} from '../../types/comment';
import {postCommentAction} from '../../store/api-actions';
import {useHistory} from 'react-router-dom';
import {getFilms} from '../../store/films-data/selectors';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../header/header';
import ErrorScreen from '../error-screen/error-screen';

type AddReviewParams = {
  movieId: string;
}

function AddReview(): JSX.Element {
  const films = useSelector(getFilms);

  const dispatch = useDispatch();

  const onSubmit = (movieId: string, {rating, comment}: CommentPost) => {
    setDisabledAttributeBtn(true);
    setDisabledAttributeForm(true);
    dispatch(postCommentAction(movieId, {rating, comment}, setDisabledAttributeBtn, setDisabledAttributeForm, setErrorScreenComponent, getSuccessRoute));
  };

  const handleErrorScreenClose = () => {
    setErrorScreenComponent(false);
  };

  const getSuccessRoute = () => history.push(`/films/${movieId}`);

  const [errorScreenComponent, setErrorScreenComponent] = useState(Boolean);

  const getErrorScreenComponent = (type: boolean) => {
    switch (type) {
      case true:
        return <ErrorScreen handleClose={handleErrorScreenClose}/>;
      case false:
        return '';
    }
  };

  const { movieId } = useParams<AddReviewParams>();
  const film = films.find((item) => item.id === parseInt(movieId, 10));

  const [review, setReview] = useState({'rating': 0, 'comment': ''});

  const [disabledAttributeBtn, setDisabledAttributeBtn] = useState(true);

  const [disabledAttributeForm, setDisabledAttributeForm] = useState(Boolean);

  const history = useHistory();

  const ratingHandler = (rating: number) => {
    setReview((prevState) => ({...prevState, 'rating': rating}));
    if (review.comment.length < 50 || review.comment.length > 400 || rating === 0) {
      setDisabledAttributeBtn(true);
    } else {
      setDisabledAttributeBtn(false);
    }
  };

  const commentHandler = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    evt.preventDefault();
    setReview((prevState) => ({...prevState, 'comment': evt.target.value}));
    if (review.comment.length < 50 || review.comment.length > 400 || review.rating === 0) {
      setDisabledAttributeBtn(true);
    } else {
      setDisabledAttributeBtn(false);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(movieId, {
      rating: review.rating,
      comment: review.comment,
    });
  };

  return (
    <React.Fragment>
      {getErrorScreenComponent(errorScreenComponent)}
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
                      <input
                        onClick={() => ratingHandler(idx)}
                        className="rating__input"
                        id={`star-${idx}`}
                        type="radio"
                        name="rating"
                        value={idx}
                        disabled={disabledAttributeForm}
                      />
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
                maxLength={400}
                minLength={50}
                disabled={disabledAttributeForm}
              >
              </textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={disabledAttributeBtn}
                >
                Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
}

export default AddReview;
