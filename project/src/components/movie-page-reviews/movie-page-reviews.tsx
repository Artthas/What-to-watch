import {Comments} from '../../types/comment';

type MoviePageReviewsParams = {
  comments: Comments,
};

function MoviePageReviews({comments}: MoviePageReviewsParams): JSX.Element {
  let firstHalfOfComments: Comments = [];
  let secondHalfOfComments: Comments = [];
  if (comments.length) {
    const firstHalfOfCommentsCount = Math.ceil(comments.length / 2);
    firstHalfOfComments = comments.slice(0, firstHalfOfCommentsCount);
    secondHalfOfComments = comments.slice(firstHalfOfCommentsCount, comments.length);
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
                  <time className="review__date" dateTime={new Date(comment.date).toLocaleString('en-US', {day: 'numeric', year: 'numeric', month: 'long'})}>
                    {new Date(comment.date).toLocaleString('en-US', {day: 'numeric', year: 'numeric', month: 'long'})}
                  </time>
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
