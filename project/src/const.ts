export enum AppRoute {
  Root = '/',
  MyList = '/mylist',
  MoviePage = '/films/:movieId',
  AddReview = '/films/:movieId/review',
  Player = '/player/:movieId',
  SignIn = '/login'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Comments = '/comments',
  MyFilms = '/favorite',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
}
