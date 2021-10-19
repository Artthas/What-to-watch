import React, {useState, ChangeEvent} from 'react';
import Logo from '../logo/logo';
import {Film} from '../../types/film';

type AddReviewProps = {
  film: Film
}

function AddReview({film}: AddReviewProps): JSX.Element {
  const [, setComment] = useState({'rating': 0, 'comment': ''});

  const ratioHandler = (rating: number) => {
    setComment((prevState) => ({...prevState, 'rating': rating}));
  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.background_image} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Logo />
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{film.name}</a>
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
          <img src={film.poster_image} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((idx) => {
                const component = (
                  <React.Fragment key={idx}>
                    <input onClick={() => ratioHandler(idx)} className="rating__input" id={`star-${idx}`} type="radio" name="rating" value={idx} />
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
              onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
                evt.preventDefault();
                setComment((prevState) => ({...prevState, 'comment': evt.target.value}));
              }}
            >
            </textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReview;
