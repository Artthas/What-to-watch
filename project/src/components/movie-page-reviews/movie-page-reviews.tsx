import {Film} from '../../types/film';

type MoviePageReviewsParams = {
  film: Film | undefined,
};

function MoviePageReviews({film}: MoviePageReviewsParams): JSX.Element {
  let firstHalfOfComments: any[] = [];
  let secondHalfOfComments: any[] = [];
  if (film?.comments.length) {
    const firstHalfOfCommentsCount = Math.ceil(film?.comments.length / 2);
    firstHalfOfComments = film?.comments.slice(0, firstHalfOfCommentsCount);
    secondHalfOfComments = film?.comments.slice(firstHalfOfCommentsCount, film?.comments.length);
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {firstHalfOfComments.map((comment) =>
          (
            <div className="review" key={comment.id}>
              <blockquote className="review__quote">
                <p className="review__text">{comment.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{comment.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">{comment.rating}</div>
            </div>
          ),
        )}
      </div>
      <div className="film-card__reviews-col">
        {secondHalfOfComments.map((comment) =>
          (
            <div className="review" key={comment.id}>
              <blockquote className="review__quote">
                <p className="review__text">{comment.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{comment.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
                </footer>
              </blockquote>

              <div className="review__rating">{comment.rating}</div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default MoviePageReviews;
