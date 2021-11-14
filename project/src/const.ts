export enum AppRoute {
  Root = '/',
  MyList = '/my-list',
  MoviePage = '/movie-page/:movieId',
  AddReview = '/add-review/:movieId',
  Player = '/player/:movieId',
  SignIn = '/sign-in'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Films = '/films',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}
