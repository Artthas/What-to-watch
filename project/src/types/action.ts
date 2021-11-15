import {Films, Film} from '../types/film';
import {Comments} from '../types/comment';
import {AuthorizationStatus} from '../const';
import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import {
  AxiosInstance
} from 'axios';
import {State} from '../types/state';

export enum ActionType {
  ChangeGenre = 'films/changeGenre',
  LoadFilms = 'films/loadFilms',
  LoadCurrentFilm = 'films/loadCurrentFilm',
  LoadSimilarFilms = 'films/loadSimilarFilms',
  LoadComments = 'comments/loadComments',
  ShowMoreFilms = 'data/showMoreFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  UserAuthorization = 'user/userAuthorization',
  SaveUserEmail = 'user/saveUserEmail',
}

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre;
  payload: string,
};

export type LoadFilmsAction = {
  type: ActionType.LoadFilms;
  payload: Films,
};

export type LoadCurrentFilmAction = {
  type: ActionType.LoadCurrentFilm;
  payload: Film,
};

export type LoadSimilarFilmsAction = {
  type: ActionType.LoadSimilarFilms;
  payload: Films,
};

export type LoadCommentsAction = {
  type: ActionType.LoadComments;
  payload: Comments,
};

export type SaveUserEmailAction = {
  type: ActionType.SaveUserEmail;
  payload: string,
};

export type ShowMoreFilmsAction = {
  type: ActionType.ShowMoreFilms;
};

export type RequireAuthorizationAction = {
  type: ActionType.RequireAuthorization;
  payload: AuthorizationStatus,
};

export type RequireLogoutAction = {
  type: ActionType.RequireLogout;
};

export type Actions = ChangeGenreAction | LoadCommentsAction | SaveUserEmailAction | LoadCurrentFilmAction | LoadFilmsAction | LoadSimilarFilmsAction | ShowMoreFilmsAction | RequireAuthorizationAction | RequireLogoutAction;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
