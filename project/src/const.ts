export enum AppRoute {
  Root = '/',
  MyList = '/my-list',
  MoviePage = '/movie-page/:movieId',
  AddReview = '/add-review',
  Player = '/player',
  SignIn = '/sign-in'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
