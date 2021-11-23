import {Film} from '../../types/film';
import {Fragment} from 'react';

type MoviePageOverviewParams = {
  film: Film | undefined,
};

function MoviePageOverview({film}: MoviePageOverviewParams): JSX.Element {
  const getLevelComponentByRating = (rating: number | undefined) => {
    if (rating !== undefined) {
      if (rating > 0 && rating < 3) {
        return 'Bad';
      } else if (rating >= 3 && rating < 5) {
        return 'Normal';
      } else if (rating >= 5 && rating < 8) {
        return 'Good';
      } else if (rating >= 8 && rating < 10) {
        return 'Very Good';
      } else if (rating === 10) {
        return 'Awesome';
      }
    }
  };

  return (
    <Fragment>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getLevelComponentByRating(film?.rating)}</span>
          <span className="film-rating__count">{film?.scores_count}</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film?.description}</p>

        <p className="film-card__director"><strong>Director: {film?.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {film?.starring.join(', ')}</strong></p>
      </div>
    </Fragment>
  );
}

export default MoviePageOverview;
